package com.review.service;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import com.review.dto.IcmsNotaDto;
import com.review.dto.IcmsProdutoDto;
import com.review.models.Empresa;
import com.review.models.Multiplicador;
import com.review.models.Relatorio;
import com.review.utils.Util;

import net.sf.jasperreports.engine.JREmptyDataSource;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.util.JRLoader;
import net.sf.jasperreports.engine.util.JRSaver;

@Service
public class ICMSService {

    @Autowired
    private MultiplicadorService multService;

    @Autowired
    private AliquotaService aliquotaService;

    @Autowired
    private RelatorioService relatorioService;

    @Autowired
    private EmpresaService empresaService;

    public byte[] renderizarRelatorio(Map<String, Object> parametros)
            throws FileNotFoundException, JRException, IOException {
        String reportJrxml = Util.getPath("mainReport" + ".jrxml");
        String reportJasper = Util.getPath("mainReport" + ".jasper");
        Path jasperFilePath = Paths.get(reportJasper);

        JasperReport jasperReport;
        if (!Files.exists(jasperFilePath)){
            jasperReport = JasperCompileManager.compileReport(reportJrxml);
            JRSaver.saveObject(jasperReport, reportJasper);
        } else {
            jasperReport = (JasperReport) JRLoader.loadObjectFromFile(reportJasper);
        }
        JasperPrint print = JasperFillManager.fillReport(jasperReport, parametros, new JREmptyDataSource());
        byte[] response = JasperExportManager.exportReportToPdf(print);

        return response;
    }

    public Relatorio salvaRelatorio(Long empresa_id, byte[] pdf, BigDecimal valorTotal, BigDecimal valorCalculado)
            throws IOException {
        Empresa empresa = empresaService.getById(empresa_id);
        Relatorio relatorio = new Relatorio();

        String empresaNome = empresa.getNome();
        String pathSalva = "src/main/resources/relatorios/icms/" + empresaNome;

        File directory = new File(pathSalva);

        if (!directory.exists()) {
            directory.mkdirs();
        }

        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH-mm-ss"));
        String outputPath = pathSalva + "/" + timestamp + ".pdf";

        try (FileOutputStream fos = new FileOutputStream(outputPath)) {
            fos.write(pdf);
        }

        relatorio.setArquivo(outputPath);
        relatorio.setEmpresa(empresa);
        relatorio.setValorTotal(valorTotal);
        relatorio.setValorCalculado(valorCalculado);

        return relatorioService.save(relatorio);
    }

    public InputStreamResource mostrarPdf(Long relatorio_id) throws FileNotFoundException {
        Relatorio relatorio = relatorioService.getById(relatorio_id);
        String caminhoArquivo = relatorio.getArquivo();
        

        try {
            File pdfFile = new File(caminhoArquivo);
            if (!pdfFile.exists()) {
                throw new FileNotFoundException("Arquivo não encontrado: " + pdfFile.getAbsolutePath());
            }

            InputStream inputStream = new FileInputStream(pdfFile);
            return new InputStreamResource(inputStream);

        } catch (IOException e) {
            e.printStackTrace();
            throw new FileNotFoundException("Erro ao ler o arquivo: " + e.getMessage());
        }
    }

    public byte[] gerarRelatorioICMSST(List<IcmsNotaDto> notasDTOsList)
            throws FileNotFoundException, JRException, IOException {
        Map<String, Object> parametros = new HashMap<String, Object>();
        JRBeanCollectionDataSource icmss = new JRBeanCollectionDataSource(notasDTOsList);
        parametros.put("icmsDataSet", icmss);

        return renderizarRelatorio(parametros);
    }

