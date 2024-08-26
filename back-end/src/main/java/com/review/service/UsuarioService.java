package com.review.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.review.models.Usuario;
import com.review.repository.UsuarioRepository;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository repository;

    public List<Usuario> getAll() {
        return repository.findAll();
    }

    public Usuario getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Usuario save(Usuario objeto) {
        return repository.save(objeto);
    }

    public List<Usuario> saveList(List<Usuario> Usuarios) {
        return repository.saveAll(Usuarios);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    public Usuario getByNomeUsuario(String nomeUsuario) {
        return repository.findByNomeUsuario(nomeUsuario);
    }
}
