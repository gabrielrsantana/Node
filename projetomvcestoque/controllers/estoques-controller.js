//importando o modelo do banco
// const livro_bd = require("../models/livros-model");
// const usuario_bd = require("../models/usuarios-model");
var isAdm = true;  //para controle do delete,tem que ser visto globalmente
//####exporta aqui pra conecctar o mysql
// var con = require("../conection");

//usando arquivo para coneção com mysql: Error: Cannot enqueue Handshake after already enqueuing a Handshake.
// foi usado usuario: user e senha: user,para nao usar root.
// tem que dar privilegios para o user antes
exports.listar_produtos = (req, res) => {
    var mysql = require("mysql");
    var con = mysql.createConnection({
        host: "localhost",
        user: "user",
        password: "user",
        database: "supermercado",

    });
    con.connect(function (err) {
        var resultado = 0; //para pegar fora do con.query o valor
        if (err) throw err;
        console.log("erro ao listar produtos....");

        // var sql = "select * from alunos where nome_aluno='"+nome +"'";
        var sql = "select * from produtos";
        con.query(sql, function (err, result) {
            resultado = result;
            //usar resultado[0].nome_aluno
            console.log("resultado do banco produtos-controller: ", resultado);
            //res.render("views/pages/livros", { resultado: livro, isAdm });  CODIGO COM O MONGODB
            res.render("views/pages/produtos", { resultado, isAdm });
            if (err) throw err;
            console.log("string sql: " + sql);
        });//con.query
    });//con

};
//############realizar venda,lista os campos no formulario pro funcionario 
exports.preparar_venda_get = (req, res) => {
    var mysql = require("mysql");
    var clientes_array="";
    var con = mysql.createConnection({
        host: "localhost",
        user: "user",
        password: "user",
        database: "supermercado",
    });
    con.connect(function (err) {
        var resultado = 0;
        //############ inicio pegar clientes
        var sql_clientes="select * from clientes;";
        con.query(sql_clientes, function (err, result) {
            console.log(" sql= " + sql_clientes);
            clientes_array = result;
            console.log("clientes array= ",clientes_array);
            if (err) throw err;
        });
        //#################fim pegar clientes
        if (err) throw err;
        //################# inicio pegar produtos 
        var sql = "select produtos.id,produtos.nome from produtos;";
        con.query(sql, function (err, result) {
            console.log(" sql= " + sql);
            resultado = result;
            //usar resultado[0].nome_aluno
            console.log("resultado  produtos-controller= ", resultado);
            //res.render("views/pages/livros", { resultado: livro, isAdm });  CODIGO COM O MONGODB
            // res.render("views/pages/vendas", { resultado });
            if (err) throw err;

            res.render("views/pages/vendas", { resultado,clientes_array });
        });//con.query produtos
       

    });//con.connect
    
}//exports

//### cadastrar venda,atualizando a quantidade do produto
exports.cadastrar_vendas_post = (req, res) => {
    console.log("entrou em ..exports.cadastrar_vendas.POST")
    let produto_id = req.body.produto_id; //nome = campo do modelo que vem no body
    let produto_qtd = req.body.quantidade;
    let cliente_id = req.body.cliente_id;
    var mysql = require("mysql");
    var con = mysql.createConnection({
        host: "localhost",
        user: "user",
        password: "user",
        database: "supermercado",

    });
    con.connect(function (err) {
        var resultado = 0; //para pegar fora do con.query o valor
        var qtd_produto = 0;
        if (err) throw err;
        var sql = `insert into vendas(produto_id,total,cliente_id) values('${produto_id}',${produto_qtd},${cliente_id});`;
        con.query(sql, function (err, result) {
            resultado = result;
            console.log("resultado do banco cadastrar_vendas_post: ", resultado);
            //fazer listar vendas aqui
            // res.redirect("/vendidos");
            if (err) throw err;
            
        });//con.query insertir 
        
        //#### aqui atualiza no banco a quantidade de produtos
        //não esta tratando se tem estoqueantes da venda,mas diminui o estoque
        var sql = `UPDATE produtos SET produtos.quantidade = produtos.quantidade -${produto_qtd} where produtos.id=${produto_id};`;
        con.query(sql, function (err, result) {
            resultado_update = result;
            console.log("cadastrar_vendas_post e atualizando: ", resultado_update);
            //fazer listar vendas aqui
            res.redirect("/estoques");
            if (err) throw err;
            
        });//con.query update
    });//con.connect

}//cadastrar  vendas
//#### deletar venda realizada
exports.deletar_venda = (req, res) => {
    var id = req.params.id;
    var mysql = require("mysql");
    var con = mysql.createConnection({
        host: "localhost",
        user: "user",
        password: "user",
        database: "supermercado",
    });
    con.connect(function (err) {
        var resultado = 0; 
        if (err) throw err;
        //só deleta aqui porque nao foi setado foreign key na tabela
        var sql = "delete from vendas where vendas.id ="+id+";";
        console.log("string sql ="+sql);
        con.query(sql, function (err, result) {
            resultado = result;
            //res.redirect("/vendidos");
            if (err) throw err;
            console.log("deletado venda com ID ="+id)
            
            
        });//con.query
        //######## pra mostras a pagina /vendidos,porque redirect nao funcionava
        var sql = "select vendas.id,produtos.nome,vendas.total,clientes.nome as cliente,clientes.cpf from vendas join produtos join clientes on vendas.produto_id = produtos.id  AND vendas.cliente_id = clientes.id;";
        con.query(sql, function (err, result) {
            resultado = result;
            console.log("resultado do listar_vendas realizadas : ", resultado);
            res.render("views/pages/vendidos", { resultado,isAdm});
            if (err) throw err;
            
        });//con.query

    });//con.connect
  
}//deleta

