package com.review.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.review.models.Multiplicador;

public interface MultiplicadorRepository extends JpaRepository<Multiplicador, Long>{
    
    @Query("SELECT multi FROM Multiplicador multi WHERE produto.cest = ?1")
    public Multiplicador getMultiplicadorByCest(String cest);

    @Query("SELECT multi FROM Multiplicador multi WHERE produto.ncm = ?1")
    public Multiplicador getMultiplicadorByNCM(String ncm);

    @Query("SELECT multi FROM Multiplicador multi WHERE produto.id = ?1 and aliquota.id = ?2")
    public List<Multiplicador> getMultiplicadorByProdutoIdAndAliquotaId(Long produto_id, Long aliquota_id);
}
