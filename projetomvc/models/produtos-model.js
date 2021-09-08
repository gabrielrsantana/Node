var mongoose = require("mongoose");
const Produtos = mongoose.model("produtos",{
    nome:String,
    vlUnit:Number,
    codigoBarras: String
});





//exportando o modelo Produtos
module.exports = Produtos;