/*********************************************
 * Objetivo: criar o CRUD de dados da tabela banda no banco de dados 
 * Data: 01/04/2025
 * Autor: Gustavo Deodato
 * Versão 1.0
 * ********************************************** */

//Instancia da classe do prisma client (cria um objeto)
const prisma = new PrismaClient


//Função para inserir novas bandas
const insertBanda = async function (banda){
    try {
        let sql = `insert into tbl_banda (nome)
        
        Values(${banda.nome})`

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

//Função para atualizar uma banda existente 
const updateBanda = async function (){

}


//função para deletar uma banda 
const deleteBanda = async function (){
    try {
        let sql = ``
    } catch (error) {
        
    }

}

//função para mostrar todas as bandas 
const selectAllBanda = async function (){
    try {
        sql = `select * from tbl_banda order by id desc`

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
const selectByIdBanda = async function (){

}

module.exports = {
    insertBanda,
    updateBanda,
    deleteBanda,
    selectAllBanda,
    selectByIdBanda
}