//rotas
const  express = require("express");
const router = express.Router();

//busca uma rota listar produtos
//como se fosse sumario das rotas
const produtoController = require("../controllers/produtos-controller")
//chama o listar_produtos do produtos-controller

router.get("/", produtoController.listar_produtos);









//para poderem usar tem que ter export
//colocar no final da pagina,senao nao consegue exportar
module.exports = router;