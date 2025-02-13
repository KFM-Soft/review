package com.review.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.SortDefault;
import org.springframework.data.web.SortDefault.SortDefaults;
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

import com.review.models.Estado;
import com.review.service.EstadoService;

@RestController
@RequestMapping("/estado")
public class EstadoController {
    
    @Autowired
    private EstadoService service;

    @GetMapping("/")
    public ResponseEntity<Page<Estado>> getEstados(@RequestParam(required = false) String termoBusca, 
    @SortDefaults({
        @SortDefault(sort = "nome", direction = org.springframework.data.domain.Sort.Direction.ASC)
    })
    Pageable page){
        Page<Estado> registros = service.getAll(termoBusca, page);
        return new ResponseEntity<>(registros, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Estado> getEstadoById(@PathVariable Long id) {
        Estado registro = service.getById(id);
        return new ResponseEntity<>(registro, HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<Estado> createEstado(@RequestBody Estado estado) {
        Estado registro = service.save(estado);
        return new ResponseEntity<>(registro, HttpStatus.CREATED);
    }

    @PostMapping("/list")
    public ResponseEntity<List<Estado>> createEstados(@RequestBody List<Estado> estados) {
        List<Estado> registros = service.saveList(estados);
        return new ResponseEntity<>(registros, HttpStatus.OK);
    }

    @PutMapping("/")
    public ResponseEntity<Estado> updateEstado(@RequestBody Estado estado) {
        Estado registro = service.save(estado);
        return new ResponseEntity<>(registro, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        service.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
