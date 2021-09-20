//rotas
const  express = require("express");
const router = express.Router();

//busca uma rota listar livros
//como se fosse sumario das rotas
const estoqueController = require("../controllers/estoques-controller")
//estoques/ lista os produtos
router.get("/",estoqueController.listar_produtos);

//###############implementar vendas 18/09/21 21h
 router.get("/vendas",estoqueController.preparar_venda_get);//lista produtos e clientes
 router.post("/vendas",estoqueController.cadastrar_vendas_post);
 //lista vendas feitas
 router.get("/vendidos",estoqueController.listar_vendas_get);
//lista fornecedores
 router.get("/fornecedores",estoqueController.listar_fornecedores_get);

//deletar vendas
//aqui nao deleta por causa ?privilegio?porque tem foreign key
router.get("/deletarVenda/:id",estoqueController.deletar_venda);

//deletar produto
router.get("/deletarProduto/:id",estoqueController.deletar_produto);

//## cadastrar produto
router.get("/cadastrarProduto",estoqueController.cadastrar_produto_get);
router.post("/cadastrarProduto",estoqueController.cadastrar_produto_post);

//############### nao usar depois a partir daqui o q nao pode#####################
//cadastrar GET 
// router.get("/cadastrarLivros",estoqueController.cadastrar_livros_get);
// router.post("/cadastrarLivros",estoqueController.cadastrar_livros_post);

//deletar,exporta a implementacao  do controler
// router.get("/deletarLivro/:id",estoqueController.deletar_livro);


// router.get("/editarLivro/:id",estoqueController.editar_livro_get);
// router.post("/editarLivro",estoqueController.editar_livro_post);

// router.get("/cadastrarUsuario",estoqueController.cadastrar_usuario_get);
// router.post("/cadastrarUsuario",estoqueController.cadastrar_usuario_post);

//login usuario
// router.get("/loginUsuario",estoqueController.login_usuario_get);
// router.post("/loginUsuario",estoqueController.login_usuario_post );//falta implementar


//para poder usar em outra pagina tem que ter export
//colocar no final da pagina,senao nao consegue exportar
module.exports = router;