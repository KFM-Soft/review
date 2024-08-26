package com.review.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.review.models.Permissao;
import com.review.repository.PermissaoRepository;

@Service
public class PermissaoService {
        @Autowired
    private PermissaoRepository repository;

    public List<Permissao> getAll() {
        return repository.findAll();
    }

    public Permissao getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Permissao save(Permissao objeto) {
        return repository.save(objeto);
    }

    public List<Permissao> saveList(List<Permissao> Permissaos) {
        return repository.saveAll(Permissaos);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
