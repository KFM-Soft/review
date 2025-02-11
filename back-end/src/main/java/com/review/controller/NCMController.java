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

import com.review.models.NCM;
import com.review.service.NCMService;


@RestController
@RequestMapping("/ncm")
public class NCMController {
    
    @Autowired
    private NCMService service;

    @GetMapping("/")
    public ResponseEntity<List<NCM>> getNCMs(){
        List<NCM> registros = service.getAll();
        return new ResponseEntity<>(registros, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<NCM> getNCMById(@PathVariable Long id) {
        NCM registro = service.getById(id);
        return new ResponseEntity<>(registro, HttpStatus.OK);
    }

    @GetMapping("/sistema/{sistema}")
    public ResponseEntity<List<NCM>> getBySistema(@PathVariable boolean sistema){
        List<NCM> registros = service.getBySistema(sistema);
        return new ResponseEntity<>(registros, HttpStatus.OK);
    }

    @GetMapping("/empresa/{empresa_id}")
    public ResponseEntity<List<NCM>> getByEmpresaId(@PathVariable Long empresa_id){
        List<NCM> registros = service.getByEmpresaId(empresa_id);
        return new ResponseEntity<>(registros, HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<NCM> createNCM(@RequestBody NCM ncm) {
        NCM registro = service.save(ncm);
        return new ResponseEntity<>(registro, HttpStatus.CREATED);
    }

    @PostMapping("/list")
    public ResponseEntity<List<NCM>> createNCMs(@RequestBody List<NCM> ncms) {
        List<NCM> registros = service.saveList(ncms);
        return new ResponseEntity<>(registros, HttpStatus.OK);
    }

    @PutMapping("/")
    public ResponseEntity<NCM> updateNCM(@RequestBody NCM ncm) {
        NCM registro = service.save(ncm);
        return new ResponseEntity<>(registro, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        service.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
