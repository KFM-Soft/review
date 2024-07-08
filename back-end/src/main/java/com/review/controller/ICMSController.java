package com.review.controller;

import java.io.InputStream;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import com.review.models.IcmsReturn;
import com.review.models.Multiplicador;
import com.review.service.AliquotaService;
import com.review.service.MultiplicadorService;

@RestController
@RequestMapping("/icms")
@CrossOrigin("*")
public class ICMSController {
    
    @Autowired
    private MultiplicadorService multService;

    @Autowired
    private AliquotaService aliquotaService;

	private String executarCalculo(@RequestBody List<MultipartFile> xmls){
		DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
		String returnString = "";
		try {
			DocumentBuilder builder = factory.newDocumentBuilder();
			Integer contador = 0;
			
            if(xmls == null || xmls.isEmpty() || xmls.size() == 0) return "Nenhum xml passado";

			for (MultipartFile file : xmls) {
				
				if(file == null) return "Erro, arquivo passado como NULL";
				
				String cstType = "";

				contador++;
				returnString += ("--------------Arquivo " + contador + "--------------" + "\n");
				InputStream xml = file.getInputStream();
				Document document = builder.parse(xml);
				document.getDocumentElement().normalize();
				
				Element emitente = (Element) document.getElementsByTagName("emit").item(0);
				String ufEmit = emitente.getElementsByTagName("UF").item(0).getTextContent();

				Element destinatario = (Element) document.getElementsByTagName("dest").item(0);
				String ufDest = destinatario.getElementsByTagName("UF").item(0).getTextContent();

				returnString += "\nUF EMITENTE = " + ufEmit + "\n";
				returnString += "UF DESTINATARIO = " + ufDest + "\n\n";
	
				NodeList productsList = document.getElementsByTagName("det");
	
				for(int i=0; i < productsList.getLength(); i++) {
					Node product = productsList.item(i);
					returnString += ("************* Produto " + (i + 1) + " *************" + "\n");
				
					if (product.getNodeType() == Node.ELEMENT_NODE) {
						Element eElement = (Element) product;  
	
						if(i == 0) {
							cstType = eElement.getElementsByTagName("CST").item(0).getTextContent();
							returnString += "\nCST DO ARQUIVO: " + cstType + "\n\n";
						}
                        BigDecimal valorProduto = new BigDecimal(eElement.getElementsByTagName("vProd").item(0).getTextContent());
                        returnString += "Valor do produto - " + valorProduto.toString() + "\n";
						
						Multiplicador multiplicador = new Multiplicador();

						BigDecimal convertPercent = new BigDecimal(100);
						
						try {
							System.out.println("ESTOU BUSCANDO PELO CEST");
							String cest = eElement.getElementsByTagName("CEST").item(0).getTextContent();
							multiplicador = multService.getByProductCest(cest);

						} catch (NullPointerException cantFindCest) {
							System.out.println("CEST NÃO DEU, AGORA TO NO NCM");
							String ncm = eElement.getElementsByTagName("NCM").item(0).getTextContent();
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
	
								BigDecimal aliquotaInternaEmit = aliquotaService.getByOrigemDestino(ufEmit, ufEmit).getPorcentagem();
		
								returnString += "icms(" + aliquotaInterestadual.toString() + ")\n";
		
								BigDecimal valorIcms = valorProduto.multiply((aliquotaInterestadual.divide(convertPercent)));
								returnString += "VALOR ICMS -- " + valorIcms.toString() + "\n";
								
								BigDecimal vProdComMva = valorProduto.multiply(multiplicador.getMvaOriginal().divide(convertPercent));
								returnString += "VALOR PRODUTO COM MVA -- " + vProdComMva.toString() + "\n\n";
		
								BigDecimal baseST = vProdComMva.add(valorProduto);
								returnString += "BASE ST -- " + baseST.toString() + "\n\n";
								BigDecimal valorAliquotaInterna = baseST.multiply(aliquotaInternaEmit.divide(convertPercent));
								
								BigDecimal resultadoICMSSt = valorAliquotaInterna.subtract(valorIcms);
								returnString += "RESULTADO ICMS ST -- " + resultadoICMSSt.toString() + "\n\n";

							} catch (Exception e) {
								returnString += "ERROR: " + e.getMessage() + "\n\n";
							}
						}
					}
				}
				returnString += "\n";
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		return returnString;
	}

    @GetMapping("/")
    public String getMethod(@RequestBody List<MultipartFile> xmls){
		System.out.println("ESTOU NO GET MAPPING");
		System.out.println("********************************************************************************************************");
		System.out.println((xmls.toString()));
		return this.executarCalculo(xmls);
	}

	@PostMapping("/")
    public ResponseEntity<IcmsReturn> postMethod(@RequestBody List<MultipartFile> xmls){
		System.out.println("ESTOU NO POST MAPPING");
		System.out.println("********************************************************************************************************");
		System.out.println((xmls.toString()));

		String retorno = this.executarCalculo(xmls);
		IcmsReturn response = new IcmsReturn(retorno);
		
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@PostMapping("/teste/")
    public ResponseEntity<IcmsReturn> postMethod2(@RequestBody MultipartFile xmls){
		List<MultipartFile> list = new ArrayList<MultipartFile>();
		list.add(xmls);
		String retorno = this.executarCalculo(list);
		IcmsReturn response = new IcmsReturn(retorno);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

}
