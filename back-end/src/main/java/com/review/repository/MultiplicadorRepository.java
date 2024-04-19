package com.review.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.review.models.Multiplicador;

public interface MultiplicadorRepository extends JpaRepository<Multiplicador, Long>{
    
}
