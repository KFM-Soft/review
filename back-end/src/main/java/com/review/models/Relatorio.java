package com.review.models;

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
@Table(name="relatorios")
@Getter
@Setter
public class Relatorio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;

    @Column(nullable = false)
    private String empresa;

    @Column(nullable = false)
    private String arquivo;

    @Column(nullable = false, columnDefinition = "DECIMAL(8,2)")
    private BigDecimal valorTotal;

    @Column(nullable = false, columnDefinition = "DECIMAL(8,2)")
    private BigDecimal valorCalculado;
}
