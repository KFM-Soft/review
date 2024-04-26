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

import com.review.models.Multiplicador;
import com.review.service.MultiplicadorService;

@RestController
@RequestMapping("/multiplicador")
public class MultiplicadorController {
    
    @Autowired
    private MultiplicadorService service;

    @GetMapping("/")
    public ResponseEntity<List<Multiplicador>> getMultiplicadores(){
        List<Multiplicador> registros = service.getAll();
        return new ResponseEntity<>(registros, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Multiplicador> getMultiplicadorById(@PathVariable Long id) {
        Multiplicador registro = service.getById(id);
        return new ResponseEntity<>(registro, HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<Multiplicador> createMultiplicador(@RequestBody Multiplicador multiplicador) {
        Multiplicador registro = service.save(multiplicador);
        return new ResponseEntity<>(registro, HttpStatus.CREATED);
    }

    @PostMapping("/list")
    public ResponseEntity<List<Multiplicador>> createMultiplicadores(@RequestBody List<Multiplicador> multiplicadores) {
        List<Multiplicador> registros = service.saveList(multiplicadores);
        return new ResponseEntity<>(registros, HttpStatus.OK);
    }

    @PutMapping("/")
    public ResponseEntity<Multiplicador> updateMultiplicador(@RequestBody Multiplicador multiplicador) {
        Multiplicador registro = service.save(multiplicador);
        return new ResponseEntity<>(registro, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        service.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/cest/{cest}")
    public ResponseEntity<Multiplicador> getMultiplicadorByCest(@PathVariable String cest) {
        Multiplicador registro = service.getByProductCest(cest);
        return new ResponseEntity<>(registro, HttpStatus.OK);
    }

}
