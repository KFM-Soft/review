package com.review.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.review.models.UsuarioCompartinhado;

public interface UsuarioCompartinhadoRepository extends JpaRepository<UsuarioCompartinhado, Long>{
    
}
