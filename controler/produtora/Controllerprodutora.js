/*********************************************
 * Objetivo: Controller referente as ações de CRUD de banda  
 * Data: 01/04/2025
 * Autor: Gustavo Deodato
 * Versão 1.0
 * ********************************************** */

const message = require('../../modulo/config.js')

const produtoraDAO = require('../../model/DAO/produtora.js')

//função para inserir uma Produtora 
const inserirProdutora = async function (Produtora, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json'){
            if(Produtora.nome == ''|| Produtora.nome == null||Produtora.nome == undefined|| Produtora.nome.Length > 100 

            ){
                return message.ERROR_REQUIRED_FIELDS
            }else{
                //encaminhar dados da Produtora para o db 
                let resultProdutora = await produtoraDAO.insertProdutora(Produtora)

                if(resultProdutora)
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

//função para atualizar uma produtora 
const atualizarProdutora = async function  (id, produtora, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json'){
            if(produtora.nome == '' || produtora.nome == null || produtora.nome == undefined || produtora.nome.length > 100 || 
                id == '' || id == null || id == undefined || isNaN(id)
                 
            ){
                return message.ERROR_REQUIRED_FIELDS
            }else{
                //verificação existancia ID no BD
                    let result = await produtoraDAO.selectByIdProdutora(id)

                    if(result != false || typeof(result) == 'object'){
                        if(result.length > 0 ){
                            //Update 

                            //adciona o atributi do id no json com os dados recebidos no corpo da requisição 
                            produtora.id = id 
                                let resultProdutora = await produtoraDAO.updateProdutora(produtora)
                                if(resultProdutora){
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

//função para deletar uma Produtora 
const excluirProdutora = async function (id){

    try {
          if(id == '' || id == null || id == undefined || isNaN(id)){
                    return message.ERROR_REQUIRED_FIELDS//400
          }else{
          //verificando a existencia do id antes de excluir 
            let resultProdutora = await produtoraDAO.selectByIdProdutora(id)

            if(resultProdutora != false || typeof(resultProdutora) == 'object'){
                if(resultProdutora.length > 0){
                    //delete

                    result = await produtoraDAO.excluirProdutora(id)

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

// função para mostrar todas as Produtora
const listarProdutora = async function (){

    try {
        let dadosProdutora = {}

        let resultProdutora = await produtoraDAO.selectAllProdutora()

         if(resultProdutora != false || typeof(resultProdutora) == 'object' ){
                    if(resultProdutora.length > 0){
                        //cria um json para colocar o array de bandas
                        dadosProdutora.status = true
                        dadosProdutora.status_code = 200,
                        dadosProdutora.items = resultProdutora.length
                        dadosProdutora.produtoras = resultProdutora
                        return dadosProdutora
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
//função para buscar uma produtora pelo ID 
const buscarProdutora = async function (id){
    try {

         if(id == '' || id == undefined || id == null || isNaN(id)){
                   return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    let dadosProdutora = {}

                    resultProdutora = await produtoraDAO.selectByIdProdutora(id)

                        if(resultProdutora != false || typeof(resultProdutora) == 'object'){
                            if(resultProdutora.length > 0 ){
                            //criacao do json para o array das bandas 
                            dadosProdutora.status = true,
                            dadosProdutora.status_code = 200, 
                            dadosProdutora.Produtoras = resultProdutora
                            return dadosProdutora
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
  inserirProdutora,
  atualizarProdutora,
  buscarProdutora,
  listarProdutora,
  excluirProdutora
}