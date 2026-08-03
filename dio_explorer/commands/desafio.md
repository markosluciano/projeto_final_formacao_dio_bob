# Slash Command: /desafio

## Descrição
Gera um desafio de código aleatório baseado no nível e tecnologia escolhidos pelo usuário.

## Uso
```
/desafio <tecnologia> <nivel>
```

**Exemplos:**
```
/desafio Python iniciante
/desafio JavaScript intermediário
/desafio Java avançado
/desafio SQL intermediário
```

**Níveis disponíveis:** `iniciante` | `intermediário` | `avançado`

---

## Comportamento

1. Recebe `<tecnologia>` e `<nivel>` como argumentos.
2. Seleciona aleatoriamente um desafio do banco de desafios correspondente ao nível e tecnologia.
3. Formata e exibe o desafio com contexto, requisitos e critérios de avaliação.
4. Se a combinação não existir no banco, gera um desafio genérico adequado ao nível.

---

## Banco de Desafios por Nível

### 🟢 Iniciante
- Implementar uma calculadora simples com as 4 operações
- Criar um programa que verifique se um número é primo
- Desenvolver um conversor de temperatura (Celsius/Fahrenheit/Kelvin)
- Criar um gerador de tabuada
- Implementar um verificador de palíndromos

### 🟡 Intermediário
- Construir uma API REST com autenticação JWT
- Implementar um sistema de cache com TTL
- Criar uma fila de tarefas assíncrona
- Desenvolver um parser de arquivos CSV/JSON
- Implementar um algoritmo de busca binária

### 🔴 Avançado
- Implementar um sistema de pub/sub distribuído
- Criar um ORM simples do zero
- Desenvolver um interpretador de expressões matemáticas
- Construir um sistema de rate limiting
- Implementar um motor de templates customizado

---

## Template de Saída

```markdown
# ⚔️ Desafio DIO — {tecnologia} | Nível: {nivel}

**ID do Desafio:** #{id_aleatorio}
**Dificuldade:** {emoji_nivel} {nivel}
**Tecnologia:** {tecnologia}
**Tempo estimado:** {tempo_estimado}

---

## 📋 Descrição do Desafio

{descricao_completa_do_desafio}

---

## ✅ Requisitos

- [ ] {requisito_1}
- [ ] {requisito_2}
- [ ] {requisito_3}
- [ ] {requisito_4}

---

## 🎯 Critérios de Avaliação

| Critério              | Peso |
|-----------------------|------|
| Funcionamento correto | 40%  |
| Qualidade do código   | 30%  |
| Tratamento de erros   | 20%  |
| Documentação          | 10%  |

---

## 💡 Dicas

> {dica_1}
> {dica_2}

---

## 📤 Como Entregar

1. Crie um repositório público no GitHub
2. Faça o commit do seu código
3. Adicione um `README.md` explicando a solução
4. Compartilhe o link do repositório

---

*Desafio gerado pelo DIO Explorer — Boa sorte! 🚀*
```
