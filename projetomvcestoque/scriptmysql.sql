USE supermercado;


DROP TABLE vendas; 
DROP TABLE produtos;
DROP TABLE clientes;
DROP TABLE fornecedores;

CREATE TABLE IF NOT EXISTS clientes(
id INT NOT NULL AUTO_INCREMENT,
nome VARCHAR(40) NOT NULL,
cpf VARCHAR(40) NOT NULL,
PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS fornecedores(
id INT NOT NULL AUTO_INCREMENT,    
nome VARCHAR(40) NOT NULL,
cnpj varchar(40) NOT NULL,
PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS produtos(
id INT NOT NULL AUTO_INCREMENT,    
nome VARCHAR(40) NOT NULL,
quantidade varchar(40) NOT NULL,
preco FLOAT NOT NULL,
fornecedor_id INT NOT NULL, 
PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS vendas(
id INT NOT NULL AUTO_INCREMENT,
produto_id INT NOT NULL, 
total FLOAT NOT NULL,
cliente_id INT NOT NULL, 
PRIMARY KEY(id)
);

INSERT INTO clientes(nome,cpf) VALUES('joao da silva','7965532155');
INSERT INTO clientes(nome,cpf) VALUES('maria santos ','9523532155');
INSERT INTO clientes(nome,cpf) VALUES('jessica jones ','123532155');
INSERT INTO fornecedores(nome,cnpj) VALUES('FRANGO LTDA','146507970001-90');
INSERT INTO fornecedores(nome,cnpj) VALUES('Canaã Alimentos','146507970001-90');
INSERT INTO fornecedores(nome,cnpj) VALUES('Nova Safra LTDA','103507970001-90');
INSERT INTO produtos(nome,quantidade,preco,fornecedor_id) VALUES('arroz ',30,20.50,1);
INSERT INTO produtos(nome,quantidade,preco,fornecedor_id) VALUES('feijao ',100,10.50,2);
INSERT INTO produtos(nome,quantidade,preco,fornecedor_id) VALUES('farinha ',30,5.20,3);
INSERT INTO produtos(nome,quantidade,preco,fornecedor_id) VALUES('abacate',100,10.20,3);
INSERT INTO VENDAS(produto_id,total,cliente_id) VALUES(1,1,1);
INSERT INTO VENDAS(produto_id,total,cliente_id) VALUES(1,1,2);
INSERT INTO VENDAS(produto_id,total,cliente_id) VALUES(1,1,3);