    // Essa função não apenas lê os documentos xml como indica o nome ela
    // também captura os dados do "pré-cálculo" do banco e retorna eles
    // convertidos em uma lista de DTOs para serem enviado pro front e tratados
    public List<IcmsNotaDto> readXmlsDocuments(List<MultipartFile> xmls, Long empresa_id, Boolean sistema)
            throws ParserConfigurationException, IOException, SAXException {

        if (xmls == null || xmls.isEmpty() || xmls.size() == 0)
            throw new RuntimeException("Nenhum xml passado");

        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        DocumentBuilder builder = factory.newDocumentBuilder();

        List<IcmsNotaDto> listaNotasDTO = new ArrayList<IcmsNotaDto>();

        for (MultipartFile file : xmls) {
            if (file == null)
                throw new RuntimeException("Erro, arquivo passado como NULL");

            IcmsNotaDto notaDto = new IcmsNotaDto();

            InputStream xml = file.getInputStream();
            Document document = builder.parse(xml);
            document.getDocumentElement().normalize();

            Element numeroNota = (Element) document.getElementsByTagName("nNF").item(0);
            Element emitente = (Element) document.getElementsByTagName("emit").item(0);
            Element destinatario = (Element) document.getElementsByTagName("dest").item(0);

            String ufEmit = emitente.getElementsByTagName("UF").item(0).getTextContent();
            String nomeFornecedor = emitente.getElementsByTagName("xNome").item(0).getTextContent();
            String ufDest = destinatario.getElementsByTagName("UF").item(0).getTextContent();
            String nomeEmpresa = destinatario.getElementsByTagName("xNome").item(0).getTextContent();

            notaDto.setNomeArquivo(file.getOriginalFilename());
            notaDto.setNumeroNota(numeroNota.getTextContent());
            notaDto.setUfEmitente(ufEmit);
            notaDto.setNomeFornecedor(nomeFornecedor);
            notaDto.setUfDestinatario(ufDest);
            notaDto.setNomeEmpresa(nomeEmpresa);

            List<IcmsProdutoDto> listaProdutosDTO = new ArrayList<IcmsProdutoDto>();

            NodeList productsList = document.getElementsByTagName("det");

            for (int i = 0; i < productsList.getLength(); i++) {

                Node product = productsList.item(i);

                if (product.getNodeType() != Node.ELEMENT_NODE) {
                    continue;
                }

                IcmsProdutoDto produtoDTO = new IcmsProdutoDto();

                Element eElement = (Element) product;

                String nomeProduto = eElement.getElementsByTagName("xProd").item(0).getTextContent();

                String ncm = eElement.getElementsByTagName("NCM").item(0).getTextContent();
                System.out.println(ncm);
                String cest = "";
                try {
                    cest = eElement.getElementsByTagName("CEST").item(0).getTextContent();
                } catch (Exception e) {
                    // TODO: handle exception
                }

                String ncmCest = (cest != null && !cest.isEmpty()) ? ncm + " / " + cest : ncm;

                BigDecimal valorProduto = new BigDecimal(
                        eElement.getElementsByTagName("vProd").item(0).getTextContent());

                Multiplicador multiplicador = new Multiplicador();

                BigDecimal convertPercent = new BigDecimal(100);
                
                if (cest != "" && cest != null && !cest.isEmpty()) {
                    
                    multiplicador = (sistema) 
                        ? 
                        multService.getByProductCest(cest)
                            : 
                            multService.getByProductCestEmpresa(cest, empresa_id);
                    
                } else {
                    multiplicador = (sistema) 
                        ? 
                        multService.getByProductNcm(ncm)
                            : 
                            multService.getByProductCestEmpresa(ncmCest, empresa_id);
                }

                if (multiplicador == null || multiplicador.equals(null)) {
                    break;
                }
                try {
                    BigDecimal aliquotaInterestadual = (sistema) 
                        ? 
                        aliquotaService.getByOrigemDestino(ufEmit, ufDest).getPorcentagem() 
                            : 
                            aliquotaService.getByOrigemDestinoEmpresa(ufEmit, ufDest, empresa_id).getPorcentagem();

                    BigDecimal aliquotaInternaEmit = multiplicador.getAliquotaInternaEmit();

                    BigDecimal valorIcms = valorProduto
                            .multiply((aliquotaInterestadual.divide(convertPercent)));

                    BigDecimal vProdComMva = valorProduto
                            .multiply(multiplicador.getMvaOriginal().divide(convertPercent));

                    BigDecimal baseST = vProdComMva.add(valorProduto);
                    BigDecimal baseSTComAliquotaInterna = baseST
                            .multiply(aliquotaInternaEmit.divide(convertPercent));

                    BigDecimal resultadoIcmsSubstituicaoTributaria = baseSTComAliquotaInterna.subtract(valorIcms);

                    produtoDTO.setDescricaoProduto(nomeProduto);
                    produtoDTO.setNcmCest(ncmCest);
                    produtoDTO.setValorProduto(valorProduto);
                    produtoDTO.setAliquotaInterestadual(aliquotaInterestadual);
                    produtoDTO.setAliquotaInternaEmit(aliquotaInternaEmit);
                    produtoDTO.setValorIcms(valorIcms);
                    produtoDTO.setMva(multiplicador.getMvaOriginal());
                    produtoDTO.setProdMva(vProdComMva);
                    produtoDTO.setBaseST(baseST);
                    produtoDTO.setBaseSTComAliquotaInterna(baseSTComAliquotaInterna);
                    produtoDTO.setResultadoIcmsST(resultadoIcmsSubstituicaoTributaria);

                    listaProdutosDTO.add(produtoDTO);

                } catch (Exception e) {
                    e.printStackTrace();
                }

            }
            notaDto.setProdutos(listaProdutosDTO);
            listaNotasDTO.add(notaDto);

        }
        return listaNotasDTO;
    }

    public byte[] teste(List<MultipartFile> xmls,Long empresa_id, boolean sistema)
            throws ParserConfigurationException, IOException, SAXException, JRException {
        List<IcmsNotaDto> notasPreProcessadas = readXmlsDocuments(xmls, empresa_id, sistema);
        return gerarRelatorioICMSST(notasPreProcessadas);
    }

}
