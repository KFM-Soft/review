package com.review.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.review.models.Aliquota;

public interface AliquotaRepository extends JpaRepository<Aliquota, Long>{
    
}
