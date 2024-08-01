package com.review.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.review.models.Multiplicador;
import com.review.repository.MultiplicadorRepository;

@Service
public class MultiplicadorService {

    @Autowired
    private MultiplicadorRepository repository;

    public List<Multiplicador> getAll() {
        return repository.findAll();
    }

    public Multiplicador getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public List<Multiplicador> getMultiplicadorByProdutoIdAndAliquotaId(Long produto_id, Long aliquota_id) {
        return repository.getMultiplicadorByProdutoIdAndAliquotaId(produto_id, aliquota_id);
    }

    public Multiplicador getByProductCest(String id) {
        return repository.getMultiplicadorByCest(id);
    }

    public Multiplicador getByProductNcm(String ncm) {
        return repository.getMultiplicadorByNCM(ncm);
    }

    public Multiplicador save(Multiplicador objeto) {
        return repository.save(objeto);
    }

    public List<Multiplicador> saveList(List<Multiplicador> multiplicadores) {
        return repository.saveAll(multiplicadores);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }



}
