//testa conecao
//despois de instalado o mongoose, importa pro projeto
var mongoose = require("mongoose");

//password gabriel_rocha    banco de dados = vendas
//string de conexao com mongo db,criado no site usando azure.
mongoose.connect("mongodb+srv://gabriel_rocha:gabriel_rocha@cluster0.uucs8.mongodb.net/vendas?retryWrites=true&w=majority").then(()=>{
console.log("banco conectado!")
}).catch((err)=>{
    console.log("nao conectado!"+ err);
});