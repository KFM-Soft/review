package com.review.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.review.models.Aliquota;


public interface AliquotaRepository extends JpaRepository<Aliquota, Long>{

    @Query("""
        SELECT a FROM Aliquota a 
        LEFT JOIN Estado e ON a.origem.id = e.id
        LEFT JOIN Estado e2 ON a.destino.id = e2.id
        WHERE e.uf LIKE %?1%
        OR e2.uf LIKE %?1%
        OR e.nome LIKE %?1%
        OR e2.nome LIKE %?1%
        OR CAST(a.porcentagem AS string) LIKE %?1%
        """)
    public Page<Aliquota> busca (String TermoBusca, Pageable page);

    @Query("SELECT a FROM Aliquota a WHERE a.origem.uf = ?1 AND a.destino.uf = ?2 AND a.sistema = true")
    public Aliquota findByOrigemDestino(String origem, String destino);

    @Query("SELECT a FROM Aliquota a WHERE a.empresa.id = ?3 AND a.origem.uf = ?1 AND a.destino.uf = ?2 AND a.sistema = false " )
    public Aliquota findByOrigemDestinoEmpresa(String origem, String destino, Long empresa_id);

    @Query("""
        SELECT a FROM Aliquota a 
        WHERE a.empresa.id = ?1 
        """)
    public Page<Aliquota> findByEmpresaId(Long empresa, Pageable page);

    @Query("""
        SELECT a FROM Aliquota a 
        LEFT JOIN Estado e ON a.origem.id = e.id
        LEFT JOIN Estado e2 ON a.destino.id = e2.id
        WHERE a.empresa.id = ?2 
        AND a.sistema = false
        AND (e.uf LIKE %?1%
        OR e2.uf LIKE %?1%
        OR e.nome LIKE %?1%
        OR e2.nome LIKE %?1%
        OR CAST(a.porcentagem AS string) LIKE %?1%)
        """)
    public Page<Aliquota> buscaByEmpresaId(String termoBusca, Long empresa, Pageable page);

    @Query("""
        SELECT a FROM Aliquota a 
        WHERE a.sistema = true
        """)
    public Page<Aliquota> findBySistema(Pageable page);

    @Query("""
        SELECT a FROM Aliquota a 
        LEFT JOIN Estado e ON a.origem.id = e.id
        LEFT JOIN Estado e2 ON a.destino.id = e2.id
        WHERE a.sistema = true
        AND (e.uf LIKE %?1%
        OR e2.uf LIKE %?1%
        OR e.nome LIKE %?1%
        OR e2.nome LIKE %?1%
        OR CAST(a.porcentagem AS string) LIKE %?1%)
        """)
    public Page<Aliquota> buscaBySistema(String termoBusca, Pageable page);


    
}
