/**
 * Tool: listar_trilhas
 * Retorna o catálogo completo de trilhas disponíveis.
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { z } from 'zod';

const __dirname = dirname(fileURLToPath(import.meta.url));

export function registerListarTrilhas(server) {
  server.registerTool(
    'listar_trilhas',
    {
      description:
        'Lista todas as trilhas disponíveis no catálogo DIO com nome, nível, duração e tecnologias.',
      inputSchema: z.object({}),
    },
    async () => {
      const trilhas = JSON.parse(
        readFileSync(
          resolve(dirname(fileURLToPath(import.meta.url)), '../../data/trilhas_dio.json'),
          'utf-8'
        )
      ).trilhas;

      const catalogo = trilhas.map((t) => ({
        id: t.id,
        nome: t.nome,
        nivel: t.nivel,
        duracao_horas: t.duracao_horas,
        tecnologias: t.tecnologias,
      }));

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({ total: catalogo.length, trilhas: catalogo }),
          },
        ],
      };
    }
  );
}
