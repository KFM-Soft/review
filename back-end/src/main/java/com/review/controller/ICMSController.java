package com.review.controller;

import java.io.IOException;
import java.util.List;
import javax.xml.parsers.ParserConfigurationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.xml.sax.SAXException;

import com.review.dto.IcmsNotaDto;
import com.review.service.ICMSService;

import net.sf.jasperreports.engine.JRException;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequestMapping("/icms")
public class ICMSController {

	@Autowired
	private ICMSService service;

	@PostMapping("/")
	private ResponseEntity<byte[]> executarCalculo(@RequestBody List<MultipartFile> xmls)
			throws JRException, ParserConfigurationException, IOException, SAXException {

		byte[] response = service.teste(xmls);

		HttpHeaders headers = new HttpHeaders();
		headers.set(HttpHeaders.CONTENT_DISPOSITION, "inline;filename=teste.pdf");

		return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_PDF).body(response);
	}

	@PostMapping("calculo")
	public ResponseEntity<List<IcmsNotaDto>> getValoresNota(@RequestBody List<MultipartFile> xmls)
			throws ParserConfigurationException, IOException, SAXException {
		return new ResponseEntity<>(service.readXmlsDocuments(xmls), HttpStatus.OK);
	}

}
