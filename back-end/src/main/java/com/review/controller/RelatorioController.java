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
import org.springframework.web.bind.annotation.RestController;

import com.review.models.Relatorio;
import com.review.service.RelatorioService;

@RestController
@RequestMapping("/relatorio")
public class RelatorioController {
    @Autowired
    private RelatorioService service;

    @GetMapping("/")
    public ResponseEntity<List<Relatorio>> getRelatorios(){
        List<Relatorio> registros = service.getAll();
        return new ResponseEntity<>(registros, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Relatorio> getRelatorioById(@PathVariable Long id) {
        Relatorio registro = service.getById(id);
        return new ResponseEntity<>(registro, HttpStatus.OK);
    }

    @GetMapping("/empresa/{empresa_id}")
    public ResponseEntity<Page<Relatorio>> getByEmpresaId(@PathVariable Long empresa_id,
    @SortDefaults({
        @SortDefault(sort = "data", direction = org.springframework.data.domain.Sort.Direction.ASC)
    }) Pageable page
    ){
        Page<Relatorio> registros = service.getByEmpresaId(empresa_id, page);
        return new ResponseEntity<>(registros, HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<Relatorio> createRelatorio(@RequestBody Relatorio Relatorio) {
        Relatorio registro = service.save(Relatorio);
        return new ResponseEntity<>(registro, HttpStatus.CREATED);
    }

    @PostMapping("/list")
    public ResponseEntity<List<Relatorio>> createRelatorios(@RequestBody List<Relatorio> Relatorios) {
        List<Relatorio> registros = service.saveList(Relatorios);
        return new ResponseEntity<>(registros, HttpStatus.OK);
    }

    @PutMapping("/")
    public ResponseEntity<Relatorio> updateRelatorio(@RequestBody Relatorio Relatorio) {
        Relatorio registro = service.save(Relatorio);
        return new ResponseEntity<>(registro, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        service.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
