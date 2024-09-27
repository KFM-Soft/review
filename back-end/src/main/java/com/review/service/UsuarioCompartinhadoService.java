package com.review.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.review.models.UsuarioCompartilhado;
import com.review.repository.UsuarioCompartinhadoRepository;

@Service
public class UsuarioCompartinhadoService {
    @Autowired
    private UsuarioCompartinhadoRepository repository;

    public List<UsuarioCompartilhado> getAll() {
        return repository.findAll();
    }

    public UsuarioCompartilhado getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public UsuarioCompartilhado save(UsuarioCompartilhado objeto) {
        return repository.save(objeto);
    }

    public List<UsuarioCompartilhado> saveList(List<UsuarioCompartilhado> Usuarios) {
        return repository.saveAll(Usuarios);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
