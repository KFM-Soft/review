package com.review.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.review.models.Empresa;


public interface EmpresaRepository extends JpaRepository<Empresa, Long>{

    @Query("SELECT e FROM Empresa e WHERE e.dono.id = ?1")
    public List<Empresa> findByDonoId(Long usuarioId);

}
