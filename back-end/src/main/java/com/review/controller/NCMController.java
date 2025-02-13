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

import com.review.models.NCM;
import com.review.service.NCMService;


@RestController
@RequestMapping("/ncm")
public class NCMController {
    
    @Autowired
    private NCMService service;

    @GetMapping("/")
    public ResponseEntity<Page<NCM>> getNCMs(@RequestParam(required = false) String termoBusca, Pageable page) {
        Page<NCM> registros = service.getAll(termoBusca, page);
        return new ResponseEntity<>(registros, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<NCM> getNCMById(@PathVariable Long id) {
        NCM registro = service.getById(id);
        return new ResponseEntity<>(registro, HttpStatus.OK);
    }

    @GetMapping("/sistema/{sistema}")
    public ResponseEntity<Page<NCM>> getBySistema(@PathVariable boolean sistema, 
    @SortDefaults({
        @SortDefault(sort = "ncm", direction = org.springframework.data.domain.Sort.Direction.ASC)
    }) Pageable page
    ){
        Page<NCM> registros = service.getBySistema(sistema, page);
        return new ResponseEntity<>(registros, HttpStatus.OK);
    }

    @GetMapping("/empresa/{empresa_id}")
    public ResponseEntity<Page<NCM>> getByEmpresaId(@RequestParam(required = false) String termoBuca,
    @PathVariable Long empresa_id,
    @SortDefaults({
        @SortDefault(sort = "ncm", direction = org.springframework.data.domain.Sort.Direction.ASC)
    }) Pageable page
    ){
        Page<NCM> registros = service.getByEmpresaId(termoBuca, empresa_id, page);
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
