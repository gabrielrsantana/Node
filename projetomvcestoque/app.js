//gabriel rocha 17/09/2021 Projeto estoque
// usando modelo MVC MVC = model view controller 10/09/2021
//Desenvolva um software aplicando o Node.js e usando um banco MySQL
// que auxilie no controle de estoque de um supermercado.

//  localhost:3000/estoques   para listar os produtos
var express = require("express");
const app = express();
// var mongoose = require("mongoose");//n usa
const biblioteca_router = require("./routers/livros-router");
const port = 3000;

//cloud data bank connection,se for usar mysql desabilita aqui
//mongoose.connect("mongodb+srv://gabriel_rocha:gabriel_rocha@cluster0.uucs8.mongodb.net/biblioteca?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

//setting engine for views
app.set("view engine", "ejs");
app.set("views", __dirname, "/views");//dirName  direto da raiz

//setting urlencoded to pass information to other pages
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//listar livros
//tem q colocar /estoques antes de algum href,como no cadastrar
app.use("/estoques",biblioteca_router); //estoques,1 pagina que abre é '/'
app.use(express.static("public")); //usar arquivos como css,js..nessa pasta

app.get("/", function(req,res){
    //colocar index aqui com os links pra outras paginas
    res.render("./views/pages/index")
});


app.listen(port, () => {
    console.log("\033[34m Systema estoque, escutando na porta " + port);
    console.log("\033[0m -----------------------")
});