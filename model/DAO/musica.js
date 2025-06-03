/*********************************************
 * Objetivo: criar o CRUD de dados da tabela musica no banco de dados 
 * Data: 11/02/2025
 * Autor: Gustavo Deodato
 * Versão 1.0
 * ********************************************** */

//import biblioteca prisma client para realizar as ações do db
const {PrismaClient} = require('@prisma/client')

//Instancia da classe do prisma client (cria um objeto)
const prisma = new PrismaClient

  

//função para inserir novas musicas 
const insertMusica = async function(musica){

    try {
    let sql = `insert into tbl_musica (nome,
        duracao, 
        data_lancamento, 
        letra, 
        link,
        id_banda
        )
    values (
            '${musica.nome}',
            '${musica.duracao}',
            '${musica.data_lancamento}',
            '${musica.letra}',
            '${musica.link}',
            '${musica.id_banda}'

    
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

//função para atualizar uma musica existente 
const updateMusica = async function (musica){
    try {
        let sql = `update tbl_musica set nome = '${musica.nome}',
                                        duracao = '${musica.duracao}',
                                        data_lancamento = '${musica.data_lancamento}',
                                        letra = '${musica.letra}',
                                        link = '${musica.link}'
                                         where id = ${musica.id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true 
        else 
            return false 
    } catch (error) {
        return false 
    }

}

//função para deletar musicas 
const deleteMusica = async function (id) {
    try {
        let sql = `delete from tbl_musica where id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return result
        else 
        return false 
    } catch (error) {
        return false
    }
    
}
//mostrar todas as musicas do db
const selectALLmusica = async function () {
    try {
        let sql = 'select * from tbl_musica order by id desc'

    //scripts que devolvem valor usa-se query no unsafe 
    //encaminha o script sql para o BD 
    let result = await prisma.$queryRawUnsafe(sql)

    if(result)
        return result
    else
        return false

    } catch (error) {
        return false 
    }
    
}

//buscar pelo id 
const selectByidmusica = async function(id){

    try {       
        let sql = `select * from tbl_musica where id = ${id}`

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
    insertMusica,
    updateMusica,
    deleteMusica,
    selectALLmusica,
    selectByidmusica
}