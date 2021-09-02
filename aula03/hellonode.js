var express = require("express");  //chamando modulo express para aplicacao
const app = express();
var router = require("./router"); //importa modulo do router.js
const PORT = 3000;

app.use("/",router); //usa o caminho que esta no arquivo router ( rotas)


/*
app.get("/",(req,res)=>{ //pega a rota,caminho
// res.send("<h1 style='color:blue'>pagina principal</h1>");
res.send("pagina principal");
}); 
*/


//dando permissao a usar arquivos estados
//como na pasta public,onde tem style.css
//Você pode usar o middleware express.static para servir arquivos estáticos, incluindo suas imagens, CSS e JavaScript (static() é a única função de middleware que é realmente parte do Express). Por exemplo, você usaria a linha abaixo para exibir imagens, arquivos CSS e arquivos JavaScript de um diretório chamado 'public' no mesmo nível onde você chama o nó:
/*   app.use(express.static('public'));  */

app.listen(PORT,()=>{
    console.log("servidor rodando na porta 3000!");
    });


    //criando middleware,pode-se se usar middleware de terceiros
    // var my_middleware = function(req,res,next){
    //     console.log("criei uma middleware");
    //     next(); //passe para proxima funcao
    // };