package com.review.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.review.models.NCM;


public interface NCMRepository extends JpaRepository<NCM, Long>{
    
    public Page<NCM> findBySistema(boolean sistema, Pageable page);

    @Query("SELECT prod FROM NCM prod WHERE empresa.id = ?1")
    public Page<NCM> getByEmpresaId(Long empresa_id, Pageable page);
}
