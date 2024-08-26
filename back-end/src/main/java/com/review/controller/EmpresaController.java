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

import com.review.models.Usuario;
import com.review.service.UsuarioService;

@RestController
@RequestMapping("/empresa")
public class EmpresaController {

    @Autowired
    private UsuarioService service;

    @GetMapping("/")
    public ResponseEntity<List<Usuario>> getEmpresas(){
        List<Usuario> registros = service.getAll();
        return new ResponseEntity<>(registros, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> getEmpresaById(@PathVariable Long id) {
        Usuario registro = service.getById(id);
        return new ResponseEntity<>(registro, HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<Usuario> createEmpresa(@RequestBody Usuario Usuario) {
        Usuario registro = service.save(Usuario);
        return new ResponseEntity<>(registro, HttpStatus.CREATED);
    }

    @PostMapping("/list")
    public ResponseEntity<List<Usuario>> createEmpresas(@RequestBody List<Usuario> Empresas) {
        List<Usuario> registros = service.saveList(Empresas);
        return new ResponseEntity<>(registros, HttpStatus.OK);
    }

    @PutMapping("/")
    public ResponseEntity<Usuario> updateEmpresa(@RequestBody Usuario Usuario) {
        Usuario registro = service.save(Usuario);
        return new ResponseEntity<>(registro, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        service.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
