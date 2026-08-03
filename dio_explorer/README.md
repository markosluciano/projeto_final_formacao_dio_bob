# DIO Explorer

CLI e MCP Server para explorar trilhas de aprendizado, gerar desafios de código e emitir certificados fictícios da [DIO — Digital Innovation One](https://www.dio.me).

> Parte do **Projeto Final da Formação DIO com Bob (IBM)**.
> Documentação completa: [README.md raiz](../README.md)

---

## 🗂️ Estrutura

```
dio_explorer/
├── src/                        ← CLI em Node.js
│   ├── index.js                ← roteador de slash commands
│   ├── trilha.js               ← lógica do /trilha
│   ├── desafio.js              ← lógica do /desafio
│   └── certificado.js          ← lógica do /certificado
│
├── data/
│   └── trilhas_dio.json        ← catálogo com 30 trilhas DIO
│
├── commands/                   ← documentação dos slash commands
│   ├── README.md
│   ├── trilha.md
│   ├── desafio.md
│   └── certificado.md
│
├── docs/
│   └── certificados-emitidos/  ← certificados gerados (gitignored)
│
├── test/
│   ├── dio_explorer.test.js    ← 37 testes unitários (Jest)
│   └── resultado_testes.txt    ← relatório de cobertura
│
├── mcp/                        ← MCP Server HTTP
│   ├── package.json
│   ├── README.md               ← documentação do MCP Server
│   └── src/
│       ├── index.js            ← servidor Express + Streamable HTTP + SSE
│       └── tools/
│           ├── trilha.js
│           ├── desafio.js
│           ├── certificado.js
│           └── listar_trilhas.js
│
└── package.json
```

---

## ⚡ Uso rápido — CLI

```bash
# Instalar dependências
npm install

# Plano de estudos Java
node src/index.js /trilha Java

# Desafio Python nível intermediário
node src/index.js /desafio Python intermediario

# Certificado fictício
node src/index.js /certificado "Ana Silva" "React"

# Ajuda
node src/index.js /ajuda
```

---

## 🌐 MCP Server

```bash
cd mcp && npm install
node src/index.js
# → http://localhost:3131
```

Ver [`mcp/README.md`](mcp/README.md) para documentação completa.

---

## 🧪 Testes

```bash
$env:NODE_OPTIONS='--experimental-vm-modules'
& "C:\Program Files\nodejs\node.exe" ".\node_modules\jest\bin\jest.js" --coverage --verbose
```

**Resultado:** 37/37 testes passando · 99.36% cobertura.

---

## 📊 Trilhas disponíveis

30 trilhas cobrindo Python, JavaScript, TypeScript, Java, C#, Go, Rust, PHP, Kotlin, Swift, React, Vue.js, Angular, Next.js, Node.js, Spring Boot, .NET, Django, Laravel, AWS, Azure, GCP, Data Science, Machine Learning, IA Generativa, Power BI, Docker, Kubernetes, Flutter, React Native.

```bash
node src/index.js /trilha
# lista todas as trilhas disponíveis
```

---

## 📄 Licença

MIT — [Marcos Luciano](https://github.com/markosluciano)
