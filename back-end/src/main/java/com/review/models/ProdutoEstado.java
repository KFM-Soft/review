package com.review.models;

import java.io.Serializable;
import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="produtos_estados")
@Getter
@Setter
public class ProdutoEstado implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;

    @ManyToOne(optional = false)
    private Estado estado;

    @ManyToOne(optional = false)
    private Produto produto;
    
    @Column(columnDefinition = "DECIMAL(5,2)")
    private BigDecimal aliquotaInterna;

    @Column(columnDefinition = "DECIMAL(5,2)")
    private BigDecimal mvaOriginal;
}
