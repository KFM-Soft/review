package com.review.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.review.models.Multiplicador;

public interface MultiplicadorRepository extends JpaRepository<Multiplicador, Long>{
    
    @Query("SELECT multi FROM Multiplicador multi WHERE produto.cest = ?1 and sistema = true")
    public Multiplicador getMultiplicadorByCest(String cest);

    @Query("SELECT multi FROM Multiplicador multi WHERE produto.ncm LIKE ?1 and sistema = true")
    public Multiplicador getMultiplicadorByNCM(String ncm);

    @Query("SELECT multi FROM Multiplicador multi WHERE produto.id = ?1 and aliquota.id = ?2 and sistema = true")
    public List<Multiplicador> getMultiplicadorByProdutoIdAndAliquotaId(Long produto_id, Long aliquota_id);

    public List<Multiplicador> findBySistema(boolean sistema);

    @Query("SELECT multi FROM Multiplicador multi WHERE empresa.id = ?1")
    public List<Multiplicador> getByEmpresaId(Long empresa_id);

    @Query("SELECT multi FROM Multiplicador multi WHERE produto.cest = ?1 and empresa.id = ?2")
    public Multiplicador getMultiplicadorByCestAndEmpresa(String cest, Long empresa_id);

    @Query("SELECT multi FROM Multiplicador multi WHERE produto.ncm LIKE ?1 and empresa.id = ?2")
    public Multiplicador getMultiplicadorByNCMAndEmpresa(String ncm, Long empresa_id);

    @Query("SELECT multi FROM Multiplicador multi WHERE produto.id = ?1 and aliquota.id = ?2 and empresa.id = ?3")
    public List<Multiplicador> getMultiplicadorByProdutoIdAndAliquotaIdAndEmpresa(Long produto_id, Long aliquota_id, Long empresa_id);
}
