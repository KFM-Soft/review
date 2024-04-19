package com.review;

import java.io.InputStream;
import java.util.List;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

// import com.fasterxml.jackson.databind.ObjectMapper;
// import com.fasterxml.jackson.dataformat.xml.XmlMapper;

@RestController
@SpringBootApplication
public class ReviewApplication {

	public static void main(String[] args) {
		SpringApplication.run(ReviewApplication.class, args);
	}

	public Double calculaIcmsProprio() {
		return 0.0;
	}

	@GetMapping("/")
	public String apiRoot(@RequestBody List<MultipartFile> xmls){
		DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
		String returnString = "";
		try {
			DocumentBuilder builder = factory.newDocumentBuilder();
			Integer contador = 0;
			for (MultipartFile file : xmls) {
				
				String cstType;

				contador++;
				returnString += ("--------------Arquivo " + contador + "--------------" + "\n");
				InputStream xml = file.getInputStream();
				Document document = builder.parse(xml);
				document.getDocumentElement().normalize();
				
				Element emitente = (Element) document.getElementsByTagName("emit").item(0);
				String ufEmitente = emitente.getElementsByTagName("UF").item(0).getTextContent();

				Element destinatario = (Element) document.getElementsByTagName("dest").item(0);
				String ufDest = destinatario.getElementsByTagName("UF").item(0).getTextContent();

				returnString += "\nUF EMITENTE = " + ufEmitente + "\n";
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

						returnString += ("cProd: "+ eElement.getElementsByTagName("cProd").item(0).getTextContent() + "\n");
						returnString += ("cEAN: "+ eElement.getElementsByTagName("cEAN").item(0).getTextContent() + "\n");
						returnString += ("xProd: "+ eElement.getElementsByTagName("xProd").item(0).getTextContent() + "\n");
						returnString += ("NCM: "+ eElement.getElementsByTagName("NCM").item(0).getTextContent() + "\n");
						returnString += ("CFOP: "+ eElement.getElementsByTagName("CFOP").item(0).getTextContent() + "\n");
						returnString += ("uCom: "+ eElement.getElementsByTagName("uCom").item(0).getTextContent() + "\n");
						returnString += ("qCom: "+ eElement.getElementsByTagName("qCom").item(0).getTextContent() + "\n");
						returnString += ("vUnCom: "+ eElement.getElementsByTagName("vUnCom").item(0).getTextContent() + "\n");
						returnString += ("vProd: "+ eElement.getElementsByTagName("vProd").item(0).getTextContent() + "\n");
						returnString += ("cEANTrib: "+ eElement.getElementsByTagName("cEANTrib").item(0).getTextContent() + "\n");
						returnString += ("uTrib: "+ eElement.getElementsByTagName("uTrib").item(0).getTextContent() + "\n");
						returnString += ("qTrib: "+ eElement.getElementsByTagName("qTrib").item(0).getTextContent() + "\n");
						returnString += ("vUnTrib: "+ eElement.getElementsByTagName("vUnTrib").item(0).getTextContent() + "\n");
						returnString += ("indTot: "+ eElement.getElementsByTagName("indTot").item(0).getTextContent() + "\n\n");
					}
				}
				returnString += "\n";
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		return returnString;
	}

}
