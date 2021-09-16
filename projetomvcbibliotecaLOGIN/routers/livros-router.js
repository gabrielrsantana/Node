//rotas
const  express = require("express");
const router = express.Router();

//busca uma rota listar livros
//como se fosse sumario das rotas
const livroController = require("../controllers/livros-controller")

router.get("/",livroController.listar_livros);

//#######definindo as rotas 
//cadastrar GET 
router.get("/cadastrarLivros",livroController.cadastrar_livros_get);
//cadastrar POST
router.post("/cadastrarLivros",livroController.cadastrar_livros_post);

//deletar,exporta a implementacao  do controler
router.get("/deletarLivro/:id",livroController.deletar_livro);

//editar
router.get("/editarLivro/:id",livroController.editar_livro_get);
router.post("/editarLivro",livroController.editar_livro_post);

//cadastrar usuario
router.get("/cadastrarUsuario",livroController.cadastrar_usuario_get);
router.post("/cadastrarUsuario",livroController.cadastrar_usuario_post);

//login usuario
router.get("/loginUsuario",livroController.login_usuario_get);
router.post("/loginUsuario",livroController.login_usuario_post );//falta implementar


//para poder usar em outra pagina tem que ter export
//colocar no final da pagina,senao nao consegue exportar
module.exports = router;