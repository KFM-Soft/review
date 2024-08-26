package com.review.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.review.models.Precificacao;
import com.review.repository.PrecificacaoRepository;

@Service
public class PrecificacaoService {
    @Autowired
    private PrecificacaoRepository repository;

    public List<Precificacao> getAll() {
        return repository.findAll();
    }

    public Precificacao getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Precificacao save(Precificacao objeto) {
        return repository.save(objeto);
    }

    public List<Precificacao> saveList(List<Precificacao> Precificacaos) {
        return repository.saveAll(Precificacaos);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
