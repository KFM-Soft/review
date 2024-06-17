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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.review.models.ProdutoEstado;
import com.review.service.ProdutoEstadoService;

@RestController
@RequestMapping("/ProdutoEstado")
public class ProdutoEstadoController {
    
    @Autowired
    private ProdutoEstadoService service;

    @GetMapping("/")
    public ResponseEntity<List<ProdutoEstado>> getProdutoEstado(){
        List<ProdutoEstado> registros = service.getAll();
        return new ResponseEntity<>(registros, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProdutoEstado> getProdutoEstadoById(@PathVariable Long id) {
        ProdutoEstado registro = service.getById(id);
        return new ResponseEntity<>(registro, HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<ProdutoEstado> createProdutoEstado(@RequestBody ProdutoEstado ProdutoEstado) {
        ProdutoEstado registro = service.save(ProdutoEstado);
        return new ResponseEntity<>(registro, HttpStatus.CREATED);
    }

    @PostMapping("/list")
    public ResponseEntity<List<ProdutoEstado>> createProdutoEstado(@RequestBody List<ProdutoEstado> ProdutoEstado) {
        List<ProdutoEstado> registros = service.saveList(ProdutoEstado);
        return new ResponseEntity<>(registros, HttpStatus.OK);
    }

    @PutMapping("/")
    public ResponseEntity<ProdutoEstado> updateProdutoEstado(@RequestBody ProdutoEstado ProdutoEstado) {
        ProdutoEstado registro = service.save(ProdutoEstado);
        return new ResponseEntity<>(registro, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        service.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/cest/")
    public ResponseEntity<ProdutoEstado> getProdutoEstadoByCest(@RequestParam("cest") String cest, @RequestParam("uf") String uf) {
        ProdutoEstado registro = service.getByProductCestAndUf(cest, uf);
        return new ResponseEntity<>(registro, HttpStatus.OK);
    }

    @GetMapping("/ncm/")
    public ResponseEntity<ProdutoEstado> getProdutoEstadoByNcm(@RequestParam("ncm") String ncm, @RequestParam("uf") String uf) {
        ProdutoEstado registro = service.getByProductNcmAndUF(ncm, uf);
        return new ResponseEntity<>(registro, HttpStatus.OK);
    }

}
