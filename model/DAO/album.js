/*********************************************
 * Objetivo: criar o CRUD de dados da tabela genero no banco de dados 
 * Data: 29/04/2025
 * Autor: Gustavo Deodato
 * Versão 1.0
 * ********************************************** */

//import biblioteca prisma client para realizar as ações do db
const {PrismaClient} = require('@prisma/client')

//Instancia da classe do prisma client (cria um objeto)
const prisma = new PrismaClient

const insertAlbum = async function (album) {
    try {
        let sql = `insert into tbl_album (nome, id_produtora)

        
        values('${album.nome}',
        '${album.id_produtora}')`

    //Executa o script sql no banco de dados e aguarda o resultado (retornando true ou false)
    let result = await prisma.$executeRawUnsafe(sql)


    if(result)
        return true 
    else 
    return false 

    } catch (error) {
        console.log(error)
        return false 
    }
}

//Função para atualizar uma album existente 
const updateAlbum = async function (album){
    try {
        let sql = `update tbl_album set nome = '${album.nome}',
                                        id_produtora = '${album.id_produtora}'
        where id = '${album.id}'`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true 
        else 
            return false 
        
    } catch (error) {
        return false 
    }
}


//função para deletar uma album 
const deleteAlbum = async function (id){
    try {
        let sql = `delete from tbl_album where id = ${id}`

        result = await prisma.$executeRawUnsafe(sql)
  
        if(result)
            return result
        else 
        return false 
    } catch (error) {
        return false
    }

}

//função para mostrar todas as album
const selectAllAlbum = async function (){
    try {
        sql = `select * from tbl_album order by id desc`

        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else
            return false
    } catch (error) {
        return false 
    }
}

//função para busca pelo ID 
const selectByIdAlbum = async function (id){
    try {
        let sql = `select * from tbl_album where id = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else 
          return false

    } catch (error) {
        return false 
    }
    }

module.exports = {

    insertAlbum,
    updateAlbum,
    selectAllAlbum,
    selectByIdAlbum,
    deleteAlbum
}