INSERT INTO `usuarios` 
VALUES (1,0,1,'admin','admin','$2a$12$QV3i.7sHfiRXSV9LTuS6/e6/QsSnU2/riNCZmI99C1egzItw.wWoq','ROLE_ADMIN'),(1,0,2,'usuario','usuario','$2a$12$Qg.1qYj4ctt3Y1CDizJVquPGGFkV1bb28sNCweGJlRCoqKfC0Dl3q','ROLE_CLIENTE'),(1,0,3,'review','review','$2a$12$52zw3fv7zHcIbpWL5eD.le4fXo40R4UbHPd15yNXX247LubAHkvQq','ROLE_ADMIN');

INSERT INTO `precificacoes` 
VALUES (1,500.00,'pacote 1'),(2,1000.00,'pacote 2'),(3,2000.00,'pacote 3');

INSERT INTO `empresas` 
VALUES (1,2,1,'48.185.856/0001-05','NovaTech Soluções Digitais Ltda.','NovaTech'),(2,2,2,'41.964.674/0001-93','Ponto Verde Sustentabilidade S/A',' EcoPonto'),(3,2,3,'14.217.431/0001-19','Impacto Comercial e Serviços EIRELI','Impacta Fácil');

INSERT INTO `estados` 
VALUES (1,'Acre','AC'),(2,'Alagoas','AL'),(3,'Amazonas','AM'),(4,'Amapá','AP'),(5,'Bahia','BA'),(6,'Ceará','CE'),(7,'Distrito Federal','DF'),(8,'Espírito Santo','ES'),(9,'Goiás','GO'),(10,'Maranhão','MA'),(11,'Mato Grosso','MT'),(12,'Mato Grosso do Sul','MS'),(13,'Minas Gerais','MG'),(14,'Pará','PA'),(15,'Paraíba','PB'),(16,'Paraná','PR'),(17,'Pernambuco','PE'),(18,'Piauí','PI'),(19,'Rio Grande do Norte','RN'),(20,'Rio Grande do Sul','RS'),(21,'Rio de Janeiro','RJ'),(22,'Rondônia','RO'),(23,'Roraima','RR'),(24,'Santa Catarina','SC'),(25,'São Paulo','SP'),(26,'Sergipe','SE'),(27,'Tocantins','TO');

INSERT INTO `produtos` 
VALUES (1,NULL,1,'1704701','6102','Massas alimentícias tipo instantânea, exceto as descritas no CEST 17047.01.','19023000'),(1,NULL,2,'1704904','6101','Massas alimentícias do tipo sêmola, não cozidas, nem recheadas, nem preparadas de outro modo, que não contenham ovos, derivadas de farinha de trigo, exceto as descritas no CEST 17.049.09','19021900');

INSERT INTO `aliquotas_interestaduais` 
VALUES (12.00,1,9,NULL,1,1),(12.00,1,1,NULL,2,9),(19.00,1,1,NULL,3,1),(17.00,1,9,NULL,4,9);

INSERT INTO `multiplicadores_produtos` 
VALUES (17.00,NULL,12.65,NULL,45.00,1,2,NULL,1,1),(17.00,NULL,12.65,NULL,45.00,1,2,NULL,2,2);

INSERT INTO `relatorios` 
VALUES (4204.44,33236.70,2,1,'src/main/resources/relatorios/icms/Ponto Verde Sustentabilidade S/A/2024-09-27T08-40-02.pdf'),(1401.48,11078.90,2,2,'src/main/resources/relatorios/icms/Ponto Verde Sustentabilidade S/A/2024-09-27T08-41-14.pdf');