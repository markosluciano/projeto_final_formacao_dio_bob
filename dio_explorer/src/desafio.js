import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { createHash } from 'crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));

const DESAFIOS = {
  iniciante: [
    {
      titulo: 'Calculadora Simples',
      descricao: 'Implemente uma calculadora que realize as 4 operações básicas (soma, subtração, multiplicação e divisão). A calculadora deve receber dois números e um operador como entrada e retornar o resultado.',
      requisitos: [
        'Suportar as operações: +, -, *, /',
        'Tratar divisão por zero com mensagem de erro',
        'Aceitar números decimais',
        'Exibir o resultado formatado'
      ],
      dicas: [
        'Use condicionais para selecionar a operação',
        'Valide os inputs antes de processar'
      ],
      tempo: '1-2 horas'
    },
    {
      titulo: 'Verificador de Palíndromo',
      descricao: 'Crie um programa que verifique se uma palavra ou frase é um palíndromo (lida da mesma forma de frente para trás). Ignore espaços e diferenças de maiúsculas/minúsculas.',
      requisitos: [
        'Ignorar espaços e pontuação',
        'Ser insensível a maiúsculas/minúsculas',
        'Funcionar com frases completas',
        'Exibir mensagem clara de resultado'
      ],
      dicas: [
        'Remova caracteres especiais antes de comparar',
        'Reverta a string e compare com o original'
      ],
      tempo: '1 hora'
    },
    {
      titulo: 'Gerador de Tabuada',
      descricao: 'Desenvolva um programa que receba um número e exiba a tabuada completa de 1 a 10 desse número, de forma formatada e legível.',
      requisitos: [
        'Receber o número via input',
        'Exibir multiplicações de 1 a 10',
        'Formatar a saída de forma alinhada',
        'Validar que o input é um número válido'
      ],
      dicas: [
        'Use um laço de repetição de 1 a 10',
        'Formate a saída com padding para alinhar os números'
      ],
      tempo: '30 minutos'
    }
  ],
  intermediario: [
    {
      titulo: 'API REST com Autenticação JWT',
      descricao: 'Construa uma API REST que implemente autenticação via JWT. A API deve ter rotas de registro, login e uma rota protegida que retorne dados do usuário autenticado.',
      requisitos: [
        'Endpoint POST /register para cadastro de usuário',
        'Endpoint POST /login que retorna um token JWT',
        'Endpoint GET /profile protegido por middleware de autenticação',
        'Senhas devem ser armazenadas com hash (bcrypt)'
      ],
      dicas: [
        'Use a biblioteca jsonwebtoken para gerar e validar tokens',
        'Armazene os usuários em um arquivo JSON ou banco em memória'
      ],
      tempo: '4-6 horas'
    },
    {
      titulo: 'Parser de Arquivos CSV',
      descricao: 'Implemente um parser de CSV do zero (sem usar bibliotecas externas) capaz de ler um arquivo, transformar em objetos e permitir filtragem e ordenação dos dados.',
      requisitos: [
        'Ler e parsear arquivos CSV com cabeçalho',
        'Transformar cada linha em um objeto JavaScript/Python',
        'Suportar filtro por qualquer coluna',
        'Suportar ordenação ascendente e descendente'
      ],
      dicas: [
        'Trate casos onde o valor de uma célula contém vírgulas (entre aspas)',
        'Use a primeira linha como chaves dos objetos'
      ],
      tempo: '3-4 horas'
    },
    {
      titulo: 'Sistema de Cache com TTL',
      descricao: 'Implemente um sistema de cache em memória com suporte a TTL (Time To Live). Após o tempo configurado, os itens devem expirar automaticamente.',
      requisitos: [
        'Métodos set(chave, valor, ttlSegundos)',
        'Método get(chave) que retorna null se expirado',
        'Método delete(chave)',
        'Limpeza automática de itens expirados'
      ],
      dicas: [
        'Armazene junto ao valor o timestamp de expiração',
        'Use setInterval para limpeza periódica'
      ],
      tempo: '2-3 horas'
    }
  ],
  avancado: [
    {
      titulo: 'Motor de Templates Customizado',
      descricao: 'Implemente um motor de templates simples que suporte variáveis ({{ variavel }}), blocos condicionais ({% if %}...{% endif %}) e laços ({% for item in lista %}...{% endfor %}).',
      requisitos: [
        'Interpolação de variáveis com {{ }}',
        'Bloco condicional {% if condição %}',
        'Bloco de laço {% for item in lista %}',
        'Suporte a templates aninhados'
      ],
      dicas: [
        'Use expressões regulares para identificar os blocos',
        'Implemente um parser recursivo para blocos aninhados'
      ],
      tempo: '8-12 horas'
    },
    {
      titulo: 'Sistema de Rate Limiting',
      descricao: 'Implemente um middleware de rate limiting usando o algoritmo Token Bucket. Deve controlar o número de requisições por IP em uma janela de tempo configurável.',
      requisitos: [
        'Algoritmo Token Bucket ou Sliding Window',
        'Configurável por rota e por IP',
        'Headers X-RateLimit-Limit e X-RateLimit-Remaining na resposta',
        'Retornar HTTP 429 quando o limite for excedido'
      ],
      dicas: [
        'Armazene os buckets por IP em um Map em memória',
        'Considere usar Redis para persistência em produção'
      ],
      tempo: '6-10 horas'
    },
    {
      titulo: 'ORM Simples do Zero',
      descricao: 'Construa um ORM minimalista capaz de mapear classes para tabelas de banco de dados SQLite, com suporte a operações CRUD, relacionamentos simples e migrações.',
      requisitos: [
        'Decorators/anotações para definir modelos',
        'Métodos find(), findOne(), save(), delete()',
        'Relacionamento hasMany / belongsTo',
        'Sistema de migrações automáticas'
      ],
      dicas: [
        'Use Proxy para interceptar acessos às propriedades do modelo',
        'Gere o SQL dinamicamente a partir dos metadados da classe'
      ],
      tempo: '12-20 horas'
    }
  ]
};

