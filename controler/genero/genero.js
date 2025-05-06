/*********************************************
 * Objetivo: Controller referente as ações de CRUD de genero 
 * Data: 29/04/2025
 * Autor: Gustavo Deodato
 * Versão 1.0
 * ********************************************** */

const message = require('../../modulo/config.js')

const generoDAO = require('../../model/DAO/genero.js')

//função para inserir uma genero 
const inserirGenero = async function (genero, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json'){
            if(genero.nome == ''|| genero.nome == null||genero.nome == undefined|| genero.nome.Length > 100 

            ){
                return message.ERROR_REQUIRED_FIELDS
            }else{
                //encaminhar dados da genero para o db 
                let resultGenero = await generoDAO.inserirGenero(genero)

                if(resultGenero)
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

//função para atualizar uma genero 
const atualizarGenero = async function  (){
    try {
        if(String(contentType).toLowerCase() == 'application/json'){
            if(genero.nome == '' || genero.nome == null || genero.nome == undefined || genero.nome.length > 100 || 
                id == '' || id == null || id == undefined || isNaN(id)
                 
            ){
                return message.ERROR_REQUIRED_FIELDS
            }else{
                //verificação existancia ID no BD
                    let result = await generoDAO.selectByIdGenero(id)

                    if(result != false || typeof(result) == 'object'){
                        if(result.length > 0 ){
                            //Update 

                            //adciona o atributi do id no json com os dados recebidos no corpo da requisição 
                            musica.id = id 
                                let resultgenero = await generoDAO.updateGenero(genero)
                                if(resultgenero){
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

//função para deletar uma Genero
const excluirGenero = async function (id){

    try {
          if(id == '' || id == null || id == undefined || isNaN(id)){
                    return message.ERROR_REQUIRED_FIELDS//400
          }else{
             
            let resultGenero = generoDAO.selectByIdGenero(id)

            if(resultGenero != false || typeof(resultGenero) == 'object'){
                if(resultGenero.length > 0){
                    //delete

                    result = generoDAO.deleteGenero(id)

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

// função para mostrar todas as Genero
const listarGenero = async function (){

    try {
        let dadosGenero = {}

        let resultGenero = await generoDAO.selectAllGenero()

         if(resultGenero != false || typeof(resultGenero) == 'object' ){
                    if(resultGenero.length > 0){
                        //cria um json para colocar o array de Genero
                        dadosGenero.status = true
                        dadosGenero.status_code = 200,
                        dadosGenero.items = resultGenero.length
                        dadosGenero.generos = resultGenero
                        return dadosGenero
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
//função para buscar uma Genero pelo ID 
const buscarGenero = async function (id){
    try {

         if(id == '' || id == undefined || id == null || isNaN(id)){
                   return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    let dadosGenero = {}

                    resultGenero = await GeneroDAO.selectByIdGenero(id)

                        if(resultGenero != false || typeof(resultGenero) == 'object'){
                            if(resultGenero.length > 0 ){
                            //criacao do json para o array das Genero
                            dadosGenero.status = true,
                            dadosGenero.status_code = 200, 
                            dadosGenero.genero = resultGenero
                            return dadosGenero
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
    inserirGenero,
    listarGenero,
    buscarGenero,
    excluirGenero,
    atualizarGenero
}