const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).send({
    mensagem: "Retorna Pedidos",
  });
});

router.post("/", (req, res, next) => {
    const pedido = {
        id_produto: req.body.id_produto,
        quantidade: req.body.quantidade,
      };
          

  res.status(201).send({
    mensagem: "Pedido foi criado",
    pedidoCriado: pedido
  });
});

router.get("/:id_pedido", (req, res, next) => {
    const id_pedido = req.params.id_pedido
        res.status(200)
        .send({
            mensagem: 'Detalhes do Pedido',
            id_pedido:id_pedido
        })
});

router.delete('/', (req, res, next)=>{
    res.status(201)
        .send({
            mensagem: 'Pedido Excluido'
        })
});


module.exports = router;
