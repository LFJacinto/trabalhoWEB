# Catálogo de Filmes

Projeto acadêmico da disciplina **Desenvolvimento de Sistemas para Web (55DSW)**.

## Requisitos
- Java 17
- Maven 3
- Node.js 18+
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

## Rodando o front-end
```
cd frontend
npm install
npm run dev
```

O front-end React será servido em `http://localhost:3000` e consome a API do back-end.

## Estrutura do projeto
- **backend**: aplicação Spring Boot com JPA
- **frontend**: aplicação React + Vite

## Tecnologias
- Spring Boot
- Spring Data JPA
- Hibernate Validation
- MySQL
- React
- Vite
- Axios
- React Hook Form
- Yup
