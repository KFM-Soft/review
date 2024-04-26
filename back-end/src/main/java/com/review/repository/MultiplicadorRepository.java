package com.review.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.review.models.Multiplicador;

public interface MultiplicadorRepository extends JpaRepository<Multiplicador, Long>{
    
    @Query("SELECT multi FROM Multiplicador multi WHERE produto.cest = ?1")
    public Multiplicador getMultiplicadorByCest(String cest);
}
