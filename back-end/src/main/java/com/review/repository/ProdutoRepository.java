package com.review.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.review.models.Produto;
import java.util.List;


public interface ProdutoRepository extends JpaRepository<Produto, Long>{
    
    public List<Produto> findBySistema(boolean sistema);

    @Query("SELECT prod FROM Produto prod WHERE empresa.id = ?1")
    public List<Produto> getByEmpresaId(Long empresa_id);
}
