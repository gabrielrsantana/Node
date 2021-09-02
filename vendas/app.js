//arquivo app.js principal
//chamando os modulos
var express = require("express");

const app = express();//cria uma app do express
const port = 3000;
var mongoose = require("mongoose");//mongose para modelagem do banco

//conectando no banco mongoDb na nuvem
mongoose.connect("mongodb+srv://gabriel_rocha:gabriel_rocha@cluster0.uucs8.mongodb.net/vendas?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

//criando modelo da collection do banco mongodDB atlas na nuvem criado
const Produtos = mongoose.model("produtos", {
    nome: String,
    vlUnit: Number,
    codigoBarras: String
});

//use como motor de vizualizacao é o ejs,mais simples que da "jade"
//######## tem que estar antes das rotas,padrao
app.set("view engine","ejs");
app.set("views", __dirname ,"/views");
//####################
//rotas, criando principal /
app.get("/", (req, res) => {
    res.send("pagina inicial");
});

//############### rota produtos,lista os produtos do mongoDB
app.get("/produtos",(req,res)=>{
    // /produtos , o caminho rota pra pagina
    //produtos vai ser usado no produtos.ejs, dentro do forEach()
    // o {} significa todos os produtos
    //err = erro do servidor
    let consulta = Produtos.find({},(err,elemento)=>{
        console.log(consulta);//n precisa dessa linha
        if(err)
            return res.status(500).send("erro ao consulta produto");
            //rende a pagina produtos.ejs
            //1 produtos é pro array
            res.render("produtos",{produto_itens:elemento});//2 elemento é o array de objetos,como nome,valor e codbarra ,como no banco de dados;
    });
    
   
});
//################# Rota para cadastro de produtos
//metodo POST para salvar os produtos no banco
app.get("/cadastrarProdutos",(req,res)=>{
    res.render("formprodutos"); //nao precisa colocar extensao .ejs
}); //cadastrarProdutos ,nome igual do form action""
//rota pra listar produtos



//para permitir q os dados passem de uma pagina pra outra
app.use(express.urlencoded({ extended: true }));  //{ extended: true } pra tirar o warning 
app.use(express.json()); //transformado em json pelo fluxo de dados


//criando produtos,pode ter erro de not defined se colocar essa linha antes
app.post("/cadastrarProdutos",(req,res)=>{
    let produto = new Produtos();
    produto.nome = req.body.nome; //name é o campo input do formulario
    produto.vlUnit = req.body.valor;//body nao é do html,e body da requisicao
    produto.codigoBarras = req.body.codBarras; //codBarra é  name do elemento
    produto.save((err) =>{
        if(err)
            return res.status(500).send("erro ao cadastrar"); //msg pro usuario
        return res.redirect("/produtos");    //pag produtos cadastrados,n criado ainda
    });//save()
});//post


app.listen(port, () => { //callback para desenvolvedor(eu) saber se esta ok
    console.log("servidor rodando na porta " + port);
});

