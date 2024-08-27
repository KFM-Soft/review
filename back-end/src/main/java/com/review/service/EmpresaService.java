package com.review.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.review.models.Empresa;
import com.review.repository.EmpresaRepository;

@Service
public class EmpresaService {

    @Autowired
    private EmpresaRepository repository;

    public List<Empresa> getAll() {
        return repository.findAll();
    }

    public Empresa getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public List<Empresa> getByDono(Long id){
        return repository.findByDonoId(id);
    }

    public Empresa save(Empresa objeto) {
        return repository.save(objeto);
    }

    public List<Empresa> saveList(List<Empresa> Empresas) {
        return repository.saveAll(Empresas);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }
    
}
