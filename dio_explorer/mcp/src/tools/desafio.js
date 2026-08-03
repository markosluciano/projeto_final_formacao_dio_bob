/**
 * Tool: gerar_desafio
 * Gera um desafio de código aleatório para uma tecnologia e nível.
 */

import { createHash } from 'crypto';
import { z } from 'zod';

const DESAFIOS = {
  iniciante: [
    {
      titulo: 'Calculadora Simples',
      descricao:
        'Implemente uma calculadora que realize as 4 operações básicas (soma, subtração, multiplicação e divisão). Deve receber dois números e um operador como entrada e retornar o resultado.',
      requisitos: [
        'Suportar as operações: +, -, *, /',
        'Tratar divisão por zero com mensagem de erro',
        'Aceitar números decimais',
        'Exibir o resultado formatado',
      ],
      dicas: [
        'Use condicionais para selecionar a operação',
        'Valide os inputs antes de processar',
      ],
      tempo: '1-2 horas',
    },
    {
      titulo: 'Verificador de Palíndromo',
      descricao:
        'Crie um programa que verifique se uma palavra ou frase é um palíndromo. Ignore espaços e diferenças de maiúsculas/minúsculas.',
      requisitos: [
        'Ignorar espaços e pontuação',
        'Ser insensível a maiúsculas/minúsculas',
        'Funcionar com frases completas',
        'Exibir mensagem clara de resultado',
      ],
      dicas: [
        'Remova caracteres especiais antes de comparar',
        'Reverta a string e compare com o original',
      ],
      tempo: '1 hora',
    },
    {
      titulo: 'Gerador de Tabuada',
      descricao:
        'Desenvolva um programa que receba um número e exiba a tabuada completa de 1 a 10, de forma formatada.',
      requisitos: [
        'Receber o número via input',
        'Exibir multiplicações de 1 a 10',
        'Formatar a saída de forma alinhada',
        'Validar que o input é um número válido',
      ],
      dicas: [
        'Use um laço de repetição de 1 a 10',
        'Formate a saída com padding para alinhar os números',
      ],
      tempo: '30 minutos',
    },
  ],
  intermediario: [
    {
      titulo: 'API REST com Autenticação JWT',
      descricao:
        'Construa uma API REST que implemente autenticação via JWT com rotas de registro, login e rota protegida.',
      requisitos: [
        'Endpoint POST /register para cadastro de usuário',
        'Endpoint POST /login que retorna um token JWT',
        'Endpoint GET /profile protegido por middleware de autenticação',
        'Senhas devem ser armazenadas com hash (bcrypt)',
      ],
      dicas: [
        'Use jsonwebtoken para gerar e validar tokens',
        'Armazene os usuários em um arquivo JSON ou banco em memória',
      ],
      tempo: '4-6 horas',
    },
    {
      titulo: 'Parser de Arquivos CSV',
      descricao:
        'Implemente um parser de CSV do zero (sem bibliotecas externas) capaz de ler um arquivo, transformar em objetos e permitir filtragem e ordenação.',
      requisitos: [
        'Ler e parsear arquivos CSV com cabeçalho',
        'Transformar cada linha em um objeto',
        'Suportar filtro por qualquer coluna',
        'Suportar ordenação ascendente e descendente',
      ],
      dicas: [
        'Trate casos onde o valor de uma célula contém vírgulas (entre aspas)',
        'Use a primeira linha como chaves dos objetos',
      ],
      tempo: '3-4 horas',
    },
    {
      titulo: 'Sistema de Cache com TTL',
      descricao:
        'Implemente um sistema de cache em memória com suporte a TTL. Após o tempo configurado, os itens expiram automaticamente.',
      requisitos: [
        'Método set(chave, valor, ttlSegundos)',
        'Método get(chave) que retorna null se expirado',
        'Método delete(chave)',
        'Limpeza automática de itens expirados',
      ],
      dicas: [
        'Armazene junto ao valor o timestamp de expiração',
        'Use setInterval para limpeza periódica',
      ],
      tempo: '2-3 horas',
    },
  ],
  avancado: [
    {
      titulo: 'Motor de Templates Customizado',
      descricao:
        'Implemente um motor de templates simples que suporte variáveis, blocos condicionais e laços.',
      requisitos: [
        'Interpolação de variáveis com {{ variavel }}',
        'Bloco condicional {% if condição %}',
        'Bloco de laço {% for item in lista %}',
        'Suporte a templates aninhados',
      ],
      dicas: [
        'Use expressões regulares para identificar os blocos',
        'Implemente um parser recursivo para blocos aninhados',
      ],
      tempo: '8-12 horas',
    },
    {
      titulo: 'Sistema de Rate Limiting',
      descricao:
        'Implemente um middleware de rate limiting usando o algoritmo Token Bucket para controlar requisições por IP.',
      requisitos: [
        'Algoritmo Token Bucket ou Sliding Window',
        'Configurável por rota e por IP',
        'Headers X-RateLimit-Limit e X-RateLimit-Remaining na resposta',
        'Retornar HTTP 429 quando o limite for excedido',
      ],
      dicas: [
        'Armazene os buckets por IP em um Map em memória',
        'Considere usar Redis para persistência em produção',
      ],
      tempo: '6-10 horas',
    },
    {
      titulo: 'ORM Simples do Zero',
      descricao:
        'Construa um ORM minimalista capaz de mapear classes para tabelas SQLite com CRUD e relacionamentos simples.',
      requisitos: [
        'Decorators/anotações para definir modelos',
        'Métodos find(), findOne(), save(), delete()',
        'Relacionamento hasMany / belongsTo',
        'Sistema de migrações automáticas',
      ],
      dicas: [
        'Use Proxy para interceptar acessos às propriedades do modelo',
        'Gere o SQL dinamicamente a partir dos metadados da classe',
      ],
      tempo: '12-20 horas',
    },
  ],
};

