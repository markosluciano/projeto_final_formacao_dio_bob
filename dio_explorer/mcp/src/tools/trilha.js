/**
 * Tool: buscar_trilha
 * Busca o plano de estudos de uma trilha DIO pelo nome da tecnologia.
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { z } from 'zod';

const __dirname = dirname(fileURLToPath(import.meta.url));

function carregarTrilhas() {
  const caminho = resolve(__dirname, '../../data/trilhas_dio.json');
  return JSON.parse(readFileSync(caminho, 'utf-8')).trilhas;
}

function buscar(tecnologia) {
  const termo = tecnologia.toLowerCase();
  return carregarTrilhas().find(
    (t) =>
      t.nome.toLowerCase().includes(termo) ||
      t.tecnologias.some((tech) => tech.toLowerCase().includes(termo))
  );
}

export function registerTrilha(server) {
  server.registerTool(
    'buscar_trilha',
    {
      description:
        'Busca o plano de estudos completo de uma trilha DIO pelo nome da tecnologia (ex: Java, Python, React). Retorna módulos, projetos, nível e duração.',
      inputSchema: z.object({
        tecnologia: z
          .string()
          .min(1)
          .describe('Nome da tecnologia ou trilha (ex: "Java", "Python", "Machine Learning")'),
      }),
    },
    async ({ tecnologia }) => {
      const trilha = buscar(tecnologia);

      if (!trilha) {
        const todas = carregarTrilhas().map((t) => t.nome);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                encontrado: false,
                mensagem: `Nenhuma trilha encontrada para: "${tecnologia}"`,
                trilhas_disponiveis: todas,
              }),
            },
          ],
          isError: false,
        };
      }

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              encontrado: true,
              id: trilha.id,
              nome: trilha.nome,
              nivel: trilha.nivel,
              duracao_horas: trilha.duracao_horas,
              tecnologias: trilha.tecnologias,
              modulos: trilha.conteudo,
              projetos: trilha.projetos,
            }),
          },
        ],
      };
    }
  );
}
