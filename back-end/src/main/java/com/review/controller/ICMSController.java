package com.review.controller;

import java.io.InputStream;
import java.math.BigDecimal;
import java.util.List;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import com.review.models.Aliquota;
import com.review.models.Multiplicador;
import com.review.models.Produto;
import com.review.service.AliquotaService;
import com.review.service.MultiplicadorService;
import com.review.service.ProdutoService;

@RestController
@RequestMapping("/icms")
public class ICMSController {
    
    @Autowired
    private ProdutoService prodService;

    @Autowired
    private MultiplicadorService multService;

    @Autowired
    private AliquotaService aliquotaService;

    @GetMapping("/")
    public String apiRoot(@RequestBody List<MultipartFile> xmls){
		DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
		String returnString = "";
		try {
			DocumentBuilder builder = factory.newDocumentBuilder();
			Integer contador = 0;
            
            if(xmls == null || xmls.isEmpty() || xmls.size() == 0) return "Nenhum xml passado";

			for (MultipartFile file : xmls) {
				
				String cstType = "";

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
                        BigDecimal valorProduto = new BigDecimal(eElement.getElementsByTagName("vProd").item(0).getTextContent());
                        returnString += "Valor do produto - " + valorProduto.toString() + "\n";

                        if(cstType.equals("90")) {
                            String cest = eElement.getElementsByTagName("CEST").item(0).getTextContent();

                            Aliquota aliquota = aliquotaService.getByOrigemDestino(ufEmitente, ufDest);

                            Aliquota aliquotaInternaEmit = aliquotaService.getByOrigemDestino(ufEmitente, ufEmitente);

                            BigDecimal aliquotaInterestadual = aliquota.getPorcentagem();
                            returnString += "Aliquota Interestadual (icms) " + aliquotaInterestadual.toString() + "\n";

                            BigDecimal valorIcms = valorProduto.multiply((aliquotaInterestadual.divide(new BigDecimal(100))));
                            returnString += "VALOR ICMS -- " + valorIcms.toString() + "\n";

                            Multiplicador multiplicador = multService.getByProductCest(cest);
                            BigDecimal vProdComMva = valorProduto.multiply(multiplicador.getMvaOriginal().divide(new BigDecimal(100)));
                            returnString += "VALOR PRODUTO COM MVA -- " + vProdComMva.toString() + "\n\n";

                            BigDecimal baseST = vProdComMva.add(valorProduto);
                            returnString += "BASE ST -- " + baseST.toString() + "\n\n";
                            BigDecimal valorAliquotaInterna = baseST.multiply(aliquotaInternaEmit.getPorcentagem().divide(new BigDecimal(100)));
                            
                            BigDecimal resultadoICMSSt = valorAliquotaInterna.subtract(valorIcms);
                            returnString += "RESULTADO ICMS ST -- " + resultadoICMSSt.toString() + "\n\n";
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


}
