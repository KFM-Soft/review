package com.review.controller;

import java.util.List;

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

import com.review.models.Precificacao;
import com.review.service.PrecificacaoService;

@RestController
@RequestMapping("/precificacao")
public class PrecificacaoController {

    @Autowired
    private PrecificacaoService service;

    @GetMapping("/")
    public ResponseEntity<List<Precificacao>> getPrecificacaos(){
        List<Precificacao> registros = service.getAll();
        return new ResponseEntity<>(registros, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Precificacao> getPrecificacaoById(@PathVariable Long id) {
        Precificacao registro = service.getById(id);
        return new ResponseEntity<>(registro, HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<Precificacao> createPrecificacao(@RequestBody Precificacao Precificacao) {
        Precificacao registro = service.save(Precificacao);
        return new ResponseEntity<>(registro, HttpStatus.CREATED);
    }

    @PostMapping("/list")
    public ResponseEntity<List<Precificacao>> createPrecificacaos(@RequestBody List<Precificacao> precificacaos) {
        List<Precificacao> registros = service.saveList(precificacaos);
        return new ResponseEntity<>(registros, HttpStatus.OK);
    }

    @PutMapping("/")
    public ResponseEntity<Precificacao> updatePrecificacao(@RequestBody Precificacao Precificacao) {
        Precificacao registro = service.save(Precificacao);
        return new ResponseEntity<>(registro, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        service.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
