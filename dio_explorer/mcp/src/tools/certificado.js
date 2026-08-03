/**
 * Tool: gerar_certificado
 * Gera um certificado fictício de conclusão de curso DIO e salva como .md
 */

import { readFileSync, mkdirSync, writeFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { createHash } from 'crypto';
import { z } from 'zod';

const __dirname = dirname(fileURLToPath(import.meta.url));

function carregarTrilhas() {
  const caminho = resolve(__dirname, '../../data/trilhas_dio.json');
  return JSON.parse(readFileSync(caminho, 'utf-8')).trilhas;
}

function buscarTrilha(curso) {
  const termo = curso.toLowerCase();
  return carregarTrilhas().find(
    (t) =>
      t.nome.toLowerCase().includes(termo) ||
      t.tecnologias.some((tech) => tech.toLowerCase().includes(termo))
  );
}

function gerarId(nome, curso) {
  const hash = createHash('md5')
    .update(`${nome}${curso}${Date.now()}`)
    .digest('hex');
  return `DIO-${new Date().getFullYear()}-${hash.slice(0, 4).toUpperCase()}`;
}

function dataFormatada() {
  return new Date().toLocaleDateString('pt-BR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
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

export function registerCertificado(server) {
  server.registerTool(
    'gerar_certificado',
    {
      description:
        'Gera um certificado fictício de conclusão de curso DIO para um aluno. Salva o certificado em Markdown e retorna os dados completos.',
      inputSchema: z.object({
        nome_aluno: z
          .string()
          .min(2)
          .describe('Nome completo do aluno (ex: "Ana Silva")'),
        curso: z
          .string()
          .min(1)
          .describe('Nome ou tecnologia do curso (ex: "Java", "Formação Python Developer")'),
      }),
    },
    async ({ nome_aluno, curso }) => {
      const trilha     = buscarTrilha(curso);
      const nomeCurso  = trilha ? trilha.nome : curso;
      const nivel      = trilha ? trilha.nivel : 'N/A';
      const duracao    = trilha ? `${trilha.duracao_horas} horas` : 'N/A';
      const techs      = trilha ? trilha.tecnologias.join(', ') : 'N/A';

      const id   = gerarId(nome_aluno, nomeCurso);
      const data = dataFormatada();

      const markdown = `---

<div align="center">

# 🏆 CERTIFICADO DE CONCLUSÃO

### DIO — Digital Innovation One

---

**Certificamos que**

# ${nome_aluno}

**concluiu com êxito o curso**

## ${nomeCurso}

com carga horária de **${duracao}**,
abrangendo os conteúdos de **${techs}**.

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

      // salva em docs/certificados-emitidos/
      const dirSaida = resolve(__dirname, '../../../docs/certificados-emitidos');
      if (!existsSync(dirSaida)) mkdirSync(dirSaida, { recursive: true });

      const nomeArquivo  = `${slugify(nome_aluno)}_${slugify(nomeCurso)}.md`;
      const caminhoFinal = resolve(dirSaida, nomeArquivo);
      writeFileSync(caminhoFinal, markdown, 'utf-8');

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              sucesso: true,
              certificado: {
                id,
                nome_aluno,
                curso: nomeCurso,
                nivel,
                duracao,
                tecnologias: techs,
                data_emissao: data,
                arquivo_salvo: `docs/certificados-emitidos/${nomeArquivo}`,
              },
              markdown,
            }),
          },
        ],
      };
    }
  );
}
