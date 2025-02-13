package com.review.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.review.models.NCM;


public interface NCMRepository extends JpaRepository<NCM, Long>{

    @Query("""
        SELECT ncm FROM NCM ncm 
        WHERE ncm.ncm LIKE %?1%
        OR ncm.cest LIKE %?1%
        OR ncm.cfop LIKE %?1%
        OR ncm.descricao LIKE %?1%
        """)
    public Page<NCM> busca (String TermoBusca, Pageable page);
    @Query("""
        SELECT ncm FROM NCM ncm 
        WHERE ncm.sistema = true
        """)
    public Page<NCM> findBySistema(Pageable page);

    @Query("""
        SELECT ncm FROM NCM ncm 
        WHERE ncm.sistema = true
        AND (ncm.ncm LIKE %?1%
        OR ncm.cest LIKE %?1%
        OR ncm.cfop LIKE %?1%
        OR ncm.descricao LIKE %?1%)
        """)
    public Page<NCM> BuscaBySistema(String termobusca, Pageable page);

    @Query("SELECT prod FROM NCM prod WHERE empresa.id = ?1")
    public Page<NCM> getByEmpresaId(Long empresa_id, Pageable page);

    @Query("""
        SELECT ncm FROM NCM ncm
        WHERE ncm.empresa.id = ?2
        AND (ncm.ncm LIKE %?1%
        OR ncm.cest LIKE %?1%
        OR ncm.cfop LIKE %?1%
        OR ncm.descricao LIKE %?1%)
        """)
    public Page<NCM> buscaByEmpresaId(String termobusca, Long empresa_id, Pageable page);
}
