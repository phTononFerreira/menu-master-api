
<h1 align="center">
  <br>
<img src="https://res.cloudinary.com/dzkrz6yzs/image/upload/v1711984700/ttm2je6yc5wnpj9uadal.png" alt="Markdownify" width="200"></a>
  <br>
  Menu Master
  <br>
</h1>

<h4 align="center">Estrutura back-end do projeto Menu Master ⚙️</h4>

<p align="center">
  <a href="#introdução">Introdução</a> •
  <a href="#instalação">Instalação</a> •
  <a href="#configuração">Configuração</a> •
  <a href="#inicialização">Inicialização</a> •
  <a href="#rotas">Rotas</a>
</p>

## Introdução
<p align="center">
  O Menu Master é uma plataforma para visualizar cardápios de restaurantes e avaliar os pratos oferecidos. Nela você pode interagir com os dados dos restaurantes, categorias de pratos, produtos e avaliações.
</p>


## Instalação

1. Clone o repositório do Menu Master.
2. Certifique-se de ter o Node.js e o npm instalados.
3. Execute `npm install` para instalar as dependências.

## Configuração

1. Crie um arquivo `.env` na raiz do projeto.
2. Defina as variáveis de ambiente necessárias no arquivo `.env`. Veja o exemplo abaixo:
```
PORT=3000

# JWT 
JWT_SECRET_KEY=chave_secreta
JWT_EXPIRES_IN=30d

# DATABASE
DATABASE_NAME=nome_do_banco_de_dados
DATABASE_USERNAME=usuario_do_banco_de_dados
DATABASE_PASSWORD=senha_do_banco_de_dados
DATABASE_HOST=host_do_banco_de_dados

# CLOUDINARY
CLOUDINARY_CLOUD_NAME=nome_da_nuvem_do_cloudinary
CLOUDINARY_API_KEY=chave_da_api_do_cloudinary
CLOUDINARY_API_SECRET=segredo_da_api_do_cloudinary
```

## Inicialização

1. Execute `npm start` para iniciar o servidor.
2. O servidor estará disponível em `http://localhost:3000`.

## Inicialização (Docker)

1. Certifique-se de ter o Docker instalado e em execução.
2. No diretório raiz do projeto, onde está localizado o Dockerfile, execute o seguinte comando para construir a imagem Docker:

   ```bash
   docker build -t menu-master-api .
   ```
   
4. Após a construção da imagem, você pode executar um contêiner Docker com o seguinte comando:

   ```bash
   docker run -p 3000:3000 -d menu-master-api
   ```
   
6. O servidor estará agora em execução dentro do contêiner Docker e estará acessível em http://localhost:3000.


## Rotas

- **Categoria:**
  - `POST /category`: Cria uma nova categoria. (Autenticado)
  - `DELETE /category`: Exclui uma categoria. (Autenticado)
  - `PUT /category`: Atualiza uma categoria. (Autenticado)
  - `GET /category`: Retorna uma categoria específica.
  - `GET /categories`: Retorna todas as categorias.

- **Produto:**
  - `POST /product`: Cria um novo produto. (Autenticado)
  - `DELETE /product`: Exclui um produto. (Autenticado)
  - `PUT /product`: Atualiza um produto. (Autenticado)
  - `GET /product`: Retorna um produto específico.
  - `GET /products`: Retorna todos os produtos.

- **Avaliação:**
  - `GET /rating`: Retorna uma avaliação específica.
  - `POST /rating`: Avalia um produto.
  - `GET /rating/avg`: Retorna a média das avaliações.

- **Restaurante:**
  - `GET /restaurant`: Retorna um restaurante específico.
  - `POST /restaurant`: Cria um novo restaurante.
  - `PUT /restaurant`: Atualiza um restaurante. (Autenticado)
  - `DELETE /restaurant`: Exclui um restaurante. (Autenticado)
  - `GET /restaurants`: Retorna todos os restaurantes.
  - `POST /restaurant/login`: Autentica o restaurante.
