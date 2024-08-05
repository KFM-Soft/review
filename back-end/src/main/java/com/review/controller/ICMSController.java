package com.review.controller;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import com.review.dto.IcmsRelatorioDto;
import com.review.models.Multiplicador;
import com.review.service.AliquotaService;
import com.review.service.MultiplicadorService;

import net.sf.jasperreports.engine.JREmptyDataSource;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.util.JRSaver;
import org.springframework.web.bind.annotation.PostMapping;


@RestController
@RequestMapping("/icms")
public class ICMSController {

    @Autowired
    private MultiplicadorService multService;

    @Autowired
    private AliquotaService aliquotaService;

	
	@PostMapping("/")
	private ResponseEntity<byte[]> executarCalculo(@RequestBody List<MultipartFile> xmls)throws JRException, FileNotFoundException {
		DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
		String returnString = "";

		String reportName = "icmsReport";

		File pdf = ResourceUtils.getFile("classpath:reportsFile/" + reportName + ".jrxml");
		String path = pdf.getParent();

		JasperReport jasperReport = JasperCompileManager.compileReport(path + "/" + reportName + ".jrxml");
		JRSaver.saveObject(jasperReport, path + "/" + reportName + ".jasper");

		Map<String, Object> parameters = new HashMap<>();

		List<IcmsRelatorioDto> icms = new ArrayList<IcmsRelatorioDto>();
		try {
			DocumentBuilder builder = factory.newDocumentBuilder();
			Integer contador = 0;
			
            if(xmls == null || xmls.isEmpty() || xmls.size() == 0) throw new RuntimeException("Nenhum xml passado");

			for (MultipartFile file : xmls) {
				
				if(file == null) throw new RuntimeException( "Erro, arquivo passado como NULL");
				
				String cstType = "";

				contador++;
				returnString += ("--------------Arquivo " + contador + "--------------" + "\n");
				InputStream xml = file.getInputStream();
				Document document = builder.parse(xml);
				document.getDocumentElement().normalize();

				Element numeroNota = (Element) document.getElementsByTagName("nNF").item(0);
				System.out.println("NUMERO DA NOTA: " + numeroNota.getTextContent());
				parameters.put("numeroNota", numeroNota.getTextContent());

				Element emitente = (Element) document.getElementsByTagName("emit").item(0);
				String ufEmit = emitente.getElementsByTagName("UF").item(0).getTextContent();
				String nomeEmit = emitente.getElementsByTagName("xNome").item(0).getTextContent();
				System.out.println("NOME EMITENTE: " + nomeEmit);
				parameters.put("nomeFornecedor", nomeEmit);

				Element destinatario = (Element) document.getElementsByTagName("dest").item(0);
				String ufDest = destinatario.getElementsByTagName("UF").item(0).getTextContent();
				String nomeDest = destinatario.getElementsByTagName("xNome").item(0).getTextContent();
				System.out.println("NOME DESTINATARIO: " + nomeDest);
				parameters.put("nomeEmpresa", nomeDest);

				returnString += "\nUF EMITENTE = " + ufEmit + "\n";
				returnString += "UF DESTINATARIO = " + ufDest + "\n\n";

				parameters.put("emitente", ufEmit);
				parameters.put("destinatario", ufDest);
	
				NodeList productsList = document.getElementsByTagName("det");
				
				for(int i=0; i < productsList.getLength(); i++) {

					Node product = productsList.item(i);
					returnString += ("************* Produto " + (i + 1) + " *************" + "\n");
					
					if (product.getNodeType() == Node.ELEMENT_NODE) {
						IcmsRelatorioDto icmsRelatorio = new IcmsRelatorioDto();

						Element eElement = (Element) product;  

						

						String nomeProduto = eElement.getElementsByTagName("xProd").item(0).getTextContent();
						System.out.println("NOME DO PRODUTO: " + nomeProduto);
						icmsRelatorio.setDescricaoProduto(nomeProduto);

						String ncm = eElement.getElementsByTagName("NCM").item(0).getTextContent();
						String cest = eElement.getElementsByTagName("CEST").item(0).getTextContent();

						String ncmCest = (cest != null && !cest.isEmpty()) ? ncm + " / " + cest : ncm;
						System.out.println("NCM/CEST: " + ncmCest);
						icmsRelatorio.setNcmCest(ncmCest);
	
						if(i == 0) {
							cstType = eElement.getElementsByTagName("CST").item(0).getTextContent();
							returnString += "\nCST DO ARQUIVO: " + cstType + "\n\n";
						}
                        BigDecimal valorProduto = new BigDecimal(eElement.getElementsByTagName("vProd").item(0).getTextContent());
                        returnString += "Valor do produto - " + valorProduto.toString() + "\n";
						System.out.println("VALOR DO PRODUTO: " + valorProduto.toString());
						icmsRelatorio.setValorProduto(valorProduto);
						
						Multiplicador multiplicador = new Multiplicador();

						BigDecimal convertPercent = new BigDecimal(100);
						
						try {
							System.out.println("ESTOU BUSCANDO PELO CEST");
							multiplicador = multService.getByProductCest(cest);

						} catch (NullPointerException cantFindCest) {
							System.out.println("CEST NÃO DEU, AGORA TO NO NCM");
							multiplicador = multService.getByProductNcm(ncm);

						} catch (Exception e) {
							e.printStackTrace();
						}

						if(multiplicador == null || multiplicador.equals(null)) {
							returnString += "\n\n A NOTA POSSUI UM PRODUTO NÃO CADASTRADO, NOTA IMPOSSÍVEL DE SER CALCULADA\n\n";
							break;
						}

						if(ufDest.equals(ufEmit)) {
							BigDecimal aliquotaInterna = aliquotaService.getByOrigemDestino(ufEmit, ufEmit).getPorcentagem();
							returnString += "Aliquota interna: " + aliquotaInterna.toString() + "\n";
							returnString += "Valor entre o mesmo estado (vProd * aliquota interna): " + valorProduto.multiply(aliquotaInterna.divide(convertPercent)) + "\n\n";
						} else {
							try {
								BigDecimal aliquotaInterestadual = aliquotaService.getByOrigemDestino(ufEmit, ufDest).getPorcentagem();
	
								BigDecimal aliquotaInternaEmit = multiplicador.getAliquotaInternaEmit();

								System.out.println("ALIQUOTA INTERESTADUAL: " + aliquotaInterestadual.toString());
								System.out.println("ALIQUOTA INTERNA EMITENTE: " + aliquotaInternaEmit.toString());
								icmsRelatorio.setAliquotaInterestadual(aliquotaInterestadual);
								icmsRelatorio.setAliquotaInternaEmit(aliquotaInternaEmit);

								returnString += "icms(" + aliquotaInterestadual.toString() + ")\n";
		
								BigDecimal valorIcms = valorProduto.multiply((aliquotaInterestadual.divide(convertPercent)));
								returnString += "VALOR ICMS -- " + valorIcms.toString() + "\n";
								System.out.println("VALOR ICMS: " + valorIcms);
								icmsRelatorio.setValorIcms(valorIcms);
								
								BigDecimal vProdComMva = valorProduto.multiply(multiplicador.getMvaOriginal().divide(convertPercent));
								returnString += "VALOR PRODUTO COM MVA -- " + vProdComMva.toString() + "\n\n";
								icmsRelatorio.setMva(multiplicador.getMvaOriginal());
								System.out.println("VALOR PRODUTO COM MVA: " + vProdComMva);
								icmsRelatorio.setProdMva(vProdComMva);


								BigDecimal baseST = vProdComMva.add(valorProduto);
								returnString += "BASE ST -- " + baseST.toString() + "\n\n";
								BigDecimal valorAliquotaInterna = baseST.multiply(aliquotaInternaEmit.divide(convertPercent));
								System.out.println("Base ST: " + baseST);
								icmsRelatorio.setBaseST(baseST);

								BigDecimal resultadoIcmsSubstituicaoTributaria = valorAliquotaInterna.subtract(valorIcms);
								returnString += "RESULTADO ICMS ST -- " + resultadoIcmsSubstituicaoTributaria.toString() + "\n\n";
								System.out.println("RESULTADO ICMS ST: " + resultadoIcmsSubstituicaoTributaria);
								icmsRelatorio.setResultadoIcmsSubstituicaoTributaria(resultadoIcmsSubstituicaoTributaria);

								icms.add(icmsRelatorio);

							} catch (Exception e) {
								returnString += "ERROR: " + e.getMessage() + "\n\n";
							}
							
						}
					}
				}
				
				returnString += "\n";
			}
			JRBeanCollectionDataSource icmss = new JRBeanCollectionDataSource(icms);
			parameters.put("icmsDataSet", icmss);
			

		} catch (Exception e) {
			returnString += e.getMessage() + "\n" + e.getStackTrace();
			e.printStackTrace();
		}

		JasperPrint print = JasperFillManager.fillReport(jasperReport, parameters, new JREmptyDataSource());
		HttpHeaders headers = new HttpHeaders();
		byte[] response = JasperExportManager.exportReportToPdf(print);

		headers.set(HttpHeaders.CONTENT_DISPOSITION, "inline;filename=teste.pdf");

		return ResponseEntity.ok()
				.headers(headers)
				.contentType(MediaType.APPLICATION_PDF).body(response);
	}





}
