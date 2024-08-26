package com.review.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.review.models.Precificacao;

public interface PrecificacaoRepository extends JpaRepository<Precificacao, Long>{
    
}
