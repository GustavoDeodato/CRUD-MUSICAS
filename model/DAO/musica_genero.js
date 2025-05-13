/*********************************************
 * Objetivo: criar o CRUD de dados da tabela genero no banco de dados 
 * Data: 29/04/2025
 * Autor: Gustavo Deodato
 * Versão 1.0
 * ********************************************** */

//funções ainda não corrigidas 


//import biblioteca prisma client para realizar as ações do db
const {PrismaClient} = require('@prisma/client')

//Instancia da classe do prisma client (cria um objeto)
const prisma = new PrismaClient

const inserirMusicaGenero = async function (musicagenero) {
    try {
        let sql = `insert into musica_genero (nome,
        id_musica,
        id_genero)
                    
        
        values(
        '${musicagenero.nome}',
        '${musicagenero.id_musica}',
        '${musicagenero.id_genero}'
        )`

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

//Função para atualizar uma genero existente 
const updateMusicaGenero = async function (){
    try {
        let sql = `update musica_genero set nome = '${musicagenero.nome}',
                        id_musica = '${musicagenero.id_musica}',
                        id_genero = '${musicagenero.id_genero}'
        where id = '${musicagenero.id}'`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true 
        else 
            return false 
        
    } catch (error) {
        return false 
    }
}


//função para deletar uma genero 
const deleteMusicaGenero = async function (){
    try {
        let sql = `delete from musica_genero where id = ${id}`

        result = await prisma.$executeRawUnsafe(sql)
    } catch (error) {
        
    }

}

//função para mostrar todas as genero 
const selectAllMusicaGenero = async function (){
    try {
        sql = `select * from musica_genero order by id desc`

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
const selectByIdMusicaGenero = async function (id){
    try {
        let sql = `select * from musica_genero where id = ${id}`

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
    inserirMusicaGenero,
    deleteMusicaGenero,
    selectByIdMusicaGenero,
    selectAllMusicaGenero,
    updateMusicaGenero

}