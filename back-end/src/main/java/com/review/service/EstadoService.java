package com.review.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.review.models.Estado;
import com.review.repository.EstadoRepository;

@Service
public class EstadoService {

    @Autowired
    private EstadoRepository repository;

    public List<Estado> getAll() {
        return repository.findAll();
    }

    public Estado getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Estado save(Estado objeto) {
        return repository.save(objeto);
    }

    public List<Estado> saveList(List<Estado> estados) {
        return repository.saveAll(estados);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }



}
