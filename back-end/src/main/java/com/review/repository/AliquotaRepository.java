package com.review.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.review.models.Aliquota;

public interface AliquotaRepository extends JpaRepository<Aliquota, Long>{

    @Query("SELECT a FROM Aliquota a WHERE a.origem.uf = ?1 AND a.destino.uf = ?2")
    public Aliquota findByOrigemDestino(String origem, String destino);
    
}
