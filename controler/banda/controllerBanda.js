/*********************************************
 * Objetivo: Controller referente as ações de CRUD de banda  
 * Data: 01/04/2025
 * Autor: Gustavo Deodato
 * Versão 1.0
 * ********************************************** */

const message = require('../../modulo/config.js')

const bandaDAO = require('../../model/DAO/banda.js')

//função para inserir uma banda 
const inserirBanda = async function (){
    try {
        if(String(contentType).toLowerCase() == 'application/Json'){
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
const excluirBanda = async function (){

}

// função para mostrar todas as bandas
const listarBanda = async function (){

    try {
        let dadosBanda = {}

        let resultBanda = await bandaDAO.selectAllBanda()

         if(resultBanda != false || typeof(resultBanda) == 'object' ){
                    if(resultBanda.length > 0){
                        //cria um json para colocar o array de musicas 
                        dadosBanda.status = true
                        dadosBanda.status_code = 200,
                        dadosBanda.items = resultMusica.length
                        dadosBanda.musics = resultMusica
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
const buscarBanda = async function (){

}



module.exports = {
    inserirBanda,
    atualizarBanda,
    excluirBanda,
    listarBanda,
    buscarBanda
}