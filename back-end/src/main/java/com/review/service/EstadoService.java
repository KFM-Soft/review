package com.review.service;

import java.util.Comparator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.review.models.Estado;
import com.review.repository.EstadoRepository;

@Service
public class EstadoService {

    @Autowired
    private EstadoRepository repository;

    public List<Estado> get(String termoBusca) {
        List<Estado> registros = this.getAll(termoBusca, Pageable.unpaged()).getContent();
        List<Estado> registrosOrdenados = registros.stream().sorted(Comparator.comparing(Estado::getNome)).toList();
        return registrosOrdenados;
    }

    public Page<Estado> getAll(String termoBusca, org.springframework.data.domain.Pageable page) {
        if (termoBusca != null && !termoBusca.isBlank()) {
            return repository.busca(termoBusca, page);
            
        }
        return repository.findAll(page);
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
