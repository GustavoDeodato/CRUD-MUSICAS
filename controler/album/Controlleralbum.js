/*********************************************
 * Objetivo: Controller referente as ações de CRUD de banda  
 * Data: 01/04/2025
 * Autor: Gustavo Deodato
 * Versão 1.0
 * ********************************************** */

const message = require('../../modulo/config.js')

const albumDAO = require('../../model/DAO/album.js')
const ControllerProdutora = require('../produtora/Controllerprodutora.js')

//função para inserir uma album
const inserirAlbum = async function (album, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json'){
            if(album.nome == ''|| album.nome == null||album.nome == undefined|| album.nome.Length > 100 ||
                album.id_produtora == '' || album.id_produtora == undefined || album.id_produtora == null 

            ){
                return message.ERROR_REQUIRED_FIELDS
            }else{
                //encaminhar dados da album para o db 
                let resultAlbum = await albumDAO.insertAlbum(album)

                if(resultAlbum)
                    return message.SUCESS_CREATED_ITEM//201
                else 
                    return message.ERROR_INTERNAL_SERVER_MODEL///500
            }}else{
                        return message.ERROR_CONTENT_TYPE          
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER//500
    }
}

//função para atualizar uma album 
const atualizarAlbum = async function  (id, album, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json'){
            if(album.nome == '' || album.nome == null || album.nome == undefined || album.nome.length > 100 || 
                album.id_produtora == '' || album.id_produtora == undefined || 
                id == '' || id == null || id == undefined || isNaN(id)
                 
            ){
                return message.ERROR_REQUIRED_FIELDS
            }else{
                //verificação existancia ID no BD
                    let result = await albumDAO.selectByIdAlbum(id)

                    if(result != false || typeof(result) == 'object'){
                        if(result.length > 0 ){
                            //Update 

                            //adciona o atributi do id no json com os dados recebidos no corpo da requisição 
                            album.id = id 
                                let resultAlbum = await albumDAO.updateAlbum(album)
                                if(resultAlbum){
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

//função para deletar uma albuns
const excluirAlbum = async function (id){

    try {
          if(id == '' || id == null || id == undefined || isNaN(id)){
                    return message.ERROR_REQUIRED_FIELDS//400
          }else{
             
            let resultAlbum = await albumDAO.selectByIdAlbum(id)

            if(resultAlbum != false || typeof(resultAlbum) == 'object'){
                if(resultAlbum.length > 0){
                    //delete

                    result = await albumDAO.deleteAlbum(id)

                    if(result)
                        return message.SUCESS_DELETE_ITEM//200
                    else 
                    return message.ERROR_INTERNAL_SERVER_MODEL//500
                }else{
                    return message.ERROR_NOT_FOUND//404
                }

            }else{
                return message.ERROR_INTERNAL_SERVER_CONTROLLER//500
            }
          }



    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER//500
    }

}

// função para mostrar todas as albuns
const listarAlbum = async function (){

    try {
        let dadosAlbum = {}

        let arrayAlbuns = []

        let resultAlbum = await albumDAO.selectAllAlbum()

         if(resultAlbum != false || typeof(resultAlbum) == 'object' ){
                    if(resultAlbum.length > 0){
                        //cria um json para colocar o array de album
                        dadosAlbum.status = true
                        dadosAlbum.status_code = 200,
                        dadosAlbum.items = resultAlbum.length
                        dadosAlbum.albuns = resultAlbum

                        //Percorrer o array de musicas para pegar cada ID de bandas
                                        // e descobrir quais os dados da banda
                                        
                                     
                                        //Precisamos utilizar o for of, pois o foreach não consegue trabalhar com 
                                        // requisições async com await
                                        for(const itemAlbum of resultAlbum){
                                         //Busca os dados da classificação na controller de classificacao
                                            let dadosProdutora = await ControllerProdutora.buscarProdutora(itemAlbum.id_produtora)
                        
                                            //Adiciona um atributo classificação no JSON de filmes e coloca os dados da classificação
                                            itemAlbum.produtora = dadosProdutora.produtora
                        
                                             //Remover um atributo do JSON
                                            delete itemAlbum.id_produtora
                        
                                            //Adiciona em um novo array o JSON de filmes com a sua nova estrutura de dados
                                            arrayAlbuns.push(itemAlbum)
                                        }
                        
                                    dadosAlbum.albuns = resultAlbum
                        return dadosAlbum
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
//função para buscar uma banda pelo ID 
const buscarAlbum = async function (id){
    try {

         if(id == '' || id == undefined || id == null || isNaN(id)){
                   return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    let dadosAlbum = {}

                    resultAlbum = await albumDAO.selectByIdAlbum(id)

                        if(resultAlbum != false || typeof(resultAlbum) == 'object'){
                            if(resultAlbum.length > 0 ){
                            //criacao do json para o array das bandas 
                            dadosAlbum.status = true,
                            dadosAlbum.status_code = 200, 
                            dadosAlbum.bandas = resultAlbum
                            return dadosAlbum
                            }else{
                               return message.ERROR_NOT_FOUND//404
                            }                           
                        }else{
                            return message.ERROR_INTERNAL_SERVER_MODEL//500
                        }


                }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER//500
}
}


module.exports = {
   inserirAlbum,
   atualizarAlbum,
   listarAlbum,
   buscarAlbum,
   excluirAlbum
}