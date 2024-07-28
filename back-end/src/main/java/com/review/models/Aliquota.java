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
import jakarta.persistence.UniqueConstraint;
import lombok.Getter;
import lombok.Setter;

// Essa classe trata das aliquotas interestaduais
@Entity
@Table(name = "aliquotas_interestaduais", uniqueConstraints = {@UniqueConstraint(columnNames = {"origem_id", "destino_id"})})
@Getter
@Setter
public class Aliquota implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;

    @ManyToOne(optional = false)
    private Estado origem;

    @ManyToOne(optional = false)
    private Estado destino;

    @Column(nullable = false, columnDefinition = "DECIMAL(5,2)")
    private BigDecimal porcentagem;
    
}
