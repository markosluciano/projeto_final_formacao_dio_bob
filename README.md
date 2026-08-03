# 🚀 Projeto Final — Formação DIO com Bob (IBM)

> Projeto desenvolvido como trabalho final da formação na [DIO — Digital Innovation One](https://www.dio.me), explorando o uso do **IBM Bob** como assistente de desenvolvimento com Skills customizadas, CLI em Node.js e servidor MCP HTTP.

![Node.js](https://img.shields.io/badge/Node.js-v24-green?logo=node.js)
![License](https://img.shields.io/badge/license-MIT-blue)
![Tests](https://img.shields.io/badge/testes-37%2F37%20%E2%9C%94-brightgreen)
![Coverage](https://img.shields.io/badge/cobertura-99.36%25-brightgreen)
![MCP](https://img.shields.io/badge/MCP-HTTP%20%2B%20SSE-purple)

---

## 📋 Índice

- [Visão Geral](#-visão-geral)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [CLI — Slash Commands](#-cli--slash-commands)
- [MCP Server HTTP](#-mcp-server-http)
- [Skills do Bob](#-skills-do-bob)
- [Testes Unitários](#-testes-unitários)
- [Dados — Catálogo de Trilhas](#-dados--catálogo-de-trilhas)
- [Prompts Utilizados](#-prompts-utilizados)
- [Tecnologias](#-tecnologias)
- [Autor](#-autor)

---

## 🎯 Visão Geral

O **DIO Explorer** é uma plataforma de aprendizado interativo que oferece três funcionalidades principais acessíveis via **CLI**, **Bob Skills** ou **API MCP**:

| Funcionalidade | Descrição |
|---|---|
| `/trilha <tecnologia>` | Exibe o plano de estudos completo de uma trilha DIO |
| `/desafio <tecnologia> <nivel>` | Gera um desafio de código aleatório com requisitos e critérios |
| `/certificado <nome> <curso>` | Emite um certificado fictício de conclusão em Markdown |

O projeto demonstra a integração entre **desenvolvimento tradicional** (CLI Node.js) e **IA assistida** (Bob Skills + MCP Server), com cobertura de testes de **99.36%**.

---

## 📁 Estrutura do Projeto

```
projeto_final_formacao_dio_bob/
│
├── 📄 README.md                    ← esta documentação
├── 📄 PROMPTS.md                   ← todos os prompts usados com Bob
├── 📄 CHANGELOG.md                 ← histórico de versões
├── 📄 hello_world.md
├── 📄 .bobignore
│
├── 📁 .bob/
│   ├── 📄 mcp.json                 ← registro do MCP Server no Bob
│   └── 📁 skills/
│       ├── 📁 trilha/
│       │   └── 📄 SKILL.md         ← skill /trilha para o Bob
│       ├── 📁 desafio/
│       │   └── 📄 SKILL.md         ← skill /desafio para o Bob
│       └── 📁 certificado/
│           └── 📄 SKILL.md         ← skill /certificado para o Bob
│
└── 📁 dio_explorer/
    ├── 📄 package.json             ← dependências e scripts da CLI
    ├── 📄 README.md
    │
    ├── 📁 src/                     ← código-fonte da CLI
    │   ├── 📄 index.js             ← roteador de slash commands
    │   ├── 📄 trilha.js            ← lógica do /trilha
    │   ├── 📄 desafio.js           ← lógica do /desafio
    │   └── 📄 certificado.js       ← lógica do /certificado
    │
    ├── 📁 data/
    │   └── 📄 trilhas_dio.json     ← catálogo com 30 trilhas
    │
    ├── 📁 commands/                ← documentação dos slash commands
    │   ├── 📄 README.md
    │   ├── 📄 trilha.md
    │   ├── 📄 desafio.md
    │   └── 📄 certificado.md
    │
    ├── 📁 docs/
    │   └── 📁 certificados-emitidos/   ← certificados gerados
    │
    ├── 📁 test/
    │   ├── 📄 dio_explorer.test.js ← 37 testes unitários
    │   └── 📄 resultado_testes.txt ← relatório de cobertura
    │
    └── 📁 mcp/                     ← MCP Server HTTP
        ├── 📄 package.json
        ├── 📄 README.md
        └── 📁 src/
            ├── 📄 index.js         ← servidor Express + Streamable HTTP + SSE
            └── 📁 tools/
                ├── 📄 trilha.js
                ├── 📄 desafio.js
                ├── 📄 certificado.js
                └── 📄 listar_trilhas.js
```

---

## 🔧 Pré-requisitos

- [Node.js](https://nodejs.org) v18 ou superior
- npm v9 ou superior
- Git

---

## ⚡ Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/markosluciano/projeto_final_formacao_dio_bob.git
cd projeto_final_formacao_dio_bob

# 2. Instale as dependências da CLI
cd dio_explorer
npm install

# 3. Instale as dependências do MCP Server
cd mcp
npm install
cd ..
```

---

## 💻 CLI — Slash Commands

A CLI é executada diretamente com Node.js a partir da pasta `dio_explorer/`.

### `/trilha <tecnologia>`

Busca o plano de estudos de uma trilha DIO.

```bash
node src/index.js /trilha Java
node src/index.js /trilha Python
node src/index.js /trilha React
node src/index.js /trilha "Machine Learning"
```

**Saída:**
```
──────────────────────────────────────────────────
📚  PLANO DE ESTUDOS — FORMAÇÃO JAVA DEVELOPER
──────────────────────────────────────────────────

🎯  Nível          : Básico ao Avançado
⏱️   Duração        : 80 horas
🛠️   Tecnologias    : Java, Spring Boot, Maven, Hibernate
...
```

### `/desafio <tecnologia> <nivel>`

Gera um desafio de código aleatório.

```bash
node src/index.js /desafio Java iniciante
node src/index.js /desafio Python intermediario
node src/index.js /desafio JavaScript avancado
```

Níveis aceitos: `iniciante` | `intermediario` | `avancado`

### `/certificado <nome> <curso>`

Emite e salva um certificado fictício em Markdown.

```bash
node src/index.js /certificado "Marcos Luciano" "Java"
node src/index.js /certificado "Ana Silva" "Python"
```

O certificado é salvo automaticamente em `docs/certificados-emitidos/`.

### `/ajuda`

```bash
node src/index.js /ajuda
```

---

## 🌐 MCP Server HTTP

O servidor MCP expõe as ferramentas do DIO Explorer via protocolo [Model Context Protocol](https://modelcontextprotocol.io), suportando dois transportes:

### Iniciar o servidor

```bash
cd dio_explorer/mcp
node src/index.js
# Servidor sobe na porta 3131
```

### Variáveis de ambiente

| Variável | Padrão | Descrição |
|---|---|---|
| `PORT` | `3131` | Porta HTTP |
| `DIO_API_KEY` | _(vazio)_ | Chave de autenticação (opcional) |

```bash
# Com autenticação
DIO_API_KEY=minha-chave node src/index.js

# Porta customizada
PORT=8080 node src/index.js
```

### Endpoints

| Método | Rota | Protocolo |
|---|---|---|
| `POST` | `/mcp` | Streamable HTTP MCP 2025-03-26 |
| `GET` | `/sse` | SSE legacy MCP 2024-11-05 |
| `POST` | `/message?sessionId=<id>` | Mensagens SSE |
| `GET` | `/health` | Health-check |
| `GET` | `/tools` | Catálogo REST |

### Ferramentas MCP

| Tool | Parâmetros | Descrição |
|---|---|---|
| `buscar_trilha` | `tecnologia: string` | Plano de estudos da trilha |
| `listar_trilhas` | _(nenhum)_ | Catálogo completo |
| `gerar_desafio` | `tecnologia, nivel` | Desafio de código |
| `gerar_certificado` | `nome_aluno, curso` | Emite certificado |

### Exemplo com curl

```bash
# Health check
curl http://localhost:3131/health

# Inicializar sessão MCP
curl -X POST http://localhost:3131/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc":"2.0","id":1,"method":"initialize",
    "params":{
      "protocolVersion":"2025-03-26",
      "capabilities":{},
      "clientInfo":{"name":"test","version":"1.0"}
    }
  }'
```

---

## 🤖 Skills do Bob

Skills customizadas registradas no IBM Bob para uso direto no chat:

| Skill | Arquivo | Ativação |
|---|---|---|
| `/trilha` | `.bob/skills/trilha/SKILL.md` | Digitar `/trilha <tecnologia>` |
| `/desafio` | `.bob/skills/desafio/SKILL.md` | Digitar `/desafio <tecnologia> <nivel>` |
| `/certificado` | `.bob/skills/certificado/SKILL.md` | Digitar `/certificado <nome> <curso>` |

As skills instruem o Bob a ler o `trilhas_dio.json`, formatar a saída em Markdown e salvar arquivos automaticamente.

---

## 🧪 Testes Unitários

### Executar os testes

```bash
cd dio_explorer
$env:NODE_OPTIONS='--experimental-vm-modules'
& "C:\Program Files\nodejs\node.exe" ".\node_modules\jest\bin\jest.js" --coverage --verbose
```

### Resultado

| Métrica | Resultado | Meta |
|---|---|---|
| Testes passando | **37 / 37** | — |
| Statements | **99.36%** | 70% ✅ |
| Branches | **93.75%** | 60% ✅ |
| Funções | **100%** | 70% ✅ |
| Linhas | **100%** | 70% ✅ |

### Blocos testados

| Bloco | Testes | Cobertura |
|---|---|---|
| JSON de trilhas | 4 | Integridade do catálogo |
| `/trilha Java` | 8 | Busca, output, edge cases |
| `/desafio Java` | 10 | Todos os níveis, acentos, erros |
| `/certificado` (aluno fictício) | 9 | ID, data, arquivo .md, fallback |
| Utilitários internos | 6 | `slugify`, `gerarId` |

---

## 📊 Dados — Catálogo de Trilhas

O arquivo `dio_explorer/data/trilhas_dio.json` contém **30 trilhas** cobrindo:

- Linguagens: Python, JavaScript, TypeScript, Java, C#, Go, Rust, PHP, Kotlin, Swift
- Frontend: React, Vue.js, Angular, Next.js
- Backend: Node.js, Spring Boot, .NET, Django, Laravel
- Cloud: AWS, Azure, GCP
- Dados: Data Science, Machine Learning, IA Generativa, Power BI
- DevOps: Docker, Kubernetes, CI/CD
- Mobile: Flutter, React Native, iOS, Android

Cada trilha contém: `id`, `nome`, `nivel`, `duracao_horas`, `tecnologias`, `conteudo` (módulos) e `projetos`.

---

## 💬 Prompts Utilizados

Veja o arquivo [PROMPTS.md](./PROMPTS.md) com todos os prompts usados durante o desenvolvimento com o IBM Bob.

---

## 🛠️ Tecnologias

| Tecnologia | Uso |
|---|---|
| Node.js v24 | Runtime da CLI e do servidor MCP |
| Express.js v5 | Servidor HTTP do MCP Server |
| `@modelcontextprotocol/sdk` | Protocolo MCP (Streamable HTTP + SSE) |
| Zod v4 | Validação de schemas das tools MCP |
| Jest v30 | Testes unitários com cobertura |
| IBM Bob | Assistente de desenvolvimento + Skills |

---

## 👤 Autor

**Marcos Luciano**
- GitHub: [@markosluciano](https://github.com/markosluciano)
- DIO: [dio.me](https://www.dio.me)

---

> Projeto desenvolvido para a **Formação Final DIO com Bob (IBM)**
> *"Aprenda, pratique e certifique-se — a jornada é sua!"* 🚀
