package com.review.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.review.models.Estado;

public interface EstadoRepository extends JpaRepository<Estado, Long>{
    
}
