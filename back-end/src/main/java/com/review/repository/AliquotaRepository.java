package com.review.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.review.models.Aliquota;

import java.util.List;


public interface AliquotaRepository extends JpaRepository<Aliquota, Long>{

    @Query("SELECT a FROM Aliquota a WHERE a.origem.uf = ?1 AND a.destino.uf = ?2 AND a.sistema = true")
    public Aliquota findByOrigemDestino(String origem, String destino);

    @Query("SELECT a FROM Aliquota a WHERE a.empresa.id = ?1 AND a.sistema = false")
    public List<Aliquota> findByEmpresaId(Long empresa);

    public List<Aliquota> findBySistema(boolean sistema);


    
}
