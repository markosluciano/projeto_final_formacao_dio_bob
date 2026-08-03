#!/usr/bin/env node

import { executarTrilha } from './trilha.js';
import { executarDesafio } from './desafio.js';
import { executarCertificado } from './certificado.js';

const args = process.argv.slice(2);
const comando = args[0];
const resto = args.slice(1);

const AJUDA = `
╔══════════════════════════════════════════════════════╗
║            🚀  DIO EXPLORER — CLI                   ║
╠══════════════════════════════════════════════════════╣
║  Slash commands disponíveis:                         ║
║                                                      ║
║  /trilha <tecnologia>                                ║
║    → Exibe o plano de estudos da trilha              ║
║                                                      ║
║  /desafio <tecnologia> <nivel>                       ║
║    → Gera um desafio de código aleatório             ║
║    → Níveis: iniciante | intermediario | avancado    ║
║                                                      ║
║  /certificado "<nome>" "<curso>"                     ║
║    → Gera um certificado fictício em Markdown        ║
║                                                      ║
║  /ajuda                                              ║
║    → Exibe esta mensagem                             ║
╠══════════════════════════════════════════════════════╣
║  Exemplos:                                           ║
║    node src/index.js /trilha Python                  ║
║    node src/index.js /desafio JavaScript intermediario║
║    node src/index.js /certificado "Ana" "Cloud AWS"  ║
╚══════════════════════════════════════════════════════╝
`;

switch (comando) {
  case '/trilha':
    executarTrilha(resto);
    break;

  case '/desafio':
    executarDesafio(resto);
    break;

  case '/certificado':
    executarCertificado(resto);
    break;

  case '/ajuda':
  case '--help':
  case '-h':
  case undefined:
    console.log(AJUDA);
    break;

  default:
    console.log(`\n❌  Comando desconhecido: "${comando}"`);
    console.log('    Use /ajuda para ver os comandos disponíveis.\n');
    process.exit(1);
}
