import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

function carregarTrilhas() {
  const caminho = resolve(__dirname, '../data/trilhas_dio.json');
  const conteudo = readFileSync(caminho, 'utf-8');
  return JSON.parse(conteudo).trilhas;
}

function buscarTrilha(tecnologia) {
  const trilhas = carregarTrilhas();
  const termo = tecnologia.toLowerCase();
  return trilhas.find(
    (t) =>
      t.nome.toLowerCase().includes(termo) ||
      t.tecnologias.some((tech) => tech.toLowerCase().includes(termo))
  );
}

function listarTrilhasDisponiveis() {
  const trilhas = carregarTrilhas();
  console.log('\n📋 Trilhas disponíveis:\n');
  trilhas.forEach((t) => {
    console.log(`  [${String(t.id).padStart(2, '0')}] ${t.nome}`);
    console.log(`       Tecnologias: ${t.tecnologias.join(', ')}\n`);
  });
}

export function executarTrilha(args) {
  const tecnologia = args.join(' ');

  if (!tecnologia) {
    console.log('\n⚠️  Uso: /trilha <tecnologia>\n');
    console.log('  Exemplo: /trilha Python');
    console.log('  Exemplo: /trilha React\n');
    listarTrilhasDisponiveis();
    return;
  }

  const trilha = buscarTrilha(tecnologia);

  if (!trilha) {
    console.log(`\n❌ Nenhuma trilha encontrada para: "${tecnologia}"\n`);
    listarTrilhasDisponiveis();
    return;
  }

  const separador = '─'.repeat(50);

  console.log(`\n${separador}`);
  console.log(`📚  PLANO DE ESTUDOS — ${trilha.nome.toUpperCase()}`);
  console.log(`${separador}\n`);
  console.log(`🎯  Nível          : ${trilha.nivel}`);
  console.log(`⏱️   Duração        : ${trilha.duracao_horas} horas`);
  console.log(`🛠️   Tecnologias    : ${trilha.tecnologias.join(', ')}`);
  console.log(`\n${separador}`);
  console.log('🗂️   MÓDULOS DA TRILHA\n');
  trilha.conteudo.forEach((modulo, i) => {
    console.log(`  ${i + 1}. ${modulo}`);
  });
  console.log(`\n${separador}`);
  console.log('🚀  PROJETOS PRÁTICOS\n');
  trilha.projetos.forEach((projeto) => {
    console.log(`  🔹 ${projeto}`);
  });
  console.log(`\n${separador}`);
  console.log('💡  Dica: Conclua cada módulo antes de avançar para o próximo.');
  console.log('    Pratique os projetos para consolidar o aprendizado!');
  console.log(`${separador}\n`);
}
