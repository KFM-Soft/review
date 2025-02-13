package com.review.repository;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.review.models.Empresa;


public interface EmpresaRepository extends JpaRepository<Empresa, Long>{

    @Query("SELECT e FROM Empresa e WHERE e.dono.id = ?1")
    public Page<Empresa> findByDonoId(Long usuarioId, Pageable page);

    @Query("""
        SELECT e FROM Empresa e
        LEFT JOIN Usuario u ON e.dono.id = u.id
        LEFT JOIN Precificacao p ON e.preco.id = p.id
        WHERE u.id = ?2 
        AND (e.nome LIKE %?1%
        OR e.cnpj LIKE %?1%
        OR e.nomeFantasia LIKE %?1%
        OR u.nomeCompleto LIKE %?1% 
        OR CAST(p.valor AS string ) LIKE %?1%)
        """)
    public Page<Empresa> buscaByDonoId(String termoBusca, Long dono, Pageable page);

    @Query("""
        SELECT e FROM Empresa e
        LEFT JOIN Usuario u ON e.dono.id = u.id
        LEFT JOIN Precificacao p ON e.preco.id = p.id
        WHERE e.nome LIKE %?1%
        OR e.cnpj LIKE %?1%
        OR e.nomeFantasia LIKE %?1%
        OR u.nomeCompleto LIKE %?1% 
        OR CAST(p.valor AS string ) LIKE %?1%
        """)
        public Page<Empresa> busca(String termoBusca, Pageable page);




}
