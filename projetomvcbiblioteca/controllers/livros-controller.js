//importando o modelo do banco
const livro_bd = require("../models/livros-model");

exports.listar_livros = (req, res) => {
    livro_bd.find({}, (err, livro) => {
        if (err)
            return res.status(500).send("erro ao consulta livros");
        res.render("views/pages/livros",{resultado:livro});//2 elemento é o array de objetos,como nome,valor e codbarra ,como no banco de dados;     

    });
};//listar_lisvros

//#### implementar pagina inicial ######
// exports.pagina_principal = (req,res)=>{
//     res.render("..views/pages/home");
// }

    //rota de cadastrar
 exports.cadastrar_livros_get = (req,res)=>{
        res.render("views/pages/formlivros");
 }
exports.cadastrar_livros_post = (req,res)=>{
        console.log("entrou em ..exports.cadastrar_livro.POST")
        let salva_professor = new livro_bd();
        salva_professor.nome = req.body.nome; //nome = campo do model
        salva_professor.autor = req.body.autor;
        salva_professor.codigoBarras = req.body.codigoBarras;
        salva_professor.save(err => {
            if(err){
                return res.status(500).send("erro ao cadastrar");
            }
            return res.redirect("/livros");
        });
 }//cadastrar    

 exports.deletar_livro = (req,res)=>{
     //deletando livro,precisa do Id vindo do link do form
     var id = req.params.id;
     livro_bd.deleteOne({_id:id},(err)=>{
        if(err){
            return res.status(500).send("Erro ao deletar");
        }
        res.redirect("/livros");
     });
 }//deleta

 exports.editar_livro_get = (req, res) => {
    var id = req.params.id;
    livro_bd.findById(id,(err,professor) => {
        if (err)
            return res.status(500).send("erro ao editar professor");
        //edita e rende o form de novo com os valores
        res.render("views/pages/formEditarlivro", { resultado: professor });
    });
}//edit

exports.editar_livro_post = (req, res) => {
  var id = req.body.id;
  livro_bd.findById(id, (err, livro) => {
    if (err) return res.status(500).send("Erro ao editar");
    livro.nome = req.body.nome;
    livro.autor = req.body.autor;
    livro.codigoBarras = req.body.codigoBarras;

    livro.save((err) => {
      if (err) return res.status(500).send("Erro ao cadastrar");
      return res.redirect("/livros");
    });
  });
};

