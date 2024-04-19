package com.review.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.review.models.Aliquota;
import com.review.repository.AliquotaRepository;

@Service
public class AliquotaService {

    @Autowired
    private AliquotaRepository repository;

    public List<Aliquota> getAll() {
        return repository.findAll();
    }

    public Aliquota getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Aliquota save(Aliquota objeto) {
        return repository.save(objeto);
    }

    public List<Aliquota> saveList(List<Aliquota> aliquotas) {
        return repository.saveAll(aliquotas);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }



}
