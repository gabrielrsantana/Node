var mongoose = require("mongoose");
//cria um modelo do banco de dados biblioteca
const Usuarios = mongoose.model("usuarios",{
    email: String,
    senha: String,
    tipo: String
    // usuario = comum
    //adm = administrador
});



//exportando o modelo livros
module.exports = Usuarios;