-- acho que ta tudo errado tem que ver ai

CREATE OR REPLACE FUNCTION produtos_em_promocao()
   RETURNS trigger AS $produtos_em_promocao$
   DECLARE
      prod Cupom%rowtype;
      cond Produto%rowtype;
   BEGIN 
      FOR prod IN SELECT * FROM Cupom LOOP
        FOR cond IN (SELECT * FROM Produto WHERE codigo = prod.prod_desconto) LOOP
            IF cond.promocao != TRUE OR 
               cond.promocao IS NULL THEN
               UPDATE Produto
               SET promocao = TRUE
               WHERE
               codigo = prod.prod_desconto;
            END IF;
         END LOOP;
      END LOOP;
   RETURN NULL;
END;
$produtos_em_promocao$ LANGUAGE PLPGSQL;

CREATE TRIGGER produtos_em_promocao AFTER INSERT OR UPDATE ON Cupom
   EXECUTE PROCEDURE produtos_em_promocao();

