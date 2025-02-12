package com.review.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.review.models.Multiplicador;

public interface MultiplicadorRepository extends JpaRepository<Multiplicador, Long>{
    
    @Query("SELECT multi FROM Multiplicador multi WHERE ncm.cest = ?1 AND sistema = true")
    public Multiplicador getMultiplicadorByCest(String cest);

    @Query("SELECT multi FROM Multiplicador multi WHERE ncm.ncm LIKE ?1 AND sistema = true")
    public Multiplicador getMultiplicadorByNCM(String ncm);

    @Query("SELECT multi FROM Multiplicador multi WHERE ncm.id = ?1 AND aliquota.id = ?2 AND sistema = true")
    public Page<Multiplicador> getMultiplicadorByNcmIdAndAliquotaId(Long ncm_id, Long aliquota_id, Pageable page);

    public Page<Multiplicador> findBySistema(boolean sistema, Pageable page);

    @Query("SELECT multi FROM Multiplicador multi WHERE empresa.id = ?1")
    public Page<Multiplicador> getByEmpresaId(Long empresa_id, Pageable page);

    @Query("SELECT multi FROM Multiplicador multi WHERE ncm.cest = ?1 AND empresa.id = ?2 AND sistema = false")
    public Multiplicador getMultiplicadorByCestAndEmpresa(String cest, Long empresa_id);

    @Query("SELECT multi FROM Multiplicador multi WHERE ncm.ncm LIKE ?1 AND empresa.id = ?2 AND sistema = false")
    public Multiplicador getMultiplicadorByNCMAndEmpresa(String ncm, Long empresa_id);

    @Query("SELECT multi FROM Multiplicador multi WHERE ncm.id = ?1 AND aliquota.id = ?2 and empresa.id = ?3AND sistema = false")
    public Page<Multiplicador> getMultiplicadorByNcmIdAndAliquotaIdAndEmpresa(Long ncm_id, Long aliquota_id, Long empresa_id, Pageable page);
}
