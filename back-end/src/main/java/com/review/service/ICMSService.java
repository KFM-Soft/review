package com.review.service;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;
import org.springframework.web.multipart.MultipartFile;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import com.review.dto.IcmsNotaDto;
import com.review.dto.IcmsProdutoDto;
import com.review.models.Multiplicador;

import net.sf.jasperreports.engine.JREmptyDataSource;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.util.JRSaver;

@Service
public class ICMSService {

    @Autowired
    private MultiplicadorService multService;

    @Autowired
    private AliquotaService aliquotaService;

    public byte[] renderizarRelatorio(String reportName, Map<String, Object> parametros)
            throws FileNotFoundException, JRException {
        File pdf = ResourceUtils.getFile("classpath:reportsFile/" + reportName + ".jrxml");
        String path = pdf.getParent();

        JasperReport jasperReport = JasperCompileManager.compileReport(path + "/" + reportName + ".jrxml");
        JRSaver.saveObject(jasperReport, path + "/" + reportName + ".jasper");
		
        JasperPrint print = JasperFillManager.fillReport(jasperReport, parametros, new JREmptyDataSource());
        byte[] response = JasperExportManager.exportReportToPdf(print);
        
        return response;
    }

    public byte[] gerarRelatorioICMSST(List<IcmsNotaDto> notasDTOsList) throws FileNotFoundException, JRException {

        Map<String, Object> parametros = new HashMap<String, Object>();
        JRBeanCollectionDataSource icmss = new JRBeanCollectionDataSource(notasDTOsList);
        parametros.put("icmsDataSet", icmss);

        return renderizarRelatorio("icmsReport", parametros);

    }

    // Essa função não apenas lê os documentos xml como indica o nome ela
    // também captura os dados do "pré-cálculo" do banco e retorna eles 
    // convertidos em uma lista de DTOs para serem enviado pro front e tratados
    public List<IcmsNotaDto> readXmlsDocuments(List<MultipartFile> xmls)
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
                String cest = eElement.getElementsByTagName("CEST").item(0).getTextContent();

                String ncmCest = (cest != null && !cest.isEmpty()) ? ncm + " / " + cest : ncm;

                BigDecimal valorProduto = new BigDecimal(
                        eElement.getElementsByTagName("vProd").item(0).getTextContent());

                Multiplicador multiplicador = new Multiplicador();

                BigDecimal convertPercent = new BigDecimal(100);

                try {
                    multiplicador = multService.getByProductCest(cest);
                } catch (NullPointerException cantFindCest) {
                    multiplicador = multService.getByProductNcm(ncm);
                } catch (Exception e) {
                    e.printStackTrace();
                }

                if (multiplicador == null || multiplicador.equals(null)) {
                    break;
                }
                try {
                    BigDecimal aliquotaInterestadual = aliquotaService.getByOrigemDestino(ufEmit, ufDest)
                            .getPorcentagem();

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

    public byte[] teste(List<MultipartFile> xmls) throws ParserConfigurationException, IOException, SAXException, JRException {
        List<IcmsNotaDto> notasPreProcessadas = readXmlsDocuments(xmls);
        return gerarRelatorioICMSST(notasPreProcessadas);
    }

}
