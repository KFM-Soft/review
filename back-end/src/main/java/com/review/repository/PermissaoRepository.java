package com.review.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.review.models.Permissao;

public interface PermissaoRepository extends JpaRepository<Permissao, Long>{
    
}
