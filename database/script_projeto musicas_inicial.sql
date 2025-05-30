#Criação db 
create database db_controle_musicas_aa;

#uso da db
use db_controle_musicas_aa;

#criacao tabela 
   create table tbl_musica (
id int not null primary key auto_increment,
nome varchar(100) not null,
duracao time not null,
data_lancamento date not null, 
letra text,
link varchar(200),
id_banda int not null,
constraint FK_BANDA_MUSICA
foreign key (id_banda)
references tbl_banda(id)
);

show tables;

select * from tbl_musicas;

drop table tbl_musicas;

#criacao tabela banda 
create table tbl_banda (
    id int not null primary key auto_increment,
    nome varchar(100) not null
); 