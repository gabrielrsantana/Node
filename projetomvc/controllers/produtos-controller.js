//importando o modelo do banco
// padrao produtos-xxxxxxx  , ex produtos-model
const produto_bd = require("../models/produtos-model");

//definindo a funcionalidade da rota listar_produtos
exports.listar_produtos = (req, res) => {
    //pode puxar produtos porque exportou no produtos-model.js
    
    produto_bd.find({},(err, produto)=>{
        
        if (err)
            return res.status(500).send("erro ao consulta produto");
        // console.log("elemento.lenght="+elemento.length);
        //nao precisa entrar em views/pages/produtos
        res.render("views/pages/produtos", { resultado:produto});//2 elemento é o array de objetos,como nome,valor e codbarra ,como no banco de dados;     

    });


};

