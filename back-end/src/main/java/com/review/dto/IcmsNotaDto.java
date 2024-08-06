package com.review.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class IcmsNotaDto {
    private String nomeArquivo;
    private String numeroNota;
    private String nomeFornecedor;
    private String nomeEmpresa;
    private String ufEmitente;
    private String ufDestinatario;
    private List<IcmsProdutoDto> produtos;
}
