package com.review.models;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="Produtos")
public class Produto implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;

    @ManyToOne(optional = false)
    private Estado UF;

    @Column(columnDefinition = "VARCHAR(500)")
    private String descricao;

    @Column(nullable = false, updatable = false)
    private String ean;

    @Column(nullable = false)
    private String aliquotaInterna;

    @Column(nullable = false)
    private String mvaOriginal;

    @Column(nullable = false)
    private String ncm;

    @Column(nullable = false)
    private String cest;

    @Column(nullable = false)
    private String cfop;

}
