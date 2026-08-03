# DIO Explorer — MCP Server

Servidor MCP (Model Context Protocol) que expõe as ferramentas do DIO Explorer via **HTTP**, permitindo integração com qualquer cliente MCP ou chamada direta via API REST.

---

## 🚀 Como iniciar

```bash
cd dio_explorer/mcp
node src/index.js
```

O servidor sobe na porta **3131** (configurável via variável de ambiente `PORT`).

---

## 🔌 Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/mcp` | **Streamable HTTP** — protocolo MCP 2025-03-26 (recomendado) |
| `GET` | `/sse` | **SSE** — protocolo MCP 2024-11-05 (legado/compatibilidade) |
| `POST` | `/message?sessionId=<id>` | Mensagens para sessão SSE ativa |
| `GET` | `/health` | Health-check com status das sessões |
| `GET` | `/tools` | Catálogo de ferramentas em JSON |

---

## 🛠️ Ferramentas disponíveis

### `buscar_trilha`
Busca o plano de estudos completo de uma trilha DIO.

```json
{
  "method": "tools/call",
  "params": {
    "name": "buscar_trilha",
    "arguments": { "tecnologia": "Java" }
  }
}
```

### `listar_trilhas`
Lista todas as trilhas disponíveis no catálogo.

```json
{
  "method": "tools/call",
  "params": {
    "name": "listar_trilhas",
    "arguments": {}
  }
}
```

### `gerar_desafio`
Gera um desafio de código aleatório para uma tecnologia e nível.

```json
{
  "method": "tools/call",
  "params": {
    "name": "gerar_desafio",
    "arguments": {
      "tecnologia": "Java",
      "nivel": "intermediario"
    }
  }
}
```

Níveis aceitos: `iniciante` | `intermediario` | `avancado`

### `gerar_certificado`
Gera um certificado fictício de conclusão e salva como arquivo `.md`.

```json
{
  "method": "tools/call",
  "params": {
    "name": "gerar_certificado",
    "arguments": {
      "nome_aluno": "Ana Silva",
      "curso": "Java"
    }
  }
}
```

---

## 🔐 Autenticação (opcional)

Por padrão o servidor é **aberto**. Para proteger com API Key:

```bash
DIO_API_KEY=minha-chave-secreta node src/index.js
```

Clientes devem enviar o header:
```
X-Api-Key: minha-chave-secreta
# ou
Authorization: Bearer minha-chave-secreta
```

---

## 🌐 Integração com cliente MCP via HTTP

### Exemplo com `curl` — Streamable HTTP

```bash
# 1. Inicializar sessão
curl -X POST http://localhost:3131/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "initialize",
    "params": {
      "protocolVersion": "2025-03-26",
      "capabilities": {},
      "clientInfo": { "name": "test-client", "version": "1.0" }
    }
  }'

# 2. Chamar a ferramenta buscar_trilha
curl -X POST http://localhost:3131/mcp \
  -H "Content-Type: application/json" \
  -H "mcp-session-id: <session-id-retornado-acima>" \
  -d '{
    "jsonrpc": "2.0",
    "id": 2,
    "method": "tools/call",
    "params": {
      "name": "buscar_trilha",
      "arguments": { "tecnologia": "Java" }
    }
  }'
```

### Exemplo com SSE (legado)

```bash
# Abrir conexão SSE (mantém aberta)
curl -N http://localhost:3131/sse

# Em outro terminal, enviar mensagem
curl -X POST "http://localhost:3131/message?sessionId=<id>" \
  -H "Content-Type: application/json" \
  -d '{ "jsonrpc": "2.0", "id": 1, "method": "tools/list", "params": {} }'
```

---

## ⚙️ Variáveis de ambiente

| Variável | Padrão | Descrição |
|----------|--------|-----------|
| `PORT` | `3131` | Porta HTTP do servidor |
| `DIO_API_KEY` | _(vazio)_ | Chave para autenticação. Se não definida, o servidor fica aberto |

---

## 📁 Estrutura

```
mcp/
├── src/
│   ├── index.js              ← entrada do servidor HTTP MCP
│   └── tools/
│       ├── trilha.js         ← tool: buscar_trilha
│       ├── desafio.js        ← tool: gerar_desafio
│       ├── certificado.js    ← tool: gerar_certificado
│       └── listar_trilhas.js ← tool: listar_trilhas
├── package.json
└── README.md
```

---

## 🤖 Registro no Bob (mcp.json)

Para usar diretamente no Bob como MCP server local (stdio):

```json
{
  "mcpServers": {
    "dio-explorer": {
      "command": "node",
      "args": ["<caminho-absoluto>/dio_explorer/mcp/src/index.js"],
      "env": {
        "PORT": "3131",
        "DIO_API_KEY": ""
      }
    }
  }
}
```

Ou como servidor remoto (se hospedado):

```json
{
  "mcpServers": {
    "dio-explorer-remote": {
      "url": "http://localhost:3131/mcp"
    }
  }
}
```

---

> Feito com ❤️ por **markosluciano** | DIO — Digital Innovation One
