package com.review.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.review.models.Relatorio;
import java.util.List;


public interface RelatorioRepository extends JpaRepository<Relatorio, Long> {

    @Query("SELECT rela FROM Relatorio rela WHERE empresa.id = ?1")
    List<Relatorio> getByEmpresaId(Long empresa_id);
}
