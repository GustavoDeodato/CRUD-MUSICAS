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

const insertArtista = async function (artista) {
    try {
        let sql = `insert into tbl_artista (nome)

        
        values('${artista.nome}')`

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

//Função para atualizar uma artista existente 
const updateArtista = async function (artista){
    try {
        let sql = `update tbl_artista set nome = '${artista.nome}'
                                   
        where id = '${artista.id}'`

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
const deleteArtista = async function (id){
    try {
        let sql = `delete from tbl_artista where id = ${id}`

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
const selectAllArtista = async function (){
    try {
        sql = `select * from tbl_artista order by id desc`

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
const selectByIdArtista = async function (id){
    try {
        let sql = `select * from tbl_artista where id = ${id}`

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
    insertArtista,
    updateArtista,
    selectAllArtista,
    selectByIdArtista,
    deleteArtista
}