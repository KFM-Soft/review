package com.review.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.review.models.Empresa;

public interface EmpresaRepository extends JpaRepository<Empresa, Long>{
    
}
