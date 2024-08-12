package com.review.dto;

import java.math.BigDecimal;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class IcmsProdutoDto {
    private String descricaoProduto;
    private String ncmCest;
    private BigDecimal valorProduto;
    private BigDecimal aliquotaInterestadual;
    private BigDecimal aliquotaInternaEmit;
    private BigDecimal valorIcms;
    private BigDecimal mva;
    private BigDecimal prodMva;
    private BigDecimal baseST;
    private BigDecimal resultadoIcmsST;
}
