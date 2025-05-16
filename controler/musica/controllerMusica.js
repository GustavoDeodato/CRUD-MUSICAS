/*********************************************
 * Objetivo: Controller referente as ações de CRUD de musica 
 * Data: 11/02/2025
 * Autor: Gustavo Deodato
 * Versão 1.0
 * ********************************************** */

//Import do arquivo de mensagens status code 
const message = require('../../modulo/config.js')

//Import do DAO para realizar o CRUD no banco de dados 
const musicaDAO = require('../../model/DAO/musica.js')

//import da controller banda para facilitar o relacionamento 
const controllerBanda = require('../banda/controllerBanda.js')


//função para inserir uma musica 
const inserirMusica = async function (musica, contentType){

    try {

        if(String(contentType).toLowerCase() == 'application/json'){
            if(musica.nome == '' || musica.nome == null || musica.nome == undefined || musica.nome.length > 100 || 
                musica.duracao == ''|| musica.duracao == null ||musica.duracao == undefined || musica.duracao.length > 8 ||
               musica.data_lancamento == '' || musica.data_lancamento == null || musica.data_lancamento == undefined || musica.data_lancamento.length > 10 || 
                musica.letra == undefined ||
                musica.link == undefined || musica.link.length >200||
                musica.id_banda == '' || musica.id_banda == undefined
            ){
                return message.ERROR_REQUIRED_FIELDS
            }else{
                //encaminhando os dados da musica para o DAO realizar o insert no BD 
                let resultMusica = await musicaDAO.insertMusica(musica)
        
                if(resultMusica)
                    return message.SUCESS_CREATED_ITEM//201
        
                else 
                    return message.ERROR_INTERNAL_SERVER_MODEL///500
            }
        
        }else{
            return message.ERROR_CONTENT_TYPE
        }
            
        }catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER//500
    }
   
}

//função para atualizar uma musica 
const atualizarMusica = async function (id, musica, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json'){
            if(musica.nome == '' || musica.nome == null || musica.nome == undefined || musica.nome.length > 100 || 
                musica.duracao == ''|| musica.duracao == null ||musica.duracao == undefined || musica.duracao.length > 8 ||
                musica.data_lancamento == '' || musica.data_lancamento == null || musica.data_lancamento == undefined || musica.data_lancamento.length > 10 || 
                musica.letra == undefined ||
                musica.link == undefined || musica.link.length >200 ||
                id == '' || id == null || id == undefined || isNaN(id)||
                musica.id_banda == '' || musica.id_banda == undefined
                 
            ){
                return message.ERROR_REQUIRED_FIELDS
            }else{
                //verificação existancia ID no BD
                    let result = await musicaDAO.selectByidmusica(id)

                    if(result != false || typeof(result) == 'object'){
                        if(result.length > 0 ){
                            //Update 

                            //adciona o atributi do id no json com os dados recebidos no corpo da requisição 
                            musica.id = id 
                                let resultMusica = await musicaDAO.updateMusica(musica)
                                if(resultMusica){
                                    return message.SUCESS_UPDATE_ITEM
                                }else{
                                    return message.ERROR_INTERNAL_SERVER_MODEL//500
                                }
                        }else{
                            return message.ERROR_NOT_FOUND//404
                        }
                    }
            }
        }else{
            return message.ERROR_CONTENT_TYPE//415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//função para excluir uma musica 
const excluirMusica = async function (id){
    try {
        if(id == '' || id == null || id == undefined || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS//400

        }else{
            //verificando a existencia do id antes de excluir 
            let resultMusica = await musicaDAO.selectByidmusica(id)

            if(resultMusica != false || typeof(resultMusica) == 'object'){
                if(resultMusica.length > 0){
                    //delete
                    let result = await musicaDAO.deleteMusica(id)

                    if(result)
                        return message.SUCESS_DELETE_ITEM//200
                    else 
                    return message.ERROR_INTERNAL_SERVER_MODEL//500
                }else{
                    return message.ERROR_NOT_FOUND//404
                }
            }else{
                message.ERROR_INTERNAL_SERVER_CONTROLLER//500
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER//500
    }
}

//função para retornar uma lista de musicas 
const listarMusica = async function (){

    try {

        let arrayMusicas = []

        let dadosMusica = {}

        //Chama a função para retornar a musica no banco de dados 
        let resultMusica = await musicaDAO.selectALLmusica()

        if(resultMusica != false || typeof(resultMusica) == 'object' ){
            if(resultMusica.length > 0){
                //cria um json para colocar o array de musicas 
                dadosMusica.status = true
                dadosMusica.status_code = 200,
                dadosMusica.items = resultMusica.length

                //Percorrer o array de filmes para pegar cada ID de classificação
                // e descobrir quais os dados da classificação
                
                // resultFilme.forEach( async function(itemFilme){
                //Precisamos utilizar o for of, pois o foreach não consegue trabalhar com 
                // requisições async com await
                for(const itemMusica of resultMusica){
                 //Busca os dados da classificação na controller de classificacao
                    let dadosBanda = await controllerBanda.buscarBanda(itemMusica.id_banda)

                    //Adiciona um atributo classificação no JSON de filmes e coloca os dados da classificação
                    itemMusica.banda = dadosBanda.banda

                     //Remover um atributo do JSON
                    delete itemMusica.id_banda

                    //Adiciona em um novo array o JSON de filmes com a sua nova estrutura de dados
                    arrayMusicas.push(itemMusica)
                }

                dadosMusica.musics = resultMusica
                return dadosMusica
            }else{
                return message.ERROR_NOT_FOUND //404
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_MODEL//500
        }



      
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER//500   
        
    }
   
}

//função para retornar uma musica pelo id 
const buscarMusica = async function (id){
    try {

        if(id == '' || id == undefined || id == null || isNaN(id)){
           return message.ERROR_REQUIRED_FIELDS //400
        }else { 
             let dadosMusica = {}

        //Chama a função para retornar a musica no banco de dados 
        let resultMusica = await musicaDAO.selectByidmusica(id)

        if(resultMusica != false || typeof(resultMusica) == 'object'){
            if(resultMusica.length > 0){
                //cria um json para colocar o array de musicas 
                dadosMusica.status = true
                dadosMusica.status_code = 200,
                dadosMusica.musics = resultMusica
                return dadosMusica
            }else{
                return message.ERROR_NOT_FOUND //404
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_MODEL//500
        }}

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER//500   
        
    }
   
}

module.exports = {
    inserirMusica,
    atualizarMusica,
    excluirMusica,
    listarMusica,
    buscarMusica
}