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

import com.review.models.TipoUsuario;
import com.review.service.TipoUsuarioService;

@RestController
@RequestMapping("/tipo_TipoUsuario")
public class TipoUsuarioController {
    @Autowired
    private TipoUsuarioService service;

    @GetMapping("/")
    public ResponseEntity<List<TipoUsuario>> getProdutos(){
        List<TipoUsuario> registros = service.getAll();
        return new ResponseEntity<>(registros, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TipoUsuario> getProdutoById(@PathVariable Long id) {
        TipoUsuario registro = service.getById(id);
        return new ResponseEntity<>(registro, HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<TipoUsuario> createProduto(@RequestBody TipoUsuario TipoUsuario) {
        TipoUsuario registro = service.save(TipoUsuario);
        return new ResponseEntity<>(registro, HttpStatus.CREATED);
    }

    @PostMapping("/list")
    public ResponseEntity<List<TipoUsuario>> createProdutos(@RequestBody List<TipoUsuario> produtos) {
        List<TipoUsuario> registros = service.saveList(produtos);
        return new ResponseEntity<>(registros, HttpStatus.OK);
    }

    @PutMapping("/")
    public ResponseEntity<TipoUsuario> updateProduto(@RequestBody TipoUsuario TipoUsuario) {
        TipoUsuario registro = service.save(TipoUsuario);
        return new ResponseEntity<>(registro, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        service.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
