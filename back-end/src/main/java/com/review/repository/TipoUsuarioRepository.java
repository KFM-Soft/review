package com.review.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.review.models.TipoUsuario;

public interface TipoUsuarioRepository extends JpaRepository<TipoUsuario, Long>{
    
}
