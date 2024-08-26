package com.review.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.review.models.TipoUsuario;
import com.review.repository.TipoUsuarioRepository;

@Service
public class TipoUsuarioService {

    @Autowired
    private TipoUsuarioRepository repository;

    public List<TipoUsuario> getAll() {
        return repository.findAll();
    }

    public TipoUsuario getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public TipoUsuario save(TipoUsuario objeto) {
        return repository.save(objeto);
    }

    public List<TipoUsuario> saveList(List<TipoUsuario> TipoUsuarios) {
        return repository.saveAll(TipoUsuarios);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
