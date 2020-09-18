const { response } = require("express");
const express = require("express");
const router = express.Router();
const mysql = require("../mysql").pool;

router.get("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query("SELECT * FROM produtos;", 
    (error, result, fields) => {
      if (error) {
        return res.status(500).send({ error: error });
      }
      const response = {
          quantidade: result.length,
          produtos: result.map(prod =>{
              return {
                  id_produto: prod.id_produto,
                  nome: prod.nome,
                  preco: prod.preco,
                  request: {
                      tipo: 'GET',
                      descricao: '',
                      url:'http://localhost:300/produtos/' + prod.id_produto
                  }
              }
          })
      }

      return res.status(200).send({ response: response });
    });
  });
});

router.post("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      "INSERT INTO produtos (nome, preco) VALUES (?,?)",
      [req.body.nome, req.body.preco],
      (error, result, field) => {
        conn.release();

        if (error) {
          res.status(500).send({
            error: error,
            response: null,
          });
        }

        res.status(201).send({
          mensagem: "Produto criado com Sucesso",
          id_rpoduto: result.insertId,
        });
      }
    );
  });

  res.status(201).send({
    mensagem: "Produto criado",
    produtoCriado: produto,
  });
});

router.get("/:id_produto", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      "SELECT * FROM produtos WHERE id = ?;",
      [req.params.id_produto],
      (error, result, fields) => {
        if (error) {
          return res.status(500).send({ error: error });
        }
        return res.status(200).send({ response: result });
      }
    );
  });
});

router.patch("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      "UPDATE produtos SET nome = ?, preco = ? WHERE id = ?;",
      [req.body.nome, req.body.preco, req.body.id],
      (error, result, field) => {
        conn.release();

        if (error) {
          res.status(500).send({
            error: error,
            response: null,
          });
        }

        res.status(202).send({
          mensagem: "Produto atualizado com Sucesso",
        });
      }
    );
  });
});

router.delete("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      "DELETE FROM produtos WHERE id = ?;",
      [req.body.id_produto],
      (error, result, field) => {
        conn.release();

        if (error) {
          res.status(500).send({
            error: error,
          });
        }

        res.status(202).send({
          mensagem: "Produto removido com Sucesso",
        });
      }
    );
  });
});

module.exports = router;
