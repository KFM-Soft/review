package com.review.models;

import java.io.Serializable;
import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="precificacoes")
@Getter
@Setter
public class Precificacao implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "TINYINT")
    private Short id;
 
    @Column(nullable = false)
    private String opcao;

    @Column(columnDefinition = "DECIMAL(7,2)")
    private BigDecimal valor;
}
