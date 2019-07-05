-- acho que ta tudo errado tem que ver ai

CREATE [OR REPLACE] FUNCTION produtos_em_promocao()
 RETURNS trigger AS produtos_em_promocao ‘
 DECLARE
 produto Cupom.prod_desconto%TYPE;
 BEGIN
 FOR i IN produto LOOP
 UPDATE produto
 SET promocao = TRUE
 WHERE
 codigo = i;
 END LOOP;
 END;
 ‘ LANGUAGE ‘PLPGSQL’;

 CREATE TRIGGER produtos_em_promocao BEFORE INSERT OR SELECT ON Produto
    EXECUTE PROCEDURE produtos_em_promocao();