package com.review.controller;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;
import javax.xml.parsers.ParserConfigurationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
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
import com.review.models.Relatorio;
import com.review.service.ICMSService;

import net.sf.jasperreports.engine.JRException;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequestMapping("/icms")
public class ICMSController {

	@Autowired
	private ICMSService service;

	@PostMapping("relatorio")
	private ResponseEntity<byte[]> relatorioPosCalculo(@RequestBody List<IcmsNotaDto> notas)
			throws JRException, IOException {
		byte[] response = service.gerarRelatorioICMSST(notas);

		HttpHeaders headers = new HttpHeaders();
		headers.set(HttpHeaders.CONTENT_DISPOSITION, "inline;filename=teste.pdf");

		return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_PDF).body(response);
	}

	@PostMapping("relatorioPeloArquivo")
	private ResponseEntity<byte[]> executarCalculo(@RequestBody List<MultipartFile> xmls)
			throws JRException, ParserConfigurationException, IOException, SAXException {

		byte[] response = service.teste(xmls, null, true);

		HttpHeaders headers = new HttpHeaders();
		headers.set(HttpHeaders.CONTENT_DISPOSITION, "inline;filename=relatorio.pdf");

		return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_PDF).body(response);
	}

	@GetMapping("/mostrar/{relatorio_id}")
	public ResponseEntity<InputStreamResource> mostrarPdf(@PathVariable Long relatorio_id) throws FileNotFoundException {
		InputStreamResource pdfFile = service.mostrarPdf(relatorio_id);

		HttpHeaders headers = new HttpHeaders();
		headers.set(HttpHeaders.CONTENT_DISPOSITION, "inline;" + "relatorio" + ".pdf");

		return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_PDF).body(pdfFile);

	}

	@PostMapping("/salva/{empresa_id}/{valorTotal}/{valorCalculado}")
	public ResponseEntity<Relatorio> salvaPdf(@PathVariable("id") Long empresa_id,
			@PathVariable("valorTotal") BigDecimal valorTotal,
			@PathVariable("valorCalculado") BigDecimal valorCalculado, @RequestBody List<IcmsNotaDto> notas)
			throws FileNotFoundException, JRException, IOException {
		byte[] response = service.gerarRelatorioICMSST(notas);

		Relatorio registro = service.salvaRelatorio(empresa_id, response, valorTotal, valorCalculado);
		return ResponseEntity.ok(registro);
	}

	@PostMapping("calculo")
	public ResponseEntity<List<IcmsNotaDto>> getValoresNota(@RequestBody List<MultipartFile> xmls)throws ParserConfigurationException, IOException, SAXException {
		return new ResponseEntity<>(service.readXmlsDocuments(xmls, null, true), HttpStatus.OK);
	}

	@PostMapping("calculo/empresa/{empresa_id}")
	public ResponseEntity<List<IcmsNotaDto>> getValoresNotaEmpresa(@RequestBody List<MultipartFile> xmls, @PathVariable Long empresa_id)throws ParserConfigurationException, IOException, SAXException {
		return new ResponseEntity<>(service.readXmlsDocuments(xmls, null, true), HttpStatus.OK);
	}

}
