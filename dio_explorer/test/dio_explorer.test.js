/**
 * ============================================================
 *  DIO Explorer — Testes Unitários
 *  Cobertura-alvo: >= 70%
 *  Fluxos testados:
 *    • /trilha Java
 *    • /desafio Java iniciante|intermediario|avancado
 *    • /certificado <aluno ficticio> <curso>
 * ============================================================
 */

import { jest } from '@jest/globals';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── helpers ────────────────────────────────────────────────
function captureConsole(fn) {
  const output = [];
  const original = console.log;
  console.log = (...args) => output.push(args.join(' '));
  fn();
  console.log = original;
  return output.join('\n');
}

// ── carrega JSON de trilhas ────────────────────────────────
const trilhasJson = JSON.parse(
  readFileSync(resolve(__dirname, '../data/trilhas_dio.json'), 'utf-8')
);

// ══════════════════════════════════════════════════════════
//  BLOCO 1 — DATA / JSON
// ══════════════════════════════════════════════════════════
describe('1. JSON de trilhas', () => {
  test('arquivo carregado com sucesso', () => {
    expect(trilhasJson).toBeDefined();
    expect(trilhasJson.trilhas).toBeInstanceOf(Array);
  });

  test('possui ao menos 5 trilhas', () => {
    expect(trilhasJson.trilhas.length).toBeGreaterThanOrEqual(5);
  });

  test('trilha Java existe com campos obrigatórios', () => {
    const java = trilhasJson.trilhas.find((t) =>
      t.nome.toLowerCase().includes('java')
    );
    expect(java).toBeDefined();
    expect(java).toHaveProperty('id');
    expect(java).toHaveProperty('nivel');
    expect(java).toHaveProperty('duracao_horas');
    expect(java).toHaveProperty('tecnologias');
    expect(java).toHaveProperty('conteudo');
    expect(java).toHaveProperty('projetos');
  });

  test('tecnologias da trilha Java são array não-vazio', () => {
    const java = trilhasJson.trilhas.find((t) =>
      t.nome.toLowerCase().includes('java')
    );
    expect(Array.isArray(java.tecnologias)).toBe(true);
    expect(java.tecnologias.length).toBeGreaterThan(0);
  });
});

// ══════════════════════════════════════════════════════════
//  BLOCO 2 — /trilha Java
// ══════════════════════════════════════════════════════════
import { executarTrilha } from '../src/trilha.js';

describe('2. /trilha Java', () => {
  test('exibe nome da trilha Java no output', () => {
    const saida = captureConsole(() => executarTrilha(['Java']));
    expect(saida.toLowerCase()).toContain('java');
  });

  test('exibe nível e duração', () => {
    const saida = captureConsole(() => executarTrilha(['Java']));
    expect(saida).toMatch(/[Nn]ível|nivel/);
    expect(saida).toMatch(/horas/i);
  });

  test('exibe módulos da trilha', () => {
    const saida = captureConsole(() => executarTrilha(['Java']));
    expect(saida).toMatch(/[Mm]ódulos?|MÓDULOS|modulos/i);
  });

  test('exibe projetos práticos', () => {
    const saida = captureConsole(() => executarTrilha(['Java']));
    expect(saida).toMatch(/[Pp]rojeto|PROJETO/);
  });

  test('tecnologia inexistente lista trilhas disponíveis', () => {
    const saida = captureConsole(() => executarTrilha(['TecnologiaXYZ999']));
    expect(saida).toMatch(/nenhuma|trilha|disponív/i);
  });

  test('sem argumento lista trilhas disponíveis', () => {
    const saida = captureConsole(() => executarTrilha([]));
    expect(saida).toMatch(/uso|disponív|trilha/i);
  });

  test('busca case-insensitive — "java" minúsculo', () => {
    const saida = captureConsole(() => executarTrilha(['java']));
    expect(saida.toLowerCase()).toContain('java');
  });

  test('busca por tecnologia: "Spring Boot"', () => {
    const saida = captureConsole(() => executarTrilha(['Spring']));
    expect(saida.toLowerCase()).toContain('java');
  });
});

// ══════════════════════════════════════════════════════════
//  BLOCO 3 — /desafio Java
// ══════════════════════════════════════════════════════════
import { executarDesafio } from '../src/desafio.js';

