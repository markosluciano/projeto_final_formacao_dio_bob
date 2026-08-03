# CHANGELOG

Todas as mudanças notáveis neste projeto estão documentadas aqui.
Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/).

---

## [1.3.0] — 2025-07-23

### Adicionado
- **Documentação completa** do projeto (`README.md`, `PROMPTS.md`, `CHANGELOG.md`)
- Registro de todos os prompts utilizados com o IBM Bob em `PROMPTS.md`
- Seção de lições de engenharia de prompts
- Atualização do `dio_explorer/README.md` com guia completo de uso

---

## [1.2.0] — 2025-07-23

### Adicionado
- **MCP Server HTTP** em `dio_explorer/mcp/` com dois transportes:
  - Streamable HTTP (protocolo MCP 2025-03-26) — `POST /mcp`
  - SSE legacy (protocolo MCP 2024-11-05) — `GET /sse`
- 4 ferramentas MCP: `buscar_trilha`, `listar_trilhas`, `gerar_desafio`, `gerar_certificado`
- Autenticação opcional via variável `DIO_API_KEY` (header `X-Api-Key`)
- Endpoints REST auxiliares: `GET /health` e `GET /tools`
- Gestão de sessões stateful para o transporte Streamable HTTP
- Registro do servidor em `.bob/mcp.json` (escopo do workspace)
- `dio_explorer/mcp/README.md` com documentação completa e exemplos curl

### Dependências adicionadas (mcp/)
- `@modelcontextprotocol/sdk` v1.30.0
- `express` v5.2.1
- `cors` v2.8.6
- `zod` v4.4.3

---

## [1.1.0] — 2025-07-23

### Adicionado
- **Testes unitários** em `dio_explorer/test/dio_explorer.test.js` com 37 casos de teste
- Cobertura de código de **99.36%** (meta mínima: 70%)
- 5 blocos de testes:
  - Bloco 1: Integridade do JSON de trilhas
  - Bloco 2: Comando `/trilha Java` (8 testes)
  - Bloco 3: Comando `/desafio Java` — todos os níveis (10 testes)
  - Bloco 4: Comando `/certificado` com aluno fictício (9 testes)
  - Bloco 5: Utilitários internos `slugify` e `gerarId` (6 testes)
- Relatório de testes salvo em `dio_explorer/test/resultado_testes.txt`
- Configuração do Jest com suporte a ES Modules (`--experimental-vm-modules`)

### Dependências adicionadas (devDependencies)
- `jest` v30.4.2

---

## [1.0.0] — 2025-07-09

### Adicionado
- Estrutura inicial do projeto `dio_explorer/`
- **Catálogo de trilhas** `data/trilhas_dio.json` com 30 trilhas DIO cobrindo:
  - Linguagens: Python, JavaScript, TypeScript, Java, C#, Go, Rust, PHP, Kotlin, Swift
  - Frontend: React, Vue.js, Angular, Next.js
  - Backend: Node.js, Spring Boot, .NET, Django, Laravel
  - Cloud: AWS, Azure, GCP
  - Dados: Data Science, Machine Learning, IA Generativa, Power BI
  - DevOps: Docker, Kubernetes, CI/CD
  - Mobile: Flutter, React Native, iOS, Android
- **CLI em Node.js** com três slash commands:
  - `src/trilha.js` — `/trilha <tecnologia>`
  - `src/desafio.js` — `/desafio <tecnologia> <nivel>`
  - `src/certificado.js` — `/certificado <nome> <curso>`
  - `src/index.js` — roteador principal
- **Bob Skills** para uso direto no chat:
  - `.bob/skills/trilha/SKILL.md`
  - `.bob/skills/desafio/SKILL.md`
  - `.bob/skills/certificado/SKILL.md`
- Documentação dos comandos em `commands/`
- Certificado gerado e salvo: `docs/certificados-emitidos/marcos_luciano_formacao_java_developer.md`
- `.bobignore` com regras para ignorar `node_modules/`, `.env`, certificados e arquivos temporários

---

## [0.1.0] — 2025-07-09

### Adicionado
- Inicialização do repositório
- `hello_world.md`
- Estrutura de pastas do projeto

---

> Projeto desenvolvido como trabalho final da **Formação DIO com Bob (IBM)**
