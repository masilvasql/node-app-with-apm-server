### Como utilizar o projeto com o docker

* Basta ter o docker instalado em sua máquina e rodar o comando: ```docker-compose up -d```

### Exemplo de uso da API

* Criando um usuário
```javascript
    url: http://localhost:4000/user
    verbo: post

    {
        "email":"teste@teste.com",
        "name": "teste 1",
        "password":"1234"
    }
```

* Listando usuários

```javascript
    url: http://localhost:4000/user/all
    verbo: get
```