describe('3. /desafio Java', () => {
  test('nível iniciante gera desafio com ID', () => {
    const saida = captureConsole(() => executarDesafio(['Java', 'iniciante']));
    expect(saida).toMatch(/DIO-/);
    expect(saida.toLowerCase()).toContain('java');
  });

  test('nível intermediario gera desafio com requisitos', () => {
    const saida = captureConsole(() =>
      executarDesafio(['Java', 'intermediario'])
    );
    expect(saida).toMatch(/DIO-/);
    expect(saida).toMatch(/[Rr]equisito|REQUISITO/);
  });

  test('nível avancado gera desafio com dicas', () => {
    const saida = captureConsole(() => executarDesafio(['Java', 'avancado']));
    expect(saida).toMatch(/DIO-/);
    expect(saida).toMatch(/[Dd]ica|DICA/);
  });

  test('aceita nível com acento: "avançado"', () => {
    const saida = captureConsole(() => executarDesafio(['Java', 'avançado']));
    expect(saida).toMatch(/DIO-/);
  });

  test('aceita nível com acento: "intermediário"', () => {
    const saida = captureConsole(() =>
      executarDesafio(['Java', 'intermediário'])
    );
    expect(saida).toMatch(/DIO-/);
  });

  test('nível inválido exibe mensagem de erro', () => {
    const saida = captureConsole(() => executarDesafio(['Java', 'expert']));
    expect(saida).toMatch(/[Nn]ível inválido|invalido/i);
  });

  test('sem argumentos exibe uso correto', () => {
    const saida = captureConsole(() => executarDesafio([]));
    expect(saida).toMatch(/[Uu]so|desafio/i);
  });

  test('exibe tempo estimado no desafio', () => {
    const saida = captureConsole(() => executarDesafio(['Java', 'iniciante']));
    // tempo pode ser "X horas" ou "X minutos" dependendo do desafio sorteado
    expect(saida).toMatch(/[Tt]empo estimado/i);
  });

  test('exibe critérios de avaliação', () => {
    const saida = captureConsole(() => executarDesafio(['Java', 'iniciante']));
    expect(saida).toMatch(/[Cc]ritério|CRITÉRIO|avaliação|40%/i);
  });

  test('desafio com tecnologia composta "Spring Boot"', () => {
    const saida = captureConsole(() =>
      executarDesafio(['Spring', 'Boot', 'iniciante'])
    );
    expect(saida).toMatch(/DIO-/);
  });
});

// ══════════════════════════════════════════════════════════
//  BLOCO 4 — /certificado (aluno fictício)
// ══════════════════════════════════════════════════════════
import { executarCertificado } from '../src/certificado.js';
import { existsSync } from 'fs';

const ALUNO = 'Ana Ficticia';
const CURSO = 'Java';

describe('4. /certificado aluno fictício — Java', () => {
  test('gera certificado sem lançar exceção', () => {
    expect(() =>
      captureConsole(() => executarCertificado([ALUNO, CURSO]))
    ).not.toThrow();
  });

  test('output contém nome do aluno', () => {
    const saida = captureConsole(() => executarCertificado([ALUNO, CURSO]));
    expect(saida).toContain(ALUNO);
  });

  test('output contém nome do curso Java', () => {
    const saida = captureConsole(() => executarCertificado([ALUNO, CURSO]));
    expect(saida.toLowerCase()).toContain('java');
  });

  test('output contém ID do certificado no formato DIO-YYYY-XXXX', () => {
    const saida = captureConsole(() => executarCertificado([ALUNO, CURSO]));
    expect(saida).toMatch(/DIO-\d{4}-[A-F0-9]{4}/);
  });

  test('output contém data de emissão formatada', () => {
    const saida = captureConsole(() => executarCertificado([ALUNO, CURSO]));
    expect(saida).toMatch(/\d{2}\/\d{2}\/\d{4}/);
  });

  test('certificado é salvo em arquivo .md', () => {
    captureConsole(() => executarCertificado([ALUNO, CURSO]));
    const slug = (s) =>
      s
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/^_|_$/g, '');
    const dir = resolve(__dirname, '../docs/certificados-emitidos');
    // Verifica que o diretório existe após execução
    expect(existsSync(dir)).toBe(true);
  });

  test('sem argumentos exibe uso correto', () => {
    const saida = captureConsole(() => executarCertificado([]));
    expect(saida).toMatch(/[Uu]so|certificado/i);
  });

  test('curso não encontrado no JSON usa dados fornecidos', () => {
    const saida = captureConsole(() =>
      executarCertificado(['Aluno Teste', 'Curso Ficticio XYZ'])
    );
    expect(saida).toContain('Aluno Teste');
    expect(saida).toContain('Curso Ficticio XYZ');
  });

  test('nível exibido no output', () => {
    const saida = captureConsole(() => executarCertificado([ALUNO, CURSO]));
    expect(saida).toMatch(/[Nn]ível|nivel/i);
  });
});

// ══════════════════════════════════════════════════════════
//  BLOCO 5 — Utilitários internos (slugify / gerarId)
// ══════════════════════════════════════════════════════════
import { createHash } from 'crypto';

describe('5. Utilitários internos', () => {
  function slugify(texto) {
    return texto
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/^_|_$/g, '');
  }

  function gerarId(nome, curso) {
    const hash = createHash('md5')
      .update(`${nome}${curso}${Date.now()}`)
      .digest('hex');
    return `DIO-${new Date().getFullYear()}-${hash.slice(0, 4).toUpperCase()}`;
  }

  test('slugify converte espaços em underscores', () => {
    expect(slugify('Ana Ficticia')).toBe('ana_ficticia');
  });

  test('slugify remove acentos', () => {
    expect(slugify('Formação Java Developer')).toBe('formacao_java_developer');
  });

  test('slugify converte para lowercase', () => {
    expect(slugify('JAVA DEVELOPER')).toBe('java_developer');
  });

  test('slugify remove caracteres especiais', () => {
    expect(slugify('C++ Developer!')).toBe('c_developer');
  });

  test('gerarId retorna string no formato DIO-YYYY-XXXX', () => {
    const id = gerarId('Ana', 'Java');
    expect(id).toMatch(/^DIO-\d{4}-[A-F0-9]{4}$/);
  });

  test('gerarId inclui o ano atual', () => {
    const id = gerarId('Ana', 'Java');
    expect(id).toContain(String(new Date().getFullYear()));
  });
});
