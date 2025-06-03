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

const insertInstrumento = async function (instrumento) {
    try {
        let sql = `insert into tbl_instrumento (nome)

        
        values('${instrumento.nome}')`

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

//Função para atualizar uma instrumento existente 
const updateInstrumento = async function (instrumento){
    try {
        let sql = `update tbl_instrumento set nome = '${instrumento.nome}'
                                   
        where id = '${instrumento.id}'`

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
const deleteInstrumento = async function (id){
    try {
        let sql = `delete from tbl_instrumento where id = ${id}`

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
const selectAllInstrumento = async function (){
    try {
        sql = `select * from tbl_instrumento order by id desc`

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
const selectByIdInstrumento = async function (id){
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

    insertInstrumento,
    updateInstrumento,
    selectAllInstrumento,
    selectByIdInstrumento,
    deleteInstrumento
}