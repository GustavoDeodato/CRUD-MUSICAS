/*********************************************
 * Objetivo: Controller referente as ações de CRUD de banda  
 * Data: 01/04/2025
 * Autor: Gustavo Deodato
 * Versão 1.0
 * ********************************************** */

const message = require('../../modulo/config.js')

const bandaDAO = require('../../model/DAO/banda.js')

//função para inserir uma banda 
const inserirBanda = async function (banda, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json'){
            if(banda.nome == ''|| banda.nome == null||banda.nome == undefined|| banda.nome.Length > 100 

            ){
                return message.ERROR_REQUIRED_FIELDS
            }else{
                //encaminhar dados da banda para o db 
                let resultBanda = await bandaDAO.insertBanda(banda)

                if(resultBanda)
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
const atualizarBanda = async function  (){

}

//função para deletar uma bandas 
const excluirBanda = async function (id){

    try {
          if(id == '' || id == null || id == undefined || isNaN(id)){
                    return message.ERROR_REQUIRED_FIELDS//400
          }else{
             
            let resultBanda = bandaDAO.selectByIdBanda(id)

            if(resultMusica != false || typeof(resultMusica) == 'object'){
                if(resultBanda.length > 0){
                    //delete

                    result = bandaDAO.deleteBanda(id)

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
const listarBanda = async function (){

    try {
        let dadosBanda = {}

        let resultBanda = await bandaDAO.selectAllBanda()

         if(resultBanda != false || typeof(resultBanda) == 'object' ){
                    if(resultBanda.length > 0){
                        //cria um json para colocar o array de bandas
                        dadosBanda.status = true
                        dadosBanda.status_code = 200,
                        dadosBanda.items = resultBanda.length
                        dadosBanda.bandas = resultBanda
                        return dadosBanda
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
const buscarBanda = async function (id){
    try {

         if(id == '' || id == undefined || id == null || isNaN(id)){
                   return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    let dadosBanda = {}

                    resultBanda = await bandaDAO.selectByIdBanda(id)

                        if(resultBanda != false || typeof(resultBanda) == 'object'){
                            if(resultBanda.length > 0 ){
                            //criacao do json para o array das bandas 
                            dadosBanda.status = true,
                            dadosBanda.status_code = 200, 
                            dadosBanda.bandas = resultBanda
                            return dadosBanda
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
    inserirBanda,
    atualizarBanda,
    excluirBanda,
    listarBanda,
    buscarBanda
}