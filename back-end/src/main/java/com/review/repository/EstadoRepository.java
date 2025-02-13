package com.review.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.review.models.Estado;

public interface EstadoRepository extends JpaRepository<Estado, Long>{

    @Query("""
        SELECT e FROM Estado e
        WHERE e.nome LIKE %?1%
        OR e.uf LIKE %?1%
        """)
    public Page<Estado> busca(String termoBusca, Pageable page);
    
}
