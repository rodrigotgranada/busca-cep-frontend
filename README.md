# Busca CEP Frontend

<img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React Logo" width="200" />

## Sobre o Projeto

O **Busca CEP Frontend** é uma aplicação web responsiva que permite realizar o cadastro de usuários e busca automática de endereços com base no CEP informado. A interface é moderna, responsiva e utiliza tecnologias como React, TypeScript e TailwindCSS.

---

## Tecnologias Utilizadas

- **Frontend**:

  - React
  - TypeScript
  - React Hook Form
  - TailwindCSS
  - Axios
  - Framer Motion
  - Jest
  - React Testing Library

- **Infraestrutura**:
  - Docker
  - Nginx para servir os arquivos estáticos e fazer o proxy para o backend.

---

## Funcionalidades

- Busca automática de endereço com base no CEP.
- Cadastro de usuários com os seguintes campos:
  - Nome
  - E-mail
  - CEP
  - Endereço (Rua, Bairro, Cidade, Estado)
  - Número e Complemento
- Paginação para a listagem de usuários cadastrados.
- Exclusão de usuários com confirmação.
- Testes unitários para os principais componentes.

---

## Como Rodar o Projeto

### 1. Requisitos

- Node.js (versão 18 ou superior)
- Docker e Docker Compose
- Backend rodando em `http://localhost:3000`

### 2. Rodando Localmente

1. Clone o repositório:

   ```bash
   git clone https://github.com/rodrigotgranada/busca-cep-frontend.git
   cd busca-cep-frontend
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

4. Certifique-se de que o backend esteja rodando na porta `3000`.

5. Acesse a aplicação em [http://localhost:5173](http://localhost:5173).

---

### 3. Rodando com Docker

1. Certifique-se de que o backend esteja rodando na porta `3000`.

2. Construa e inicie o container:

   ```bash
   docker-compose up --build -d
   ```

3. Acesse a aplicação em [http://localhost:5175](http://localhost:5175).

---

## Estrutura do Projeto

```
.
├── src
│   ├── components   # Componentes reutilizáveis
│   ├── context      # Contextos da aplicação
│   ├── pages        # Páginas da aplicação
│   ├── api          # Lógica de comunicação com o backend
│   ├── types        # Expõe os tipos
│   ├── utils        # Funções auxiliares
│   ├── testes       # Testes unitários
│   └── App.tsx      # Ponto de entrada principal
├── Dockerfile       # Configuração do container Docker
├── docker-compose.yml
├── nginx.conf       # Configuração do Nginx
├── package.json     # Dependências do projeto
└── README.md        # Documentação do projeto
```

---

## Testes

### Testes Unitários

Os testes unitários utilizam o Jest e React Testing Library. Para rodar os testes:

```bash
npm run test
```

### Rodando Testes Específicos

Para rodar um arquivo de teste específico, use:

```bash
npm run test -- src/testes/Offcanvas.test.tsx
```

---

## Problemas Comuns

1. **Porta 3000 em uso**:
   - Certifique-se de que a porta 3000 não está ocupada.

---

## Autor

Desenvolvido por **[Rodrigo Granada](https://github.com/rodrigotgranada)**.

---
