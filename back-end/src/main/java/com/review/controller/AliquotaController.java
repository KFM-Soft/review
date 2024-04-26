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

import com.review.models.Aliquota;
import com.review.service.AliquotaService;

@RestController
@RequestMapping("/aliquota")
public class AliquotaController {
    
    @Autowired
    private AliquotaService service;

    @GetMapping("/")
    public ResponseEntity<List<Aliquota>> getAliquotas(){
        List<Aliquota> registros = service.getAll();
        return new ResponseEntity<>(registros, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Aliquota> getAliquotaById(@PathVariable Long id) {
        Aliquota registro = service.getById(id);
        return new ResponseEntity<>(registro, HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<Aliquota> createAliquota(@RequestBody Aliquota aliquota) {
        Aliquota registro = service.save(aliquota);
        return new ResponseEntity<>(registro, HttpStatus.CREATED);
    }

    @PostMapping("/list")
    public ResponseEntity<List<Aliquota>> createAliquotas(@RequestBody List<Aliquota> aliquotas) {
        List<Aliquota> registros = service.saveList(aliquotas);
        return new ResponseEntity<>(registros, HttpStatus.OK);
    }

    @PutMapping("/")
    public ResponseEntity<Aliquota> updateAliquota(@RequestBody Aliquota aliquota) {
        Aliquota registro = service.save(aliquota);
        return new ResponseEntity<>(registro, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        service.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/od")
    public ResponseEntity<Aliquota> getAliquotaByOrigemDestino(
            @RequestParam("origem") String origem, 
            @RequestParam("destino") String destino
    ) {
        Aliquota registro = service.getByOrigemDestino(origem, destino);
        return new ResponseEntity<>(registro, HttpStatus.OK);
    }

}
