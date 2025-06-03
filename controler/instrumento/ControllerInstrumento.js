/*********************************************
 * Objetivo: Controller referente as ações de CRUD de instrumentos
 * Data: 11/05/2025
 * Autor: Gustavo Deodato
 * Versão 1.0
 * ********************************************** */

const message = require('../../modulo/config.js')

const instrumentoDAO = require('../../model/DAO/instrumento.js')

//função para inserir uma banda 
const inserirInstrumento = async function (instrumento, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json'){
            if(instrumento.nome == ''|| instrumento.nome == null||instrumento.nome == undefined|| instrumento.nome.Length > 100 

            ){
                return message.ERROR_REQUIRED_FIELDS
            }else{
                //encaminhar dados da banda para o db 
                let resultInstrumento = await instrumentoDAO.insertInstrumento(instrumento)

                if(resultInstrumento)
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
const atualizarInstrumento = async function  (id, instrumento, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json'){
            if(instrumento.nome == '' || instrumento.nome == null || instrumento.nome == undefined || instrumento.nome.length > 100 || 
                id == '' || id == null || id == undefined || isNaN(id)
                 
            ){
                return message.ERROR_REQUIRED_FIELDS
            }else{
                //verificação existancia ID no BD
                    let result = await instrumentoDAO.selectByIdInstrumento(id)

                    if(result != false || typeof(result) == 'object'){
                        if(result.length > 0 ){
                            //Update 

                            //adciona o atributi do id no json com os dados recebidos no corpo da requisição 
                            instrumento.id = id 
                                let resultInstrumento = await instrumentoDAO.updateInstrumento(instrumento)
                                if(resultInstrumento){
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
const excluirInstrumento = async function (id){

    try {
          if(id == '' || id == null || id == undefined || isNaN(id)){
                    return message.ERROR_REQUIRED_FIELDS//400
          }else{
             
            let resultInstrumento = await instrumentoDAO.selectByIdInstrumento(id)

            if(resultInstrumento != false || typeof(resultInstrumento) == 'object'){
                if(resultInstrumento.length > 0){
                    //delete

                    result = await instrumentoDAO.deleteInstrumento(id)

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
const listarInstrumento = async function (){

    try {
        let dadosInstrumento = {}

        let resultInstrumento = await instrumentoDAO.selectAllInstrumento()

         if(resultInstrumento != false || typeof(resultInstrumento) == 'object' ){
                    if(resultInstrumento.length > 0){
                        //cria um json para colocar o array de bandas
                        dadosInstrumento.status = true
                        dadosInstrumento.status_code = 200,
                        dadosInstrumento.items = resultInstrumento.length
                        dadosInstrumento.instrumentos = resultInstrumento
                        return dadosInstrumento
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
const buscarInstrumento = async function (id){
    try {

         if(id == '' || id == undefined || id == null || isNaN(id)){
                   return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    let dadosInstrumento = {}

                    resultInstrumento = await instrumentoDAO.selectByIdInstrumento(id)

                        if(resultInstrumento != false || typeof(resultInstrumento) == 'object'){
                            if(resultInstrumento.length > 0 ){
                            //criacao do json para o array das bandas 
                            dadosInstrumento.status = true,
                            dadosInstrumento.status_code = 200, 
                            dadosInstrumento.instrumentos = resultInstrumento
                            return dadosInstrumento
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
    inserirInstrumento,
    atualizarInstrumento,
    listarInstrumento,
    buscarInstrumento,
    excluirInstrumento
}