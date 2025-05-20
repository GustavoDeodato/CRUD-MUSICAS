/*********************************************
 * Objetivo: criar o CRUD de dados da tabela banda no banco de dados 
 * Data: 01/04/2025
 * Autor: Gustavo Deodato
 * Versão 1.0
 * ********************************************** */

//import biblioteca prisma client para realizar as ações do db
const {PrismaClient} = require('@prisma/client')

//Instancia da classe do prisma client (cria um objeto)
const prisma = new PrismaClient

//Função para inserir novas Produtora
const insertProdutora = async function (Produtora){
    try {
        let sql = `insert into tbl_produtora (nome)
        
        values('${Produtora.nome}')`

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

//Função para atualizar uma produtora existente 
const updateProdutora = async function (Produtora){
    try {
        let sql = `update tbl_produtora set nome = '${Produtora.nome}'
        where id = '${Produtora.id}'`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true 
        else 
            return false 
        
    } catch (error) {
        return false 
    }
}


//função para deletar uma Produtora 
const excluirProdutora = async function (id){
    try {
        let sql = `delete from tbl_produtora where id = ${id}`

        result = await prisma.$executeRawUnsafe(sql)
        
        if(result)
            return result
        else 
        return false 
    } catch (error) {
        return false 
    }

}

//função para mostrar todas as Produtora 
const selectAllProdutora = async function (){
    try {
        sql = `select * from tbl_produtora order by id desc`

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
const selectByIdProdutora = async function (id){
    try {
        let sql = `select * from tbl_produtora where id = ${id}`

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
   insertProdutora,
   updateProdutora,
   selectAllProdutora,
   selectByIdProdutora,
   excluirProdutora
}