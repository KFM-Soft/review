package com.review.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.review.models.Produto;
import com.review.repository.ProdutoRepository;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository repository;

    public List<Produto> getAll() {
        return repository.findAll();
    }

    public Produto getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public List<Produto> getByEmpresaId(long id){
        return repository.getByEmpresaId(id);
    }

    public List<Produto> getBySistema(boolean sistema){
        return repository.findBySistema(sistema);
    }

    public Produto save(Produto objeto) {
        return repository.save(objeto);
    }

    public List<Produto> saveList(List<Produto> produtos) {
        return repository.saveAll(produtos);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }



}
