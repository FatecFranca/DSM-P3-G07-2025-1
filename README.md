# DSM-P3-G07-2025-1

Repositório do GRUPO 07 do Projeto Interdisciplinar do 3º semestre DSM 2025/1. Alunos: Gabriel da Silveira Pessoni, Luis Fernando Mendes Silva.

**Descrição do Projeto**
------------------------

O **Restify** é uma plataforma avançada para teste e gerenciamento de APIs, projetada para desenvolvedores e equipes que precisam otimizar seu fluxo de trabalho na criação e validação de requisições HTTP. Com uma interface intuitiva e recursos robustos, o Restify facilita a organização, execução e análise de testes em APIs de maneira eficiente e colaborativa.


**Principais Funcionalidades**
------------------------------

-   **Criação de Collections**: Organize suas requisições em coleções e pastas para facilitar o acesso e reutilização.
-   **Histórico de Execuções (Runs)**: Acompanhe todas as execuções de endpoints, com detalhes sobre requisições, respostas e tempo de processamento.
-   **Geração de Relatórios**: Exporte logs e análises detalhadas sobre as execuções de APIs para facilitar auditorias e monitoramento.
-   **Criação Simplificada de Testes**: Configure rapidamente testes automatizados para validar endpoints, com suporte a múltiplos métodos HTTP, autenticação e parâmetros dinâmicos.
-   **Autenticação Personalizável**: Suporte para diversos métodos de autenticação, como API Key, OAuth, JWT e Basic Auth.
-   **Ambientes e Variáveis**: Defina diferentes ambientes para testar sua API em desenvolvimento, staging e produção sem precisar modificar suas requisições manualmente.

------------------------------


## 🚀 Tecnologias

- **Backend**
  - Node.js
  - Express.js
  - Prisma (ORM)
  - MongoDB
  - JWT (Autenticação)
  - Bcrypt (Criptografia)
  - Joi (Validação)


- **Frontend**
  - Next.js
  - TypeScript
  - Tailwind CSS
  - React Hook Form

## 🔧 Instalação

1. Clone o repositório
```bash
git clone [url-do-repositorio]
```

2. Instale as dependências do backend
```bash
cd back-end
npm install
```

3. Configure as variáveis de ambiente
```bash
# Crie um arquivo .env na raiz do backend com:
DATABASE_URL="sua_url_do_mongodb"
JWT_SECRET="seu_segredo_jwt"
```

4. Execute as migrações do Prisma
```bash
npx prisma migrate dev
```

5. Inicie o servidor
```bash
npm run dev
```

Para rodar o frontend

1. Instale as dependências do frontend
```bash
cd front-end
npm install
```

2. Configure as variáveis de ambiente
```bash
# Crie um arquivo .env na raiz do frontend com:
NEXT_PUBLIC_API_URL="http://localhost:3001" # URL do backend
```

3. Inicie o servidor
```bash
npm run dev
```

## 🔒 Autenticação

Todas as rotas protegidas requerem um token JWT no header:
```
Authorization: Bearer seu_token_jwt
```

## 📦 Estrutura do Projeto

```
back-end/
├── src/
│   ├── controllers/    # Controladores da aplicação
│   ├── middlewares/    # Middlewares (auth, validação)
│   ├── routes/         # Rotas da API
│   ├── validations/    # Schemas de validação
│   ├── database/       # Configuração do Prisma
│   └── app.js         # Configuração do Express
├── prisma/
│   └── schema.prisma  # Schema do banco de dados
└── package.json
```

```
frontend/
├── components/ # Componentes reutilizáveis React
├── pages/ # Páginas da aplicação (Next.js)
├── styles/ # Estilos globais e Tailwind CSS
├── hooks/ # Hooks customizados
├── utils/ # Utilitários e helpers
├── types/ # Definições TypeScript
├── public/ # Arquivos estáticos
├── form/ # Formulários usando React Hook Form
├── tailwind.config.js # Configuração do Tailwind CSS
├── tsconfig.json # Configuração do TypeScript
└── package.json
```


## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.