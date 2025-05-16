/*********************************************
 * Objetivo: Controller referente as ações de CRUD de genero 
 * Data: 29/04/2025
 * Autor: Gustavo Deodato
 * Versão 1.0
 * ********************************************** */

//funções ainda n corrigidas 

const message = require('../../modulo/config.js')

const musicageneroDAO = require('../../model/DAO/musica_genero.js')

//função para inserir uma genero 
const inserirMusicaGenero = async function (musicagenero, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json'){
            if(
                musicagenero.id_genero == ''|| musicagenero.id_genero == null || musicagenero.id_genero == undefined
                 ||musicagenero.id_musica == ''|| musicagenero.id_musica == null || musicagenero.id_musica == undefined

            ){
                return message.ERROR_REQUIRED_FIELDS
            }else{
                //encaminhar dados da musicagenero para o db 
                let resultMusicaGenero = await musicageneroDAO.inserirGenero(musicagenero)

                if(resultMusicaGenero)
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
//terminar 
const atualizarMusicaGenero = async function  (id, musicagenero, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json'){
            if( musicagenero.id_genero == ''|| musicagenero.id_genero == null || musicagenero.id_genero == undefined
                 ||musicagenero.id_musica == ''|| musicagenero.id_musica == null || musicagenero.id_musica == undefined
                ||id == '' || id == null || id == undefined || isNaN(id)
                 
            ){
                return message.ERROR_REQUIRED_FIELDS
            }else{
                //verificação existancia ID no BD
                    let result = await musicageneroDAO.selectByIdGenero(id)

                    if(result != false || typeof(result) == 'object'){
                        if(result.length > 0 ){
                            //Update 

                            //adciona o atributi do id no json com os dados recebidos no corpo da requisição 
                            musicagenero.id = id 
                                let resultmusicagenero = await musicageneroDAO.updateMusicaGenero(musicagenero)
                                if(resultmusicagenero){
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
const excluirMusicaGenero = async function (id){

    try {
          if(id == '' || id == null || id == undefined || isNaN(id)){
                    return message.ERROR_REQUIRED_FIELDS//400
          }else{
             
            let resultGenero = musicageneroDAO.selectAllMusicaGenero(id)

            if(resultGenero != false || typeof(resultGenero) == 'object'){
                if(resultGenero.length > 0){
                    //delete

                    result = musicageneroDAO.deleteMusicaGenero(id)

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
const listarMusicaGenero = async function (){

    try {
        let dadosMusicaGenero = {}

        let resultMusicaGenero = await musicageneroDAO.selectAllMusicaGenero()

         if(resultGenero != false || typeof(resultGenero) == 'object' ){
                    if(resultMusicaGenero.length > 0){
                        //cria um json para colocar o array de Genero
                        dadosMusicaGenero.status = true
                        dadosMusicaGenero.status_code = 200,
                        dadosMusicaGenero.items = resultMusicaGenero.length
                        dadosMusicaGenero.generos = resultMusicaGenero
                        return dadosMusicaGenero
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
const buscarMusicaGenero = async function (id){
    try {

         if(id == '' || id == undefined || id == null || isNaN(id)){
                   return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    let dadosMusicaGenero = {}

                    resultMusicaGenero = await musicageneroDAO.selectByIdMusicaGenero(id)

                        if(resultMusicaGenero != false || typeof(resultMusicaGenero) == 'object'){
                            if(resultGenero.length > 0 ){
                            //criacao do json para o array das Genero
                            dadosMusicaGenero.status_code = 200, 
                            dadosMusicaGenero.genero = resultMusicaGenero
                            return dadosMusicaGenero
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
  atualizarMusicaGenero,
  atualizarMusicaGenero,
  buscarMusicaGenero,
  listarMusicaGenero,
  excluirMusicaGenero
}