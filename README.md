# Task Manager Backend

API REST para gerenciamento de tarefas com autenticação JWT.

## 🚀 Como Iniciar

# Instalar dependências
npm install

# Iniciar o servidor
npm start

O servidor estará disponível em: http://localhost:3000


## 📋 Rotas da Aplicação

### Autenticação
| Método | Rota | Descrição | Autenticado |
|--------|------|-----------|-------------|
| POST | /register | Criar novo usuário | ❌ |
| POST | /login | Fazer login | ❌ |
| POST | /refresh-token | Atualizar token de acesso | ❌ |
| POST | /logout | Fazer logout | ❌ |

### Tarefas
| Método | Rota | Descrição | Autenticado |
|--------|------|-----------|-------------|
| GET | /tasks | Listar todas as tarefas do usuário | ✅ |
| POST | /tasks | Criar nova tarefa | ✅ |
| PUT | /tasks/:id | Atualizar tarefa completa | ✅ |
| PATCH | /tasks/status/:id | Atualizar apenas o status | ✅ |
| DELETE | /tasks/:id | Deletar tarefa específica | ✅ |
| DELETE | /tasks | Deletar todas as tarefas | ✅ |

Nota: Rotas autenticadas requerem token JWT no header Authorization: Bearer <token>


## 🛠 Tecnologias Utilizadas

### Dependências de Produção
- express (^5.2.1) - Framework web minimalista para criar APIs
- @prisma/client (^7.7.0) - ORM oficial do Prisma para interação com banco
- @prisma/adapter-pg (^7.7.0) - Adapter do Prisma para PostgreSQL
- pg (^8.20.0) - Driver nativo do PostgreSQL para Node.js
- bcryptjs (^3.0.3) - Biblioteca para hash de senhas (segurança)
- jsonwebtoken (^9.0.3) - Geração e verificação de tokens JWT
- zod (^4.3.6) - Biblioteca de validação de schemas
- cookie-parser (^1.4.7) - Parser de cookies para requisições HTTP
- dotenv (^17.4.2) - Carrega variáveis de ambiente do arquivo .env
- uuid (^13.0.0) - Geração de identificadores únicos

### Dependências de Desenvolvimento
- typescript (^6.0.2) - Superset do JavaScript com tipagem estática
- tsx (^4.21.0) - Executar arquivos TypeScript diretamente
- prisma (^7.7.0) - ORM e ferramenta de migração de banco
- vitest (^4.1.5) - Framework de testes unitários
- eslint (^10.2.0) - Linter para identificar problemas no código
- prettier (^3.8.2) - Formatador de código automático
- husky (^9.1.7) - Git hooks para automatizar tarefas
- @commitlint/cli (^20.5.0) - Validador de mensagens de commit


## 📦 Estrutura do Projeto

```
src/
├── index.ts              - Ponto de entrada da aplicação
├── routes/route.ts       - Definição de todas as rotas
├── controllers/          - Lógica de controladores
├── middlewares/          - Middlewares (auth, validações)
├── services/             - Lógica de negócio
├── repository/           - Acesso a dados (Prisma)
├── schemas/              - Schemas de validação Zod
├── helpers/              - Funções auxiliares
└── __tests__/           - Configuração de testes
```

## 🔧 Variáveis de Ambiente

Crie um arquivo .env na raiz do projeto:

```
DATABASE_URL=postgresql://usuario:senha@localhost:5432/nome_do_banco
JWT_SECRET=sua_chave_secreta_aqui
````

## 🧪 Executar Testes

npm test
