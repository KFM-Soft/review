-- drop database review;
use review;

insert into review.estados (uf, nome) values 
("AC", "Acre"), ("AL", "Alagoas"), ("AM", "Amazonas"), ("AP", "Amapá"), ("BA", "Bahia"), ("CE", "Ceará"), ("DF", "Distrito Federal"), 
("ES", "Espírito Santo"), ("GO", "Goiás"), ("MA", "Maranhão"), ("MT", "Mato Grosso"), ("MS", "Mato Grosso do Sul"), ("MG", "Minas Gerais"), ("PA", "Pará"), 
("PB", "Paraíba"), ("PR", "Paraná"), ("PE", "Pernambuco"), ("PI", "Piauí"), ("RN", "Rio Grande do Norte"), ("RS", "Rio Grande do Sul"), ("RJ", "Rio de Janeiro"), 
("RO", "Rondônia"), ("RR", "Roraima"), ("SC", "Santa Catarina"), ("SP", "São Paulo"), ("SE", "Sergipe"), ("TO", "Tocantins");

insert into review.produtos (ncm, cest, cfop, descricao) values 
(19023000, 1704701, 6102, "Massas alimentícias tipo instantânea, exceto as descritas no CEST 17047.01."),
(19021900, 1704904, 6101, "Massas alimentícias do tipo sêmola, não cozidas, nem recheadas, nem preparadas de outro modo, que não contenham ovos, derivadas de farinha de trigo, exceto as descritas no CEST 17.049.09");

insert into review.produtos_estados (estado_id, produto_id, aliquota_interna) values 
(1, 1, 17.00),
(1, 2, 17.00);

insert into review.aliquotas_interestaduais (origem_id, destino_id, porcentagem) values 
(1, 9, 12.00),
(9, 1, 12.00),
(1, 1, 19.00),
(9, 9, 17.00);

insert into review.multiplicadores_produtos (aliquota_id, produto_id, mva_ajustada, multiplicador_original, multiplicador_ajustado, mva_original) VALUES
(2, 1, null, 12.65, null, 45.00),
(2, 2, null, 12.65, null, 45.00);
