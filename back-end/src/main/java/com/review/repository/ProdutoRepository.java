package com.review.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.review.models.Produto;

public interface ProdutoRepository extends JpaRepository<Produto, Long>{
    
}
