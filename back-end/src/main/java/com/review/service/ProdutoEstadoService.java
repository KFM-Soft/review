package com.review.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.review.models.ProdutoEstado;
import com.review.repository.ProdutoEstadoRepository;

@Service
public class ProdutoEstadoService {

    @Autowired
    private ProdutoEstadoRepository repository;

    public List<ProdutoEstado> getAll() {
        return repository.findAll();
    }

    public ProdutoEstado getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public ProdutoEstado getProdutoEstadoByCestAndUF(String cest, String uf) {
        return repository.getProdutoEstadoByCestAndUF(cest, uf);
    }

    public ProdutoEstado getByProductNcmAndUF(String ncm, String UF) {
        return repository.getProdutoEstadoByNCMAndUF(ncm, UF);
    }

    public ProdutoEstado save(ProdutoEstado objeto) {
        return repository.save(objeto);
    }

    public List<ProdutoEstado> saveList(List<ProdutoEstado> ProdutoEstadoes) {
        return repository.saveAll(ProdutoEstadoes);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    public ProdutoEstado getByProductCestAndUf(String cest, String uf) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getByProductCestAndUf'");
    }



}
