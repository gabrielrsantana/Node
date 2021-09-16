//gabriel rocha 10/09/2021 Projeto biblioteca
// usando modelo MVC MVC = model view controller 10/09/2021
//No sistema de biblioteca crie um login, onde só poderá excluir livros se o usuário logado for o da secretária.
// considere 2 tipos de permissão: 
// -adm;
// -usuário comum;

var express = require("express");
const app = express();
var mongoose = require("mongoose");
const biblioteca_router = require("./routers/livros-router");
const port = 3000;

//cloud data bank connection
mongoose.connect("mongodb+srv://gabriel_rocha:gabriel_rocha@cluster0.uucs8.mongodb.net/biblioteca?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

//setting engine for views
app.set("view engine", "ejs");
app.set("views", __dirname, "/views");//dirName  direto da raiz

//setting urlencoded to pass information to other pages
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//listar livros
//tem q colocar /livros antes de algum href,como no cadastrar
app.use("/livros",biblioteca_router);
app.use(express.static("public")); //usar arquivos como css,js..nessa pasta

app.get("/", function(req,res){
    //colocar index aqui com os links pra outras paginas
    // res.send("pagina principal MVC Biblioteca (em construção)    /livros    para listar");
    res.render("./views/pages/index")
});



app.listen(port, () => {
    console.log("escutando na porta " + port);
});