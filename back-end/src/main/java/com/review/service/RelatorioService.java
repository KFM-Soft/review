package com.review.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.review.models.Relatorio;
import com.review.repository.RelatorioRepository;

@Service
public class RelatorioService{
    
    @Autowired
    private RelatorioRepository repository;

    public List<Relatorio> getAll() {
        return repository.findAll();
    }

    public Relatorio getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Page<Relatorio> getByEmpresaId(long empresa_id, Pageable page){
        return repository.getByEmpresaId(empresa_id, page);
    }

    public Relatorio save(Relatorio objeto) {
        return repository.save(objeto);
    }

    public List<Relatorio> saveList(List<Relatorio> relatorio) {
        return repository.saveAll(relatorio);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
