package com.review.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.review.models.UsuarioCompartilhado;

public interface UsuarioCompartilhadoRepository extends JpaRepository<UsuarioCompartilhado, Long>{
    
}
