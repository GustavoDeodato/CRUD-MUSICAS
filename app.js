/*********************************************
 * Objetivo: criar uma API para realizar integração com db 
 * Data: 11/02/2025
 * Autor: Gustavo Deodato
 * Versão 1.0
 * Observações: 
 * Para criar a Api é necessario 
 *          express                        npm install express --save
 *          cors                           npm install cors --save
 *          body-parser                    npm install body-parser --save
 * 
 * Para a conexão com o db 
 * 
 *           prisma                        npm install prisma --save 
 *           prisma/client                 npm install @prisma/client --save
 * 
 * 
 * 
 * Após a instalação do prisma e @prisma/client, devemos:
 * 
 *      npx prisma init                         Para inicializar o prisma no projeto 
 * 
 * Após esse comando você deverá configurar o .env e o schema.prisma, e rodar o comando: 
 * 
 *          npx prisma migrate dev  
 * ********************************************** */


//import das bibliotecas para a api
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')


//Cria um objeto para o body do tipo json 
const bodyParserJSON = bodyParser.json()

//incializando a utilização do express através da variavel app
const app = express()

// request = significa a chegada de dados na api 
// response = saida de dados na api 
// next = 
app.use((request, response, next)=>{
    //permissão de acessi para quem irá criar a API
    response.header('Access-Control-Allow-Origin', '*')
    //permissão de acesso para os metodos da api
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTONS')
    //ativa as configurações do header para o cors 
    app.use(cors())

    next()
})

//import das funções 
const ControllerMusica = require('./controler/musica/controllerMusica.js')
const ControllerBanda = require('./controler/banda/controllerBanda.js')
const ControllerGenero = require('./controler/genero/Controllergenero.js')

//Endpoint para inserir uma musica 
app.post('/v1/controle-musicas/musica', cors(), bodyParserJSON, async function(request, response){

    let contentType = request.headers['content-type']

    //recebe os dados do body da requisição 
    let dadosbody = request.body
   
    //chama a função da controller para inserir os dados e agurada o retorno da função 
    let resultMusica = await ControllerMusica.inserirMusica(dadosbody, contentType)

    response.status(resultMusica.status_code)
    response.json(resultMusica)
})
//Endpoint para retornar todas as musicas 
app.get('/v1/controle-musicas/musica', cors(), async function(request, response){
    let resultMusica = await ControllerMusica.listarMusica()

    response.status(resultMusica.status_code)
    response.json(resultMusica)
} )

//Endpoint pesquisar musica com base id
app.get('/v1/controle-musicas/musica/:id', cors(), async function(request, response){

    let idmusica = request.params.id

    let resultMusica = await ControllerMusica.buscarMusica(idmusica)

    response.status(resultMusica.status_code)
    response.json(resultMusica)
})


//Endpoint pesquisar e deletar musicas pelo id
app.delete('/v1/controle-musicas/musica/:id', cors(), async function (request, response){
    let idmusica = request.params.id

    let resultMusica = await ControllerMusica.excluirMusica(idmusica)

    response.status(resultMusica.status_code)
    response.json(resultMusica)
})

//Endpoint para atualizar uma musica 
app.put('/v1/controle-musica/musica/:id', cors(), bodyParserJSON, async function(request, response){
    let contentType = request.headers['content-type']
    
    let idmusica = request.params.id

    //recebe os dados do corpo da requisição 
    let dadosbody = request.body

    let resultMusica = await ControllerMusica.atualizarMusica(idmusica, dadosbody, contentType)

    response.status(resultMusica.status_code)
    response.json(resultMusica)
})


//                                          END POINTS DE BANDAS 

//endpoint para inserir uma musica 
app.post('/v1/controle-musica/banda', cors(), bodyParserJSON,  async function (request, response){

    let contentType = request.headers['content-type']

    //recebe os dados do body da requisição 
    let dadosbody = request.body
   
    //chama a função da controller para inserir os dados e agurada o retorno da função 
    let resultBanda = await ControllerBanda.inserirBanda(dadosbody, contentType)

    response.status(resultBanda.status_code)
    response.json(resultBanda)

})

//Endpoint para retornar todas as musicas 
app.get('/v1/controler-musica/banda', cors(), async function (request, response) {
    let resultBanda = await ControllerBanda.listarBanda()

    response.status(resultBanda.status_code)
    response.json(resultBanda)
})

//Endpoint para buscar uma banda pelo ID 
app.get('/v1/controler-musica/banda/:id', cors(), async function(request, response){
    let idbanda = request.params.id 

    let resultBanda = await ControllerBanda.buscarBanda(idbanda)

    response.status(resultBanda.status_code)
    response.json(resultBanda)
})

//Endpoint para deletar uma banda pelo id 
app.delete('/v1/controler-musica/banda/:id', cors(), async function(){
    let idbanda = request.params.id

    let resultBanda = await ControllerBanda.excluirBanda(idbanda)

    response.status(resultBanda.status_code)
    response.json(resultBanda)
})

//Endpoint para atualizar uma banda pelo id
app.put('/v1/controle-musica/banda/:id', cors(), bodyParserJSON, async function(request, response){
    let contentType = request.headers['content-type']
    
    let idbanda = request.params.id

    //recebe os dados do corpo da requisição 
    let dadosbody = request.body

    let resultBanda = await ControllerBanda.atualizarBanda(idbanda, dadosbody, contentType)

    response.status(resultBanda.status_code)
    response.json(resultBanda)
})

///////////////////////////////////////////////////////////////////  G  E N E R O S   ///////////////////////////////////////////////////////////////////////////////////////////

// endpoint para inserir um genero 
app.post('/v1/controle-musica/genero', cors (), bodyParserJSON, async function(request, response){

    let contentType = request.headers['content-type']

    //recebe os dados do body da requisição 
    let dadosbody = request.body
   
    //chama a função da controller para inserir os dados e agurada o retorno da função 
    let resultGenero = await ControllerGenero.inserirGenero(dadosbody, contentType)

    response.status(resultBanda.status_code)
    response.json(resultGenero)

})

//endpoint para listar todos os generos 
app.get ('/v1/controler-musica/genero', cors(), async function (request, response) {
    resultGenero = await ControllerGenero.listarGenero()

    response.status(resultGenero.status_code)
    response.json(resultGenero)
})

//Endpoint para buscar um genero pelo ID 
app.get('/v1/controler-musica/genero/:id', cors(), async function(request, response){
    let idGenero = request.params.id 

    let resultGenero = await ControllerGenero.buscarGenero(idGenero)

    response.status(resultGenero.status_code)
    response.json(resultGenero)
})

//Endpoint para deletar uma genero pelo id 
app.delete('/v1/controler-musica/genero/:id', cors(), async function(){
    let idgenero = request.params.id

    let resultGenero = await ControllerGenero.excluirGenero (idgenero)

    response.status(resultGenero.status_code)
    response.json(resultGenero)
})

//Endpoint para atualizar uma genero pelo id
app.put('/v1/controle-musica/genero/:id', cors(), bodyParserJSON, async function(request, response){
    let contentType = request.headers['content-type']
    
    let idgenero = request.params.id

    //recebe os dados do corpo da requisição  
    let dadosbody = request.body

    let resultGenero = await ControllerGenero.atualizarGenero(idgenero, dadosbody, contentType)

    response.status(resultGenero.status_code)
    response.json(resultGenero)
})

app.listen('8080', function(){
    console.log('API funcionando e aguardando requisições..')
})

