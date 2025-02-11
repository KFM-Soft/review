package com.review.models;

import java.io.Serializable;

import org.springframework.beans.factory.annotation.Value;

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
@Table(name="NCMs")
@Getter
@Setter
public class NCM implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;

    @Column(columnDefinition = "VARCHAR(500)")
    private String descricao;

    @Column(nullable = false)
    private String ncm;

    @Column()
    private String cest;

    @Column(nullable = false)
    private String cfop;

    @ManyToOne
    private Empresa empresa;

    @Column(nullable = false, columnDefinition = "TINYINT(0) NOT NULL DEFAULT 0")
    @Value("false")
    private boolean sistema = false;

}
