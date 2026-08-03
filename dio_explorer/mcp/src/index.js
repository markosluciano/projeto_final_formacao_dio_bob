#!/usr/bin/env node
/**
 * ============================================================
 *  DIO Explorer — MCP Server
 *  Transport : HTTP (Streamable HTTP + SSE legacy)
 *  Port      : process.env.PORT || 3131
 *
 *  Endpoints públicos
 *    POST /mcp          → Streamable HTTP (MCP 2025-03-26)
 *    GET  /sse          → SSE legacy (MCP 2024-11-05)
 *    POST /message      → mensagens do cliente SSE
 *    GET  /health       → health-check JSON
 *    GET  /tools        → lista de ferramentas (REST simples)
 * ============================================================
 */

import express from 'express';
import cors from 'cors';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';
import { randomUUID } from 'crypto';

import { registerTrilha }        from './tools/trilha.js';
import { registerDesafio }       from './tools/desafio.js';
import { registerCertificado }   from './tools/certificado.js';
import { registerListarTrilhas } from './tools/listar_trilhas.js';

const PORT = parseInt(process.env.PORT || '3131', 10);
const API_KEY = process.env.DIO_API_KEY || null; // opcional

// ── cria e registra ferramentas ─────────────────────────────
function criarServidor() {
  const server = new McpServer({
    name: 'dio-explorer',
    version: '1.0.0',
  });

  registerTrilha(server);
  registerDesafio(server);
  registerCertificado(server);
  registerListarTrilhas(server);

  return server;
}

// ── middleware de autenticação opcional ─────────────────────
function authMiddleware(req, res, next) {
  if (!API_KEY) return next(); // sem chave configurada = aberto
  const header = req.headers['x-api-key'] || req.headers['authorization']?.replace('Bearer ', '');
  if (header !== API_KEY) {
    return res.status(401).json({ error: 'Unauthorized — forneça a chave via X-Api-Key ou Authorization: Bearer <chave>' });
  }
  next();
}

// ── express ─────────────────────────────────────────────────
const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Api-Key', 'mcp-session-id'],
  exposedHeaders: ['mcp-session-id'],
}));
app.use(express.json());

// ── sessões Streamable HTTP (stateful) ──────────────────────
const sessions = new Map(); // sessionId → { transport, server }

// POST /mcp — Streamable HTTP Transport (protocolo 2025-03-26)
app.post('/mcp', authMiddleware, async (req, res) => {
  const sessionId = req.headers['mcp-session-id'];

  // sessão existente
  if (sessionId && sessions.has(sessionId)) {
    const { transport } = sessions.get(sessionId);
    await transport.handleRequest(req, res, req.body);
    return;
  }

  // nova sessão
  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: () => randomUUID(),
    onsessioninitialized: (id) => {
      sessions.set(id, { transport, server: mcpServer });
      console.error(`[MCP] Nova sessão Streamable: ${id}`);
    },
  });

  transport.onclose = () => {
    if (transport.sessionId) {
      sessions.delete(transport.sessionId);
      console.error(`[MCP] Sessão encerrada: ${transport.sessionId}`);
    }
  };

  const mcpServer = criarServidor();
  await mcpServer.connect(transport);
  await transport.handleRequest(req, res, req.body);
});

// GET/DELETE /mcp — operações de sessão
app.get('/mcp', authMiddleware, async (req, res) => {
  const sessionId = req.headers['mcp-session-id'];
  if (!sessionId || !sessions.has(sessionId)) {
    return res.status(404).json({ error: 'Sessão não encontrada' });
  }
  const { transport } = sessions.get(sessionId);
  await transport.handleRequest(req, res);
});

app.delete('/mcp', authMiddleware, async (req, res) => {
  const sessionId = req.headers['mcp-session-id'];
  if (!sessionId || !sessions.has(sessionId)) {
    return res.status(404).json({ error: 'Sessão não encontrada' });
  }
  const { transport } = sessions.get(sessionId);
  await transport.handleRequest(req, res);
  sessions.delete(sessionId);
});

