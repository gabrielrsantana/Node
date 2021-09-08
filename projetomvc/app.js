//gabriel rocha 08/09/2021
// projeto usando modelo MVC = model view controller
var express = require("express");
const app = express();
var mongoose = require("mongoose");
const produtos_router = require("./routers/produtos-router");
const port = 3000;

//conectando no banco vendas mongoDb na nuvem
mongoose.connect("mongodb+srv://gabriel_rocha:gabriel_rocha@cluster0.uucs8.mongodb.net/vendas?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
//setando engine view
app.set("view engine", "ejs");
app.set("views", __dirname, "/views");
//setando pra poder passar informacoes pra outras paginas
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//listar produtos
app.use("/produtos",produtos_router);

app.get("/", function(req, res){
   
    res.send("pagina principal MVC");
});



app.listen(port, () =>{
    console.log("escutando na porta " + port);
});