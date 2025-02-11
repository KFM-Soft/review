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

@Entity
@Table(name = "multiplicadores_ncms", uniqueConstraints = {@UniqueConstraint(columnNames = {"ncm_id", "aliquota_id", "empresa_id"})})
@Getter
@Setter
public class Multiplicador implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;

    @ManyToOne(optional = false)
    private NCM ncm;

    @ManyToOne(optional = false)
    private Aliquota aliquota;

    @Column(name = "aliquota_interna_emitente", columnDefinition = "DECIMAL(5,2)")
    private BigDecimal aliquotaInternaEmit;

    @Column(columnDefinition = "DECIMAL(5,2)")
    private BigDecimal mvaOriginal;

    @Column(nullable = false, columnDefinition = "DECIMAL(5,2)")
    private BigDecimal multiplicadorOriginal;

    @Column(columnDefinition = "DECIMAL(5,2)")
    private BigDecimal mvaAjustada;

    @Column(columnDefinition = "DECIMAL(5,2)")
    private BigDecimal multiplicadorAjustado;

    @ManyToOne
    private Empresa empresa;

    @Column(nullable = false, columnDefinition = "TINYINT(0) NOT NULL DEFAULT 0")
    private boolean sistema = false;
}