// ── SSE legacy (protocolo 2024-11-05) ───────────────────────
const sseClients = new Map(); // sessionId → SSEServerTransport

app.get('/sse', authMiddleware, async (req, res) => {
  const transport = new SSEServerTransport('/message', res);
  const mcpServer = criarServidor();

  sseClients.set(transport.sessionId, transport);
  console.error(`[MCP] Nova conexão SSE: ${transport.sessionId}`);

  transport.onclose = () => {
    sseClients.delete(transport.sessionId);
    console.error(`[MCP] SSE desconectado: ${transport.sessionId}`);
  };

  await mcpServer.connect(transport);
  await transport.start();
});

app.post('/message', authMiddleware, async (req, res) => {
  const sessionId = req.query.sessionId;
  const transport = sseClients.get(sessionId);
  if (!transport) {
    return res.status(404).json({ error: 'Sessão SSE não encontrada' });
  }
  await transport.handlePostMessage(req, res, req.body);
});

// ── REST helper — health & lista de tools ───────────────────
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    server: 'dio-explorer-mcp',
    version: '1.0.0',
    auth: API_KEY ? 'required (X-Api-Key)' : 'open',
    sessions: {
      streamable: sessions.size,
      sse: sseClients.size,
    },
    endpoints: {
      mcp_streamable: 'POST /mcp',
      mcp_sse_connect: 'GET /sse',
      mcp_sse_message: 'POST /message?sessionId=<id>',
      health: 'GET /health',
      tools: 'GET /tools',
    },
  });
});

app.get('/tools', (_req, res) => {
  res.json({
    tools: [
      {
        name: 'buscar_trilha',
        description: 'Busca o plano de estudos de uma trilha DIO pelo nome da tecnologia.',
        parameters: { tecnologia: 'string — ex: Java, Python, React' },
        example: { tecnologia: 'Java' },
      },
      {
        name: 'listar_trilhas',
        description: 'Lista todas as trilhas disponíveis no catálogo DIO.',
        parameters: {},
        example: {},
      },
      {
        name: 'gerar_desafio',
        description: 'Gera um desafio de código aleatório para uma tecnologia e nível.',
        parameters: {
          tecnologia: 'string — ex: Java, Python',
          nivel: 'string — iniciante | intermediario | avancado',
        },
        example: { tecnologia: 'Java', nivel: 'intermediario' },
      },
      {
        name: 'gerar_certificado',
        description: 'Gera um certificado fictício de conclusão de curso DIO.',
        parameters: {
          nome_aluno: 'string — nome completo do aluno',
          curso: 'string — nome ou tecnologia do curso',
        },
        example: { nome_aluno: 'Ana Silva', curso: 'Python' },
      },
    ],
  });
});

// 404 catch-all
app.use((_req, res) => {
  res.status(404).json({ error: 'Rota não encontrada. Acesse GET /health para ver os endpoints disponíveis.' });
});

// ── start ────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.error(`╔══════════════════════════════════════════════════════╗`);
  console.error(`║         🚀  DIO Explorer MCP Server                  ║`);
  console.error(`╠══════════════════════════════════════════════════════╣`);
  console.error(`║  HTTP (Streamable) : http://localhost:${PORT}/mcp        ║`);
  console.error(`║  SSE (legacy)      : http://localhost:${PORT}/sse        ║`);
  console.error(`║  Health check      : http://localhost:${PORT}/health     ║`);
  console.error(`║  Tools catalog     : http://localhost:${PORT}/tools      ║`);
  console.error(`║  Auth              : ${API_KEY ? 'X-Api-Key: ***' : 'aberto (sem API_KEY)'}              ║`);
  console.error(`╚══════════════════════════════════════════════════════╝`);
});
