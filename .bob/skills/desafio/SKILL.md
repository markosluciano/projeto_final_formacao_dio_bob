---
name: desafio
description: Use quando o usuário digitar /desafio <tecnologia> <nivel> para gerar um desafio de código aleatório baseado no nível e tecnologia escolhidos.
metadata:
  argument-hint: "<tecnologia> <nivel>"
---

# /desafio — Gerador de Desafio de Código

O usuário quer um desafio de código aleatório para praticar.

## Passos

1. Extraia os argumentos `<tecnologia>` e `<nivel>` do que o usuário digitou após `/desafio`.
   - Níveis aceitos: `iniciante`, `intermediário`, `avançado`.
   - Se o nível não for informado, pergunte ao usuário qual nível deseja.

2. Com base no nível, selecione **aleatoriamente** um desafio do banco abaixo.

---

## Banco de Desafios

### 🟢 Iniciante
- **Calculadora Simples:** implemente as 4 operações básicas com tratamento de divisão por zero. Tempo: 1-2h.
- **Verificador de Palíndromo:** verifique se uma palavra/frase é palíndromo, ignorando espaços e maiúsculas. Tempo: 1h.
- **Gerador de Tabuada:** receba um número e exiba a tabuada de 1 a 10 formatada. Tempo: 30min.
- **Conversor de Temperatura:** converta entre Celsius, Fahrenheit e Kelvin. Tempo: 1h.
- **FizzBuzz Avançado:** imprima números de 1 a 100, substituindo múltiplos de 3 por "Fizz", de 5 por "Buzz" e de ambos por "FizzBuzz". Tempo: 30min.

### 🟡 Intermediário
- **API REST com JWT:** construa endpoints de registro, login e rota protegida com autenticação JWT. Tempo: 4-6h.
- **Parser de CSV:** implemente um parser sem bibliotecas externas com filtro e ordenação. Tempo: 3-4h.
- **Cache com TTL:** implemente um cache em memória com expiração automática por tempo. Tempo: 2-3h.
- **Validador de Formulário:** crie um validador genérico com regras configuráveis (required, minLength, email, etc). Tempo: 2-3h.
- **CLI de Tarefas:** crie um gerenciador de tarefas via terminal com persistência em arquivo JSON. Tempo: 3-4h.

### 🔴 Avançado
- **Motor de Templates:** implemente suporte a `{{ var }}`, `{% if %}` e `{% for %}`. Tempo: 8-12h.
- **Rate Limiting (Token Bucket):** middleware que limita requisições por IP com headers HTTP corretos. Tempo: 6-10h.
- **ORM Minimalista:** mapeie classes para tabelas SQLite com CRUD, relacionamentos e migrações. Tempo: 12-20h.
- **Sistema Pub/Sub Distribuído:** implemente publish/subscribe com suporte a múltiplos subscribers. Tempo: 8-14h.
- **Interpretador de Expressões:** parse e avalie expressões matemáticas com parênteses e precedência. Tempo: 6-10h.

---

3. Gere um ID aleatório no formato `DIO-XXXXXX` (6 caracteres hex maiúsculos).

4. Responda com o desafio formatado em Markdown:

```
# ⚔️ Desafio DIO — {tecnologia} | {emoji_nivel} {nivel}

**ID:** #{id}  |  **Tempo estimado:** {tempo}

---

## 📋 {titulo}

{descricao completa e contextualizada para a tecnologia escolhida}

---

## ✅ Requisitos

- [ ] Requisito 1
- [ ] Requisito 2
- [ ] Requisito 3
- [ ] Requisito 4

---

## 🎯 Critérios de Avaliação

| Critério | Peso |
|---|---|
| Funcionamento correto | 40% |
| Qualidade do código | 30% |
| Tratamento de erros | 20% |
| Documentação | 10% |

---

## 💡 Dicas

> Dica 1 específica para a tecnologia
> Dica 2 específica para a tecnologia

---

*Boa sorte! 🚀 — DIO Explorer*
```

5. Adapte a descrição, os requisitos e as dicas para a tecnologia específica informada pelo usuário (ex: se for Python, os requisitos devem ser em Python).
