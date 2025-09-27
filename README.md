# 🎵 CRUD de Músicas – API REST

API REST construída em **Node.js + Express + Prisma**, no segundo ano do curso técnico de desenvolvimento de sistemas do senai Jandira, para gerenciar informações sobre músicas, bandas, gêneros, produtoras e as relações entre eles. 

---

## 🚀 Tecnologias utilizadas
- **Node.js / Express** → criação da API  
- **Prisma ORM** → integração com banco de dados  
- **Cors & Body-Parser** → tratamento de requisições  
- **Controllers separados** → responsabilidade modular  

---

## 📌 Endpoints disponíveis

### 🎶 Músicas
- **POST** `/v1/controle-musicas/musica` → Inserir música  
- **GET** `/v1/controle-musicas/musica` → Listar todas as músicas  
- **GET** `/v1/controle-musicas/musica/:id` → Buscar música por ID  
- **PUT** `/v1/controle-musica/musica/:id` → Atualizar música por ID  
- **DELETE** `/v1/controle-musicas/musica/:id` → Deletar música por ID  

### 🎸 Bandas
- **POST** `/v1/controle-musica/banda` → Inserir banda  
- **GET** `/v1/controler-musica/banda` → Listar todas as bandas  
- **GET** `/v1/controler-musica/banda/:id` → Buscar banda por ID  
- **PUT** `/v1/controle-musica/banda/:id` → Atualizar banda  
- **DELETE** `/v1/controler-musica/banda/:id` → Excluir banda  

### 🎼 Gêneros
- **POST** `/v1/controle-musica/genero` → Inserir gênero  
- **GET** `/v1/controler-musica/genero` → Listar todos os gêneros  
- **GET** `/v1/controler-musica/genero/:id` → Buscar gênero por ID  
- **PUT** `/v1/controle-musica/genero/:id` → Atualizar gênero  
- **DELETE** `/v1/controler-musica/genero/:id` → Excluir gênero  

### 🔗 Música ↔ Gênero
- **POST** `/v1/controle-musica/musicagenero` → Relacionar música e gênero  
- **GET** `/v1/controler-musica/musicagenero` → Listar todos os vínculos  
- **GET** `/v1/controler-musica/musicagenero/:id` → Buscar vínculo por ID  
- **PUT** `/v1/controle-musica/musicagenero/:id` → Atualizar vínculo  
- **DELETE** `/v1/controler-musica/musicagenero/:id` → Excluir vínculo  

### 🎥 Produtora *(em desenvolvimento — endpoints duplicam lógica de música/gênero)*
- **POST** `/v1/controle-musica/produtora`  
- **GET** `/v1/controler-musica/produtora`  
- **GET** `/v1/controler-musica/produtora/:id`  
- **PUT** `/v1/controle-musica/produtora/:id`  
- **DELETE** `/v1/controler-musica/produtora/:id`  

---

## 📖 Exemplos de uso (via cURL)

### Inserir uma música
```bash
curl -X POST http://localhost:8080/v1/controle-musicas/musica \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Baby",
    "duracao": "00:03:48",
    "data_lancamento": "2010-01-18",
    "letra": "baibe baibe oo",
    "link": "http://baibe.mp3"

}'


