package com.review.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.review.models.Relatorio;


public interface RelatorioRepository extends JpaRepository<Relatorio, Long> {

    @Query("SELECT rela FROM Relatorio rela WHERE empresa.id = ?1")
    Page<Relatorio> getByEmpresaId(Long empresa_id, Pageable page);
}
