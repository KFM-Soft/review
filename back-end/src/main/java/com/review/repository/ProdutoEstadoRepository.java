package com.review.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.review.models.ProdutoEstado;

public interface ProdutoEstadoRepository extends JpaRepository<ProdutoEstado, Long>{
    
    @Query("SELECT prodEst FROM ProdutoEstado prodEst WHERE produto.cest = ?1 AND estado.uf = ?2")
    public ProdutoEstado getProdutoEstadoByCestAndUF(String cest, String uf);

    @Query("SELECT prodEst FROM ProdutoEstado prodEst WHERE produto.ncm = ?1 AND estado.uf = ?2")
    public ProdutoEstado getProdutoEstadoByNCMAndUF(String ncm, String uf);
}
