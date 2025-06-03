/*********************************************
 * Objetivo: Controller referente as ações de CRUD de instrumentos
 * Data: 11/05/2025
 * Autor: Gustavo Deodato
 * Versão 1.0
 * ********************************************** */

const message = require('../../modulo/config.js')

const artistaDAO = require('../../model/DAO/artista.js')

//função para inserir uma banda 
const inserirArtista = async function (artista, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json'){
            if(artista.nome == ''|| artista.nome == null||artista.nome == undefined|| artista.nome.Length > 100 

            ){
                return message.ERROR_REQUIRED_FIELDS
            }else{
                //encaminhar dados da banda para o db 
                let resultArtista = await artistaDAO.insertArtista(artista)

                if(resultArtista)
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

//função para atualizar uma banda 
const atualizarArtista = async function  (id, artista, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json'){
            if(artista.nome == '' || artista.nome == null || artista.nome == undefined || artista.nome.length > 100 || 
                id == '' || id == null || id == undefined || isNaN(id)
                 
            ){
                return message.ERROR_REQUIRED_FIELDS
            }else{
                //verificação existancia ID no BD
                    let result = await artistaDAO.selectByIdArtista(id)

                    if(result != false || typeof(result) == 'object'){
                        if(result.length > 0 ){
                            //Update 

                            //adciona o atributi do id no json com os dados recebidos no corpo da requisição 
                            artista.id = id 
                                let resultArtista = await artistaDAO.updateArtista(artista)
                                if(resultArtista){
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

//função para deletar uma bandas 
const excluirArtista = async function (id){

    try {
          if(id == '' || id == null || id == undefined || isNaN(id)){
                    return message.ERROR_REQUIRED_FIELDS//400
          }else{
             
            let resultArtista = await artistaDAO.selectByIdArtista(id)

            if(resultArtista != false || typeof(resultArtista) == 'object'){
                if(resultArtista.length > 0){
                    //delete

                    result = await artistaDAO.deleteArtista(id)

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

// função para mostrar todas as bandas
const listarArtistas = async function (){

    try {
        let dadosArtistas = {}

        let resultArtistas = await artistaDAO.selectAllArtista()

         if(resultArtistas != false || typeof(resultArtistas) == 'object' ){
                    if(resultArtistas.length > 0){
                        //cria um json para colocar o array de bandas
                        dadosArtistas.status = true
                        dadosArtistas.status_code = 200,
                        dadosArtistas.items = resultArtistas.length
                        dadosArtistas.artistas = resultArtistas
                        return dadosArtistas
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
const buscarArtista = async function (id){
    try {

         if(id == '' || id == undefined || id == null || isNaN(id)){
                   return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    let dadosArtista = {}

                    resultArtista = await artistaDAO.selectByIdArtista(id)

                        if(resultArtista != false || typeof(resultArtista) == 'object'){
                            if(resultArtista.length > 0 ){
                            //criacao do json para o array das bandas 
                            dadosArtista.status = true,
                            dadosArtista.status_code = 200, 
                            dadosArtista.instrumentos = resultArtista
                            return dadosArtista
                            }else{
                               return message.ERROR_NOT_FOUND//404
                            }                           
                        }else{
                            return message.ERROR_INTERNAL_SERVER_MODEL//500
                        }


                }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER//50instrumento
}
}


module.exports = {

    inserirArtista,
    atualizarArtista,
    listarArtistas,
    buscarArtista,
    excluirArtista
   
}