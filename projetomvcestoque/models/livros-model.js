var mongoose = require("mongoose");
//cria um modelo do banco de dados biblioteca
const Livros = mongoose.model("livros",{
    nome:String,
    autor:String,
    codigoBarras: String
});



//exportando o modelo livros
module.exports = Livros;