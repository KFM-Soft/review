package com.review.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.review.models.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long>{
    
}
