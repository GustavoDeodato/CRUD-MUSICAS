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
const ControllerMusicaGenero = require('./controler/musica_genero/ControllerMusica_Genero.js')
const ControllerProdutora = require('./controler/produtora/Controllerprodutora.js')
const ControllerAlbum = require('./controler/album/Controlleralbum.js')
const ControllerInstrumento = require('./controler/instrumento/ControllerInstrumento.js')
const ControllerArtista = require('./controler/artista/ControllerArtista.js')

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
app.delete('/v1/controler-musica/banda/:id', cors(), async function(request, response){
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

    response.status(resultGenero.status_code)
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
app.delete('/v1/controler-musica/genero/:id', cors(), async function(request, response){
    let idgenero = request.params.id

    let resultGenero = await ControllerGenero.excluirGenero(idgenero)

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

/////////////////////////////////////////////////////////////////// M U S I C A _ G  E N E R O S   ///////////////////////////////////////////////////////////////////////////////////////////

// endpoint para inserir na tabela intermediaria musicagenero 
app.post('/v1/controle-musica/musicagenero', cors (), bodyParserJSON, async function(request, response){

    let contentType = request.headers['content-type']

    //recebe os dados do body da requisição 
    let dadosbody = request.body
   
    //chama a função da controller para inserir os dados e agurada o retorno da função 
    let resultMusicaGenero = await ControllerMusicaGenero.inserirMusicaGenero(dadosbody, contentType)

    response.status(resultMusicaGenero.status_code)
    response.json(resultMusicaGenero)

})

//endpoint para listar todos na tabela intermediaria musicagenero  
app.get ('/v1/controler-musica/musicagenero', cors(), async function (request, response) {
    resultMusicaGenero = await ControllerMusicaGenero.listarMusicaGenero()

    response.status(resultMusicaGenero.status_code)
    response.json(resultMusicaGenero)
})

//Endpoint para buscar pelo ID na tabela intermediaria musicagenero  
app.get('/v1/controler-musica/musicagenero/:id', cors(), async function(request, response){
    let idMusicaGenero = request.params.id 

    let resultMusicaGenero = await ControllerMusicaGenero.buscarMusicaGenero(idMusicaGenero)

    response.status(resultMusicaGenero.status_code)
    response.json(resultMusicaGenero)
})

//Endpoint para deletar na tabela intermediaria musicagenero 
app.delete('/v1/controler-musica/musicagenero/:id', cors(), async function(){
    let idmusicagenero = request.params.id

    let resultMusicaGenero = await ControllerMusicaGenero.excluirMusicaGenero (idmusicagenero)

    response.status(resultMusicaGenero.status_code)
    response.json(resultMusicaGenero)
})

//Endpoint para atualizar na tabela intermediaria musicagenero pelo ID
app.put('/v1/controle-musica/musicagenero/:id', cors(), bodyParserJSON, async function(request, response){
    let contentType = request.headers['content-type']
    
    let idmusicagenero = request.params.id

    //recebe os dados do corpo da requisição  
    let dadosbody = request.body

    let resultMusicaGenero = await ControllerMusicaGenero.atualizarMusicaGenero(idmusicagenero, dadosbody, contentType)

    response.status(resultMusicaGenero.status_code)
    response.json(resultMusicaGenero)
})


///////////////////////////////////////////////////////////////////  P R O D U T O R A    /////////////////////////////////////////////////////////////////////////////////////////////////

// endpoint para inserir uma produtora
app.post('/v1/controle-musica/produtora', cors (), bodyParserJSON, async function(request, response){

    let contentType = request.headers['content-type']

    //recebe os dados do body da requisição 
    let dadosbody = request.body
   
    //chama a função da controller para inserir os dados e agurada o retorno da função 
    let resultProdutora = await ControllerProdutora.inserirProdutora(dadosbody, contentType)

    response.status(resultProdutora.status_code)
    response.json(resultProdutora)

})

//endpoint para listar todos os produtora 
app.get ('/v1/controler-musica/produtora', cors(), async function (request, response) {
    resultProdutora = await ControllerProdutora.listarProdutora()

    response.status(resultProdutora.status_code)
    response.json(resultProdutora)
})

//Endpoint para buscar um produtora pelo ID 
app.get('/v1/controler-musica/produtora/:id', cors(), async function(request, response){
    let idProdutora = request.params.id 

    let resultProdutora = await ControllerProdutora.buscarProdutora(idProdutora)

    response.status(resultProdutora.status_code)
    response.json(resultProdutora)
})

//Endpoint para deletar uma produtora pelo id 
app.delete('/v1/controler-musica/produtora/:id', cors(), async function(request, response){
    let idprodutora = request.params.id

    let resultProdutora = await ControllerProdutora.excluirProdutora(idprodutora)

    response.status(resultProdutora.status_code)
    response.json(resultProdutora)
})

//Endpoint para atualizar uma produtora pelo id
app.put('/v1/controle-musica/produtora/:id', cors(), bodyParserJSON, async function(request, response){
    let contentType = request.headers['content-type']
    
    let idprodutora = request.params.id

    //recebe os dados do corpo da requisição  
    let dadosbody = request.body

    let resultProdutora = await ControllerProdutora.atualizarProdutora(idprodutora, dadosbody, contentType)

    response.status(resultProdutora.status_code)
    response.json(resultProdutora)
})

///////////////////////////////////////////////////////////////////////////  A L B U M    /////////////////////////////////////////////////////////////////////////////////////////////////

// endpoint para inserir uma album
app.post('/v1/controle-musica/album', cors (), bodyParserJSON, async function(request, response){

    let contentType = request.headers['content-type']

    //recebe os dados do body da requisição 
    let dadosbody = request.body
   
    //chama a função da controller para inserir os dados e agurada o retorno da função 
    let resultAlbum = await ControllerAlbum.inserirAlbum(dadosbody, contentType)

    response.status(resultAlbum.status_code)
    response.json(resultAlbum)

})

//endpoint para listar todos os album
app.get ('/v1/controler-musica/album', cors(), async function (request, response) {
    resultAlbum = await ControllerAlbum.listarAlbum()

    response.status(resultAlbum.status_code)
    response.json(resultAlbum)
})

//Endpoint para buscar um album pelo ID 
app.get('/v1/controler-musica/album/:id', cors(), async function(request, response){
    let idAlbum = request.params.id 

    let resultAlbum = await ControllerAlbum.buscarAlbum(idAlbum)

    response.status(resultAlbum.status_code)
    response.json(resultAlbum)
})

//Endpoint para deletar uma album pelo id 
app.delete('/v1/controler-musica/album/:id', cors(), async function(request, response){
    let idalbum = request.params.id

    let resultAlbum = await ControllerAlbum.excluirAlbum(idalbum)

    response.status(resultAlbum.status_code)
    response.json(resultAlbum)
})

//Endpoint para atualizar uma album pelo id
app.put('/v1/controle-musica/album/:id', cors(), bodyParserJSON, async function(request, response){
    let contentType = request.headers['content-type']
    
    let idalbum = request.params.id

    //recebe os dados do corpo da requisição  
    let dadosbody = request.body

    let resultAlbum = await ControllerAlbum.atualizarAlbum(idalbum, dadosbody, contentType)

    response.status(resultAlbum.status_code)
    response.json(resultAlbum)
})

//////////////////////////////////////////////////////////////////// I N S T R U M E N T O S///////////////////////////////////////////////////////////////////////////////

// endpoint para inserir uma album
app.post('/v1/controle-musica/instrumento', cors (), bodyParserJSON, async function(request, response){

    let contentType = request.headers['content-type']

    //recebe os dados do body da requisição 
    let dadosbody = request.body
   
    //chama a função da controller para inserir os dados e agurada o retorno da função 
    let resultInstrumento = await ControllerInstrumento.inserirInstrumento(dadosbody, contentType)

    response.status(resultInstrumento.status_code)
    response.json(resultInstrumento)

})

//endpoint para listar todos os instrumento
app.get ('/v1/controler-musica/instrumento', cors(), async function (request, response) {
    resultInstrumento = await ControllerInstrumento.listarInstrumento()

    response.status(resultInstrumento.status_code)
    response.json(resultInstrumento)
})

//Endpoint para buscar um Instrumento pelo ID 
app.get('/v1/controler-musica/instrumento/:id', cors(), async function(request, response){
    let idInstrumento = request.params.id 

    let resultInstrumento = await ControllerInstrumento.buscarInstrumento(idInstrumento)

    response.status(resultInstrumento.status_code)
    response.json(resultInstrumento)
})

//Endpoint para deletar uma instrumento pelo id 
app.delete('/v1/controler-musica/instrumento/:id', cors(), async function(request, response){
    let idInstrumento = request.params.id

    let resultInstrumento = await ControllerInstrumento.excluirInstrumento(idInstrumento)

    response.status(resultInstrumento.status_code)
    response.json(resultInstrumento)
})

//Endpoint para atualizar uma instrumento pelo id
app.put('/v1/controle-musica/instrumento/:id', cors(), bodyParserJSON, async function(request, response){
    let contentType = request.headers['content-type']
    
    let idInstrumento = request.params.id

    //recebe os dados do corpo da requisição  
    let dadosbody = request.body

    let resultInstrumento = await ControllerInstrumento.atualizarInstrumento(idInstrumento, dadosbody, contentType)

    response.status(resultInstrumento.status_code)
    response.json(resultInstrumento)
})

/////////////////////////////////////////////////////////////////////////////////////// A R T I S T A S /////////////////////////////////////////////////////////////////////////////////////////

// endpoint para inserir uma artista
app.post('/v1/controle-musica/artista', cors (), bodyParserJSON, async function(request, response){

    let contentType = request.headers['content-type']

    //recebe os dados do body da requisição 
    let dadosbody = request.body
   
    //chama a função da controller para inserir os dados e agurada o retorno da função 
    let resultArtista = await ControllerArtista.inserirArtista(dadosbody, contentType)

    response.status(resultArtista.status_code)
    response.json(resultArtista)

})

//endpoint para listar todos os artista
app.get ('/v1/controler-musica/artista', cors(), async function (request, response) {
    resultArtista = await ControllerArtista.listarArtistas()

    response.status(resultArtista.status_code)
    response.json(resultArtista)
})

//Endpoint para buscar um artista pelo ID 
app.get('/v1/controler-musica/artista/:id', cors(), async function(request, response){
    let idArtista = request.params.id 

    let resultArtista = await ControllerArtista.buscarArtista(idArtista)

    response.status(resultArtista.status_code)
    response.json(resultArtista)
})

//Endpoint para deletar uma artista pelo id 
app.delete('/v1/controler-musica/artista/:id', cors(), async function(request, response){
    let idArtista = request.params.id

    let resultArtista = await ControllerArtista.excluirArtista(idArtista)

    response.status(resultArtista.status_code)
    response.json(resultArtista)
})

//Endpoint para atualizar uma artista pelo id
app.put('/v1/controle-musica/artista/:id', cors(), bodyParserJSON, async function(request, response){
    let contentType = request.headers['content-type']
    
    let idArtista = request.params.id

    //recebe os dados do corpo da requisição  
    let dadosbody = request.body

    let resultArtista = await ControllerArtista.atualizarArtista(idArtista, dadosbody, contentType)

    response.status(resultArtista.status_code)
    response.json(resultArtista)
})

app.listen('8080', function(){
    console.log('API funcionando e aguardando requisições..')
})
