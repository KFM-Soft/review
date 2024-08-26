package com.review.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.review.models.UsuarioCompartinhado;
import com.review.repository.UsuarioCompartinhadoRepository;

@Service
public class UsuarioCompartinhadoService {
    @Autowired
    private UsuarioCompartinhadoRepository repository;

    public List<UsuarioCompartinhado> getAll() {
        return repository.findAll();
    }

    public UsuarioCompartinhado getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public UsuarioCompartinhado save(UsuarioCompartinhado objeto) {
        return repository.save(objeto);
    }

    public List<UsuarioCompartinhado> saveList(List<UsuarioCompartinhado> Usuarios) {
        return repository.saveAll(Usuarios);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
