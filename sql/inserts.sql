-- drop database review;
use review;

insert into review.estados (id, uf, nome) values 
(1, "AC", "Acre"), (2, "AL", "Alagoas"), (3, "AM", "Amazonas"), (4, "AP", "Amapá"), (5, "BA", "Bahia"), (6, "CE", "Ceará"), (7, "DF", "Distrito Federal"), 
(8, "ES", "Espírito Santo"), (9, "GO", "Goiás"), (10, "MA", "Maranhão"), (11, "MT", "Mato Grosso"), (12, "MS", "Mato Grosso do Sul"), (13, "MG", "Minas Gerais"), (14, "PA", "Pará"), 
(15, "PB", "Paraíba"), (16, "PR", "Paraná"), (17, "PE", "Pernambuco"), (18,  "PI", "Piauí"), (19, "RN", "Rio Grande do Norte"), (20, "RS", "Rio Grande do Sul"), (21, "RJ", "Rio de Janeiro"), 
(22, "RO", "Rondônia"), (23, "RR", "Roraima"), (24, "SC", "Santa Catarina"), (25, "SP", "São Paulo"), (26, "SE", "Sergipe"), (27, "TO", "Tocantins");

insert into review.produtos (ncm, cest, cfop, descricao) values 
(19023000, 1704701, 6102, "Massas alimentícias tipo instantânea, exceto as descritas no CEST 17047.01."),
(19021900, 1704904, 6101, "Massas alimentícias do tipo sêmola, não cozidas, nem recheadas, nem preparadas de outro modo, que não contenham ovos, derivadas de farinha de trigo, exceto as descritas no CEST 17.049.09");


insert into review.aliquotas_interestaduais (origem_id, destino_id, porcentagem) values 
(1, 9, 12.00),
(9, 1, 12.00),
(1, 1, 19.00),
(9, 9, 17.00);

insert into review.multiplicadores_produtos (aliquota_id, produto_id, aliquota_interna_emitente, mva_ajustada, multiplicador_original, multiplicador_ajustado, mva_original, aliquota_interestadual_emitente) VALUES
(2, 1, 17.00, null, 12.65, null, 45.00, 12.00),
(2, 2, 17.00, null, 12.65, null, 45.00, 12.00);
