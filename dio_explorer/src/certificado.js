import { readFileSync, mkdirSync, writeFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { createHash } from 'crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));

function carregarTrilhas() {
  const caminho = resolve(__dirname, '../data/trilhas_dio.json');
  return JSON.parse(readFileSync(caminho, 'utf-8')).trilhas;
}

function buscarTrilha(curso) {
  const trilhas = carregarTrilhas();
  const termo = curso.toLowerCase();
  return trilhas.find(
    (t) =>
      t.nome.toLowerCase().includes(termo) ||
      t.tecnologias.some((tech) => tech.toLowerCase().includes(termo))
  );
}

function gerarId(nome, curso) {
  const hash = createHash('md5').update(`${nome}${curso}${Date.now()}`).digest('hex');
  return `DIO-${new Date().getFullYear()}-${hash.slice(0, 4).toUpperCase()}`;
}

function dataFormatada() {
  return new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

function slugify(texto) {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_|_$/g, '');
}

export function executarCertificado(args) {
  if (args.length < 2) {
    console.log('\n⚠️  Uso: /certificado "<nome do aluno>" "<nome do curso>"\n');
    console.log('  Exemplos:');
    console.log('    /certificado "Marcos Luciano" "Formação Python Developer"');
    console.log('    /certificado "Ana Silva" "React"');
    console.log('    /certificado "João Santos" "Cloud AWS"\n');
    return;
  }

  // Suporta argumentos entre aspas ou palavras separadas
  // Estratégia: último argumento pode ser o curso, os demais o nome
  const nomeAluno = args[0];
  const termoCurso = args.slice(1).join(' ');

  const trilha = buscarTrilha(termoCurso);

  const nomeCurso   = trilha ? trilha.nome : termoCurso;
  const nivel       = trilha ? trilha.nivel : 'N/A';
  const duracao     = trilha ? `${trilha.duracao_horas} horas` : 'N/A';
  const tecnologias = trilha ? trilha.tecnologias.join(', ') : 'N/A';

  const id   = gerarId(nomeAluno, nomeCurso);
  const data = dataFormatada();

  const certificado = `---

<div align="center">

# 🏆 CERTIFICADO DE CONCLUSÃO

### DIO — Digital Innovation One

---

**Certificamos que**

# ${nomeAluno}

**concluiu com êxito o curso**

## ${nomeCurso}

com carga horária de **${duracao}**,
abrangendo os conteúdos de **${tecnologias}**.

---

| Campo                | Informação                          |
|----------------------|-------------------------------------|
| 📅 Data de Emissão   | ${data}                             |
| 🔑 ID do Certificado | ${id}                               |
| 🎓 Nível             | ${nivel}                            |
| ⏱️ Carga Horária     | ${duracao}                          |
| 🏫 Instituição       | Digital Innovation One — DIO        |

---

> *Este certificado comprova a dedicação e o esforço do aluno*
> *na jornada de aprendizado da plataforma DIO.*

---

**Digital Innovation One**
[www.dio.me](https://www.dio.me)

</div>

---
`;

  // Exibe no terminal
  const separador = '─'.repeat(50);
  console.log(`\n${separador}`);
  console.log('🏆  CERTIFICADO GERADO COM SUCESSO!');
  console.log(`${separador}\n`);
  console.log(`👤  Aluno   : ${nomeAluno}`);
  console.log(`📚  Curso   : ${nomeCurso}`);
  console.log(`🎓  Nível   : ${nivel}`);
  console.log(`⏱️   Duração : ${duracao}`);
  console.log(`🔑  ID      : ${id}`);
  console.log(`📅  Data    : ${data}`);

  // Salva o arquivo .md
  const dirSaida = resolve(__dirname, '../docs/certificados-emitidos');
  if (!existsSync(dirSaida)) mkdirSync(dirSaida, { recursive: true });

  const nomeArquivo = `${slugify(nomeAluno)}_${slugify(nomeCurso)}.md`;
  const caminhoArquivo = resolve(dirSaida, nomeArquivo);
  writeFileSync(caminhoArquivo, certificado, 'utf-8');

  console.log(`\n📄  Certificado salvo em:`);
  console.log(`    docs/certificados-emitidos/${nomeArquivo}`);
  console.log(`\n${separador}\n`);
}
