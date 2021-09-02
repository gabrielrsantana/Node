// importa modulo da node_modules para dentro da variavel
var http = require("http");

http.createServer(function(req,res){ //Returns a new instance of Server. req= requisicao  res= resposta
res.writeHead(200,{'Content-Type': 'text/plain'});

// nao usar acento
res.end("ola mundo");

}).listen(8000); //escuta na porta 8000
console.log('Servidor iniciado..\n Rodando na porta: 8000');


//no cmd digitar: helloworld.js