function normalizarNivel(nivel) {
  const n = nivel.toLowerCase().replace(/[áàãâ]/g, 'a').replace(/[éê]/g, 'e');
  if (n.includes('inici')) return 'iniciante';
  if (n.includes('inter')) return 'intermediario';
  if (n.includes('avan')) return 'avancado';
  return null;
}

function gerarId(tecnologia, nivel) {
  const hash = createHash('md5').update(`${tecnologia}${nivel}${Date.now()}`).digest('hex');
  return `DIO-${hash.slice(0, 6).toUpperCase()}`;
}

function emojiNivel(nivel) {
  const mapa = { iniciante: '🟢', intermediario: '🟡', avancado: '🔴' };
  return mapa[nivel] || '⚪';
}

export function executarDesafio(args) {
  if (args.length < 2) {
    console.log('\n⚠️  Uso: /desafio <tecnologia> <nivel>\n');
    console.log('  Exemplos:');
    console.log('    /desafio Python iniciante');
    console.log('    /desafio JavaScript intermediario');
    console.log('    /desafio Java avancado\n');
    console.log('  Níveis disponíveis: iniciante | intermediario | avancado\n');
    return;
  }

  const nivel = normalizarNivel(args[args.length - 1]);
  const tecnologia = args.slice(0, -1).join(' ');

  if (!nivel) {
    console.log(`\n❌ Nível inválido: "${args[args.length - 1]}"`);
    console.log('   Use: iniciante | intermediario | avancado\n');
    return;
  }

  const banco = DESAFIOS[nivel];
  const desafio = banco[Math.floor(Math.random() * banco.length)];
  const id = gerarId(tecnologia, nivel);
  const separador = '─'.repeat(50);

  console.log(`\n${separador}`);
  console.log(`⚔️   DESAFIO DIO — ${tecnologia.toUpperCase()} | ${emojiNivel(nivel)} ${nivel.toUpperCase()}`);
  console.log(`${separador}\n`);
  console.log(`🔑  ID do Desafio   : ${id}`);
  console.log(`🛠️   Tecnologia      : ${tecnologia}`);
  console.log(`🎯  Dificuldade     : ${emojiNivel(nivel)} ${nivel}`);
  console.log(`⏱️   Tempo estimado  : ${desafio.tempo}`);
  console.log(`\n${separador}`);
  console.log(`📋  ${desafio.titulo.toUpperCase()}\n`);
  console.log(`${desafio.descricao}`);
  console.log(`\n${separador}`);
  console.log('✅  REQUISITOS\n');
  desafio.requisitos.forEach((r, i) => {
    console.log(`  ${i + 1}. [ ] ${r}`);
  });
  console.log(`\n${separador}`);
  console.log('🎯  CRITÉRIOS DE AVALIAÇÃO\n');
  console.log('  Funcionamento correto  40%');
  console.log('  Qualidade do código    30%');
  console.log('  Tratamento de erros    20%');
  console.log('  Documentação           10%');
  console.log(`\n${separador}`);
  console.log('💡  DICAS\n');
  desafio.dicas.forEach((d) => console.log(`  → ${d}`));
  console.log(`\n${separador}`);
  console.log('📤  COMO ENTREGAR\n');
  console.log('  1. Crie um repositório público no GitHub');
  console.log('  2. Faça o commit do seu código');
  console.log('  3. Adicione um README.md explicando a solução');
  console.log('  4. Compartilhe o link do repositório');
  console.log(`\n${separador}`);
  console.log('  Desafio gerado pelo DIO Explorer — Boa sorte! 🚀');
  console.log(`${separador}\n`);
}
