//arquivo de rotas,agrupar os manipuladores de rota
var express = require("express");
const router = express.Router(); //chama router do express,criando o objeto

router.get("/",(req,res)=>{
res.send("home");//rota UNICA para pagina principal
});

router.get("/cadastro",(req,res)=>{
res.send("Pagina de cadastro");  //rota para cadastro
});

 //permite que outros arquivos acessem as minhas rotas
 //exporta tudo de uma vez
module.exports = router;