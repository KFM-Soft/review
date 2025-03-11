package com.review.models;

import java.io.Serializable;

import org.springframework.beans.factory.annotation.Value;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="usuarios")
@Getter
@Setter
public class Usuario implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;

    @Column(nullable = false)
    private String nomeCompleto;

    @Column(nullable = false)
    private String nomeUsuario;

    @Column(nullable = false)
    @JsonProperty(access = Access.WRITE_ONLY)
    private String senha;

    @Column(nullable = false)
    private Short quantidadeDeEmpresas = 0;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Epapel papel = Epapel.ROLE_CLIENTE;

    @Column(nullable = false, columnDefinition = "TINYINT(1) NOT NULL DEFAULT 1")
    @Value("true")
    private boolean ativo = true;

}