//### listar fornecedores
exports.listar_fornecedores_get = (req, res) => {
    var mysql = require("mysql");
    var con = mysql.createConnection({
        host: "localhost",
        user: "user",
        password: "user",
        database: "supermercado",

    });
    con.connect(function (err) {
        var resultado = 0; //para pegar fora do con.query o valor
        if (err) throw err;
        var sql = "select * from fornecedores;";
        con.query(sql, function (err, result) {
            resultado = result;
            console.log("resultado do banco produtos-controller: ", resultado);
            res.render("views/pages/fornecedores", { resultado,isAdm});
            if (err) throw err;
            
        });//con.query
    });//con.connect
 
}//exports.listar

//#########listar vendas feitas
exports.listar_vendas_get = (req, res) => {
    var mysql = require("mysql");
    var con = mysql.createConnection({
        host: "localhost",
        user: "user",
        password: "user",
        database: "supermercado",

    });
    con.connect(function (err) {
        var resultado = 0; //para pegar fora do con.query o valor
        if (err) throw err;
        var sql = "select vendas.id,produtos.nome,vendas.total,clientes.nome as cliente,clientes.cpf from vendas join produtos join clientes on vendas.produto_id = produtos.id  AND vendas.cliente_id = clientes.id;";
        con.query(sql, function (err, result) {
            resultado = result;
            console.log("resultado do listar_vendas realizadas : ", resultado);
            res.render("views/pages/vendidos", { resultado,isAdm});
            if (err) throw err;
            
        });//con.query
    });//con.connect
 
}

//########### deletar produto
exports.deletar_produto = (req, res) => {
    var id = req.params.id;
    var mysql = require("mysql");
    var con = mysql.createConnection({
        host: "localhost",
        user: "user",
        password: "user",
        database: "supermercado",

    });
    con.connect(function (err) {
        var resultado = 0; 
        if (err) throw err;
        var sql = "delete from produtos where produtos.id ="+id+";";
        console.log("string sql ="+sql);
        con.query(sql, function (err, result) {
            resultado = result;
            console.log("resultado do deletar_produto : ", resultado);
            console.log("redirecionando para lista de produtos..: ");
            //lista os produtos
            res.redirect("/estoques");
            if (err) throw err;
            console.log("deletado produto com ID ="+id)
            
        });//con.query
    });//con.connect
 
}

//### cadastrar produto GET
exports.cadastrar_produto_get = (req, res) => {
    var mysql = require("mysql");
    var con = mysql.createConnection({
        host: "localhost",
        user: "user",
        password: "user",
        database: "supermercado",

    });
    con.connect(function (err) {
        var resultado = 0; 
        if (err) throw err;
        var sql = "select * from fornecedores";
        con.query(sql, function (err, result) {
            resultado = result;
            //usar resultado[0].elemento
            console.log("resultado cadastrar_produto_get: ", resultado);
            res.render("views/pages/formproduto", { resultado, isAdm });
            if (err) throw err;
            console.log("string sql: " + sql);
        });//con.query
    });//con
    
}//cadastrar produto 
//### cadastrar produto POST
exports.cadastrar_produto_post = (req, res) => {
    let pd_nome = req.body.nome; 
    let pd_quantidade = req.body.quantidade; 
    let pd_preco = req.body.preco;
    let pd_fornecedor_id = req.body.fornecedor_id;
   console.log("cadastra produto :");
   console.log("Nome :" +pd_nome);
   console.log("Nome :" +pd_quantidade);
   var mysql = require("mysql");
    var con = mysql.createConnection({
        host: "localhost",
        user: "user",
        password: "user",
        database: "supermercado",

    });
    con.connect(function (err) {
        var resultado = 0; 
        if (err) throw err;
        var sql = `insert into produtos(nome,quantidade,preco,fornecedor_id) values('${pd_nome}',${pd_quantidade},${pd_preco},${pd_fornecedor_id});`;
        con.query(sql, function (err, result) {
            resultado = result;
            //usar resultado[0].elemento
            console.log("resultado cadastrar_produto_post: ", resultado);
            //redireciona para os produtos no estoque
            if (err) throw err;
            res.redirect("/estoques"); 
            console.log("string sql: " + sql);
        });//con.query
    });//con
    
}//cadastrar produto


//##################  nao usar  a partir daqui ##############################

// exports.editar_livro_get = (req, res) => {
//     var id = req.params.id;
//     livro_bd.findById(id, (err, professor) => {
//         if (err)
//             return res.status(500).send("erro ao editar professor");
//         //edita e rende o form de novo com os valores
//         res.render("views/pages/formEditarlivro", { resultado: professor });
//     });
// }//edit

// exports.editar_livro_post = (req, res) => {
//     var id = req.body.id;
//     livro_bd.findById(id, (err, livro) => {
//         if (err) return res.status(500).send("Erro ao editar");
//         livro.nome = req.body.nome;
//         livro.autor = req.body.autor;
//         livro.codigoBarras = req.body.codigoBarras;

//         livro.save((err) => {
//             if (err) return res.status(500).send("Erro ao cadastrar");
//             return res.redirect("/livros");
//         });
//     });
// };

