package com.review.service;

import java.util.Comparator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.review.models.Empresa;
import com.review.repository.EmpresaRepository;

@Service
public class EmpresaService {

    @Autowired
    private EmpresaRepository repository;

    public List<Empresa> get(String termoBusca) {
        List<Empresa> registros = this.getAll(termoBusca, Pageable.unpaged()).getContent();
        List<Empresa> registrosOrdenados = registros.stream().sorted(Comparator.comparing(Empresa::getNome)).toList();
        return registrosOrdenados;
    }

    public Page<Empresa> getAll(String termoBusca, Pageable page) {
        if (termoBusca != null && !termoBusca.isBlank()) {
            return repository.busca(termoBusca, page);
        }
        return repository.findAll(page);
    }

    public Empresa getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Page<Empresa> getByDono(String termoBusca, Long id, Pageable page) {
        if (termoBusca != null && !termoBusca.isBlank()) {
            return repository.buscaByDonoId(termoBusca, id, page);
        }
        return repository.findByDonoId(id, page);
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
