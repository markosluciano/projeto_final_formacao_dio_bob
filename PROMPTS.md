# 💬 PROMPTS.md — Registro de Prompts Utilizados

> Documento que registra todos os prompts utilizados com o **IBM Bob** durante o desenvolvimento do projeto final da Formação DIO.
> Serve como referência de engenharia de prompts e histórico do processo de desenvolvimento assistido por IA.

---

## Índice

1. [Skill /trilha](#1-skill-trilha)
2. [Skill /desafio](#2-skill-desafio)
3. [Skill /certificado](#3-skill-certificado)
4. [Execução da Skill /trilha — Python](#4-execução-da-skill-trilha--python)
5. [Execução da Skill /trilha — Java](#5-execução-da-skill-trilha--java)
6. [Execução da Skill /certificado — Java](#6-execução-da-skill-certificado--java)
7. [Visualização da Árvore do Projeto](#7-visualização-da-árvore-do-projeto)
8. [Testes Unitários com Cobertura](#8-testes-unitários-com-cobertura)
9. [Criação do MCP Server HTTP](#9-criação-do-mcp-server-http)
10. [Documentação e Push para o Repositório](#10-documentação-e-push-para-o-repositório)

---

## 1. Skill /trilha

**Prompt enviado ao Bob:**

```
---
name: trilha
description: Use quando o usuário digitar /trilha <tecnologia> para exibir o plano de estudos formatado da trilha DIO correspondente.
metadata:
  argument-hint: "<tecnologia>"
---

# /trilha — Plano de Estudos DIO

O usuário quer ver o plano de estudos de uma trilha da DIO.

## Passos

1. Leia o arquivo `dio_explorer/data/trilhas_dio.json` com a ferramenta `read_file`.
2. Extraia o argumento `<tecnologia>` fornecido pelo usuário após `/trilha`.
3. Busque no JSON a trilha cujo campo `nome` ou `tecnologias` contenha o termo informado (busca case-insensitive).
4. **Se encontrar a trilha**, responda no seguinte formato Markdown: [template de saída]
5. **Se não encontrar**, liste os nomes de todas as trilhas disponíveis no JSON e sugira as mais próximas do termo buscado.

Python
```

**Objetivo:** Registrar a skill no Bob e executar o comando `/trilha Python` para validar o fluxo completo.

**Resultado:** Bob leu o `trilhas_dio.json`, encontrou a trilha "Formação Python Developer" e exibiu o plano de estudos formatado com módulos e projetos práticos.

---

## 2. Skill /desafio

**Prompt enviado ao Bob:**

```
---
name: desafio
description: Use quando o usuário digitar /desafio <tecnologia> <nivel> para gerar um desafio de código aleatório baseado no nível e tecnologia escolhidos.
metadata:
  argument-hint: "<tecnologia> <nivel>"
---

# /desafio — Gerador de Desafio de Código

[instrução completa com banco de desafios por nível: iniciante, intermediário, avançado]

[template de saída com ID, título, descrição, requisitos, critérios, dicas, como entregar]
```

**Objetivo:** Criar a skill que gera desafios de código aleatórios adaptados por tecnologia e nível.

**Resultado:** Skill registrada em `.bob/skills/desafio/SKILL.md`. Bob seleciona aleatoriamente um desafio do banco interno e adapta a descrição para a tecnologia informada.

---

## 3. Skill /certificado

**Prompt enviado ao Bob:**

```
---
name: certificado
description: Use quando o usuário digitar /certificado <nome> <curso> para gerar um certificado fictício em Markdown com nome do aluno e curso realizado.
metadata:
  argument-hint: "<nome do aluno> <curso>"
---

# /certificado — Gerador de Certificado Fictício

## Passos

1. Extraia os argumentos `<nome do aluno>` e `<curso>`.
2. Leia o arquivo `dio_explorer/data/trilhas_dio.json`.
3. Busque a trilha correspondente ao curso.
4. Gere data atual (DD/MM/AAAA) e ID no formato `DIO-{ANO}-{4 hex maiúsculos}`.
5. Responda com o certificado formatado em Markdown (template completo).
6. Salve em `dio_explorer/docs/certificados-emitidos/{slug_nome}_{slug_curso}.md`.

Marcos Lucioano, Java
```

**Objetivo:** Criar a skill que emite certificados fictícios e os salva como arquivo Markdown.

**Resultado:** Skill registrada, certificado gerado com ID `DIO-2025-03BD`, data `23/07/2025`, e arquivo salvo em `docs/certificados-emitidos/marcos_luciano_formacao_java_developer.md`.

---

## 4. Execução da Skill /trilha — Python

**Prompt enviado ao Bob:**

```
/trilha Python
```

**Resultado obtido:**

```markdown
# 📚 Plano de Estudos — Formação Python Developer

**Nível:** Básico ao Avançado
**Duração estimada:** 64 horas
**Tecnologias:** Python, Flask, Django, SQL

## 🗂️ Módulos da Trilha
| # | Módulo |
|---|--------|
| 1 | Fundamentos de Python |
| 2 | Orientação a Objetos com Python |
| 3 | Consumo de APIs REST |
| 4 | Desenvolvimento Web com Flask |
| 5 | Banco de Dados com SQLAlchemy |

## 🛠️ Projetos Práticos
- 🔹 Sistema de cadastro de usuários
- 🔹 API RESTful com Flask
- 🔹 Web scraping com BeautifulSoup
```

---

## 5. Execução da Skill /trilha — Java

**Prompt enviado ao Bob:**

Acionado automaticamente durante a geração do certificado Java.

**Resultado:** Trilha "Formação Java Developer" encontrada — 80h, nívelBásico ao Avançado, tecnologias: Java, Spring Boot, Maven, Hibernate.

---

## 6. Execução da Skill /certificado — Java

**Prompt enviado ao Bob:**

```
/certificado Marcos Lucioano, Java
```

**Resultado obtido:**

```markdown
# 🏆 CERTIFICADO DE CONCLUSÃO
### DIO — Digital Innovation One

**Certificamos que**
# MARCOS LUCIANO

**concluiu com êxito o curso**
## Formação Java Developer

com carga horária de **80 horas**,
abrangendo os conteúdos de **Java, Spring Boot, Maven, Hibernate**.

| Campo | Informação |
|---|---|
| 📅 Data de Emissão | 23/07/2025 |
| 🔑 ID do Certificado | DIO-2025-03BD |
| 🎓 Nível | Básico ao Avançado |
| ⏱️ Carga Horária | 80h |
| 🏫 Instituição | Digital Innovation One — DIO |
```

Arquivo salvo em: `dio_explorer/docs/certificados-emitidos/marcos_luciano_formacao_java_developer.md`

---

## 7. Visualização da Árvore do Projeto

**Prompt enviado ao Bob:**

```
agora mostre a arvove do projeto
```

**Resultado:** Bob executou `Get-ChildItem -Recurse` filtrando `.git/` e exibiu a árvore completa com emojis de pasta/arquivo, além de uma tabela-resumo das pastas principais e seus propósitos.

---

## 8. Testes Unitários com Cobertura

**Prompt enviado ao Bob:**

```
ok, agora crie um arquivo de teste unitario e teste o fluxo para atingir
uma cobertura de 70% de aprovação. Teste os comandos /trilha de Java e
gere um desafio de codigo e depois o certificado para uma aluno ficticio.
Salve os resultados em um txt e depois mostre o resultado
```

**O que Bob fez:**

1. Leu todos os arquivos `src/` para entender as funções exportadas
2. Criou `dio_explorer/test/dio_explorer.test.js` com **37 testes em 5 blocos**:
   - Bloco 1: Integridade do JSON de trilhas (4 testes)
   - Bloco 2: `/trilha Java` — output, busca case-insensitive, edge cases (8 testes)
   - Bloco 3: `/desafio Java` — 3 níveis, acentos, erros (10 testes)
   - Bloco 4: `/certificado Ana Ficticia Java` — ID, data, arquivo, fallback (9 testes)
   - Bloco 5: Utilitários `slugify` e `gerarId` (6 testes)
3. Configurou Jest com `--experimental-vm-modules` para suporte a ES Modules
4. Executou os testes, corrigiu 1 falha (padrão `/hora/` → `/tempo estimado/i`)
5. Resultado final: **37/37 ✅ · 99.36% cobertura**
6. Salvou o relatório em `dio_explorer/test/resultado_testes.txt`

**Resultado:**

```
Test Suites: 1 passed, 1 total
Tests:       37 passed, 37 total
Coverage:    99.36% statements · 93.75% branches · 100% functions · 100% lines
```

---

## 9. Criação do MCP Server HTTP

**Prompt enviado ao Bob:**

```
Bob, agora crie um MCP SERVER na pasta mcp para que outras pessoas possa
acessar por meio de um servidor http ou sso ou via API
```

**O que Bob fez:**

1. Ativou a skill `build-mcp-server` para seguir o guia oficial
2. Leu todos os arquivos `src/` para reutilizar a lógica existente
3. Criou `dio_explorer/mcp/` com:
   - `package.json` com dependências: `@modelcontextprotocol/sdk`, `express`, `cors`, `zod`
   - `src/index.js` — servidor Express com dois transportes:
     - **Streamable HTTP** (protocolo MCP 2025-03-26) em `POST /mcp`
     - **SSE legacy** (protocolo MCP 2024-11-05) em `GET /sse`
   - `src/tools/trilha.js` — tool `buscar_trilha`
   - `src/tools/desafio.js` — tool `gerar_desafio`
   - `src/tools/certificado.js` — tool `gerar_certificado`
   - `src/tools/listar_trilhas.js` — tool `listar_trilhas`
   - `README.md` com documentação completa + exemplos curl
4. Instalou dependências via `npm install`
5. Validou sintaxe de todos os arquivos com `node --check`
6. Testou o servidor em background — health-check retornou `status: "ok"`
7. Registrou o servidor em `.bob/mcp.json` para uso direto no Bob

**Resultado:** Servidor MCP HTTP funcional na porta 3131 com autenticação opcional via `DIO_API_KEY`.

---

## 10. Documentação e Push para o Repositório

**Prompt enviado ao Bob:**

```
agora para finalizar, faca a documentação completa do projeto. com tudo
que foi feito, incluindo os prompts utilizados e faça a atualização no
repositório remoto
```

**O que Bob fez:**

1. Leu todos os arquivos relevantes do projeto (README, commands, skills, package.json)
2. Verificou o histórico de commits com `git log`
3. Escreveu:
   - `README.md` — documentação completa do projeto
   - `PROMPTS.md` — este arquivo (registro de todos os prompts)
   - `CHANGELOG.md` — histórico de versões
   - `dio_explorer/README.md` — documentação atualizada da subpasta
4. Executou `git add`, `git commit` e `git push` para o repositório remoto

---

## 🧠 Lições de Engenharia de Prompts

### O que funcionou bem

| Técnica | Exemplo |
|---|---|
| **Frontmatter estruturado** | Usar `name:`, `description:` e `metadata:` nas skills facilita o roteamento automático do Bob |
| **Passos numerados** | Decompor a tarefa em passos claros (1. ler arquivo, 2. extrair argumento...) aumenta a precisão |
| **Templates de saída** | Incluir o formato exato de resposta no prompt garante consistência |
| **Incluir exemplo no prompt** | Terminar o prompt com o argumento real (ex: `Python`, `Java`) dispara a execução imediata |
| **Prompts de ação direta** | Frases curtas e diretas ("crie um MCP SERVER") funcionam melhor que descrições longas |

### O que ajustar

| Situação | Ajuste |
|---|---|
| Teste com padrão muito específico | Usar padrões mais genéricos em `toMatch()` para evitar falhas por aleatoriedade |
| Skill com múltiplos argumentos | Especificar claramente a separação (vírgula, espaço) para evitar ambiguidade no parsing |

---

> *Documento gerado como parte do Projeto Final da Formação DIO com Bob (IBM)*
> *Data: 23/07/2025*
