# Catálogo de Filmes

Projeto acadêmico da disciplina **Desenvolvimento de Sistemas para Web (55DSW)**.

## Requisitos
- Java 17
- Maven 3
- Node.js (opcional para o front-end)
- MySQL 8+

## Configurando o banco de dados
Crie um banco chamado `catalogo_filmes` e ajuste **username** e **password** em `backend/src/main/resources/application.properties`.

```
mysql -u root -p
CREATE DATABASE catalogo_filmes DEFAULT CHARACTER SET utf8mb4 DEFAULT COLLATE utf8mb4_unicode_ci;
```

## Rodando o back-end
```
cd backend
mvn spring-boot:run
```

A API estará disponível em `http://localhost:8080/filmes`.

## Estrutura do projeto
- **backend**: aplicação Spring Boot com JPA
- **frontend**: (a ser desenvolvido) aplicação React

## Tecnologias
- Spring Boot
- Spring Data JPA
- Hibernate Validation
- MySQL
- React
