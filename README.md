# Catálogo de Filmes

Projeto acadêmico da disciplina **Desenvolvimento de Sistemas para Web (55DSW)**.

## Requisitos
- Java 17
- Maven 3
- MySQL 8+

## Configurando o banco de dados
Crie um banco chamado `catalogo` e ajuste **username** e **password** em `backend/src/main/resources/application.properties`.

```
mysql -u root -p
CREATE DATABASE catalogo DEFAULT CHARACTER SET utf8mb4 DEFAULT COLLATE utf8mb4_unicode_ci;
```

## Rodando o back-end
```
executar CatalogoFilmesApplication
```

A API estará disponível em `http://localhost:8080/filmes`.



## Tecnologias
- Spring Boot
- Spring Data JPA
- Hibernate Validation
- MySQL
- React

