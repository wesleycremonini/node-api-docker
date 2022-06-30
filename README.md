# Como usar

Clonar repositório.

```bash
git clone https://github.com/wesleycremonini/node-api-docker
```

Buildar a imagem docker (Dockerfile).

```bash
docker build . -t <your username>/node-api
```

Substituir a imagem do app no docker-compose.yml com o nome que você escolheu para a imagem.

Criar os containers app (node) e db (mysql).

```bash
docker compose up
```

Criar arquivo .env

```bash
MYSQLDB_USER=seuuser
MYSQLDB_ROOT_PASSWORD=suasenha
MYSQLDB_DATABASE=api-db
MYSQLDB_LOCAL_PORT=3306
MYSQLDB_DOCKER_PORT=3306
NODE_LOCAL_PORT=5000
NODE_DOCKER_PORT=5000
```

Em outro terminal, entrar no container

```bash
docker exec -it app bash
```

Instalar dependências package.json

```bash
npm install
```

Iniciar servidor local

```bash
npm start

ou

nodemon app.js --ip 0.0.0.0
```

Pronto, sua api está rodando localmente em localhost:5000

Usar create.js para adicionar produtos ao banco

# API DOCS wip

<h3>GET -> /api/v1/products</h3>

Retorna todos os produtos, filtra através de query

Campos:

id float
name string
price float
featured boolean (0, 1)
rating float
company string
createdAt date

Exemplos: 

```bash
/api/v1/products?company=ikea
/api/v1/products?company=ikea&price=15
```

Cada campo precisa de apenas uma parte da string correta para encontrar o model.
Por exemplo 'ode' encontra wooden.
```bash
/api/v1/products?name=ode&featured=0
```

Para ordenar use sort=campo, se houver hífen é decrescente. Use vírgula para ordenar por mais de um campo.
```bash
/api/v1/products?company=ikea&sort=name
/api/v1/products?company=ikea&sort=-name
/api/v1/products?sort=name,-price&rating=5
```
