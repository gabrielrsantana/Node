//importando o modelo do banco
const livro_bd = require("../models/livros-model");
const usuario_bd = require("../models/usuarios-model");
var isAdm = false;  //para controle do delete,tem que ser visto globalmente

exports.listar_livros = (req, res) => {
    livro_bd.find({}, (err, livro) => {
        if (err)
            return res.status(500).send("erro ao consulta livros");
        res.render("views/pages/livros", { resultado: livro, isAdm });//2 elemento é o array de objetos,como nome,valor e codbarra ,como no banco de dados;     

    });
};//listar_lisvros

//implementar pagina inicial
// exports.pagina_principal = (req,res)=>{
//     res.render("..views/pages/home");
// }

//rota de cadastrar
exports.cadastrar_livros_get = (req, res) => {
    res.render("views/pages/formlivros");
}
exports.cadastrar_livros_post = (req, res) => {
    console.log("entrou em ..exports.cadastrar_usuario.POST")
    let salva_usuario = new usuario_bd();
    salva_usuario.email = req.body.nome; //email = campo do modele que vem no body
    salva_usuario.senha = req.body.email;
    salva_usuario.save(err => {
        if (err) {
            return res.status(500).send("erro ao cadastrar");
        }
        //######## implementar listar usuarios
        // return res.redirect("/livros");
    });
}//cadastrar    

exports.deletar_livro = (req, res) => {
    //deletando livro,precisa do Id vindo do link do form
    var id = req.params.id;
    livro_bd.deleteOne({ _id: id }, (err) => {
        if (err) {
            return res.status(500).send("Erro ao deletar");
        }
        res.redirect("/livros");
    });
}//deleta

exports.editar_livro_get = (req, res) => {
    var id = req.params.id;
    livro_bd.findById(id, (err, professor) => {
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

//cadastrar usuario GET
exports.cadastrar_usuario_get = (req, res) => {
    res.render("views/pages/formusuario");
}
exports.cadastrar_usuario_post = (req, res) => {
    console.log("entrou em ..exports.cadastrar_livro.POST")
    let salva_usuario = new usuario_bd();
    salva_usuario.email = req.body.email; //nome = campo do model
    salva_usuario.senha = req.body.senha;
    salva_usuario.tipo = req.body.tipo;
    salva_usuario.save(err => {
        if (err) {
            return res.status(500).send("erro ao cadastrar USUARIO");
        }
        //mostrar usuarios depois
         return res.redirect("/livros");
    });
}//cadastrar usuario

//########### login GET
exports.login_usuario_get = (req, res) => {
    res.render("views/pages/formlogin");
}
//########### login POST
exports.login_usuario_post = (req, res) => {

    //colocar pra buscar campo do formulario
    //usuario@usuario.com   adm
    var email_busca = req.body.email;
    var senha_busca = req.body.senha;
    usuario_bd.find({ email: email_busca }, (err, data) => {

        if (err) {
            console.log(err);
            console.log("Erro ao buscar email de login");
        } else {
            data.forEach(data => {
                if (data.senha != senha_busca) {
                    return res.send("senha nao autenticada");
                }

                if (data.tipo == 'admin') { //é administrador = secreataria
                    // console.log("isadm="+data.tipo);
                    isAdm = true;
                    console.log("email:" + data.email);
                    console.log("senha:" + data.senha);
                    console.log("tipo:" + data.tipo);
                    console.log(" -------------------------------------")

                } else {
                    // console.log("isadm="+data.tipo);
                    isAdm = false;  //usuario  comum,sem privilegio pra deletar
                    console.log("email:" + data.email);
                    console.log("senha:" + data.senha);
                    console.log("tipo:" + data.tipo);
                    console.log(" -------------------------------------")
                    //se tiver 2 redirect ele da erro de headers

                }

            });
        }//else
        res.redirect("/livros");
    });//find

};//fim exports login