function normalizarNivel(nivel) {
  const n = nivel.toLowerCase()
    .replace(/[áàãâ]/g, 'a')
    .replace(/[éê]/g, 'e');
  if (n.includes('inici'))  return 'iniciante';
  if (n.includes('inter'))  return 'intermediario';
  if (n.includes('avan'))   return 'avancado';
  return null;
}

export function registerDesafio(server) {
  server.registerTool(
    'gerar_desafio',
    {
      description:
        'Gera um desafio de código aleatório para uma tecnologia e nível de dificuldade. Retorna título, descrição, requisitos, dicas, critérios de avaliação e ID único.',
      inputSchema: z.object({
        tecnologia: z
          .string()
          .min(1)
          .describe('Tecnologia alvo (ex: "Java", "Python", "JavaScript")'),
        nivel: z
          .string()
          .describe('Nível de dificuldade: iniciante | intermediario | avancado'),
      }),
    },
    async ({ tecnologia, nivel }) => {
      const nivelNorm = normalizarNivel(nivel);

      if (!nivelNorm) {
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                erro: `Nível inválido: "${nivel}". Use: iniciante | intermediario | avancado`,
              }),
            },
          ],
          isError: true,
        };
      }

      const banco   = DESAFIOS[nivelNorm];
      const desafio = banco[Math.floor(Math.random() * banco.length)];
      const hash    = createHash('md5')
        .update(`${tecnologia}${nivel}${Date.now()}`)
        .digest('hex');
      const id = `DIO-${hash.slice(0, 6).toUpperCase()}`;

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              id,
              tecnologia,
              nivel: nivelNorm,
              titulo: desafio.titulo,
              descricao: desafio.descricao,
              requisitos: desafio.requisitos,
              dicas: desafio.dicas,
              tempo_estimado: desafio.tempo,
              criterios_avaliacao: {
                funcionamento_correto: '40%',
                qualidade_codigo: '30%',
                tratamento_erros: '20%',
                documentacao: '10%',
              },
              como_entregar: [
                'Crie um repositório público no GitHub',
                'Faça o commit do seu código',
                'Adicione um README.md explicando a solução',
                'Compartilhe o link do repositório',
              ],
            }),
          },
        ],
      };
    }
  );
}
