---
name: trilha
description: Use quando o usuário digitar /trilha <tecnologia> para exibir o plano de estudos formatado da trilha DIO correspondente.
metadata:
  argument-hint: "<tecnologia>"
---

# /trilha — Plano de Estudos DIO

O usuário quer ver o plano de estudos de uma trilha da DIO.

## Passos

1. Leia o arquivo `dio_explorer/data/trilhas_dio.json` com a ferramenta `read_file`.

2. Extraia o argumento `<tecnologia>` fornecido pelo usuário após `/trilha`.

3. Busque no JSON a trilha cujo campo `nome` ou `tecnologias` contenha o termo informado (busca case-insensitive).

4. **Se encontrar a trilha**, responda no seguinte formato Markdown:

```
# 📚 Plano de Estudos — {nome}

**Nível:** {nivel}
**Duração estimada:** {duracao_horas} horas
**Tecnologias:** {tecnologias separadas por vírgula}

---

## 🗂️ Módulos da Trilha

| # | Módulo |
|---|--------|
| 1 | {conteudo[0]} |
| 2 | {conteudo[1]} |
...

---

## 🛠️ Projetos Práticos

- 🔹 {projetos[0]}
- 🔹 {projetos[1]}
- 🔹 {projetos[2]}

---

> 💡 Conclua cada módulo antes de avançar para o próximo. Pratique os projetos para consolidar o aprendizado!
```

5. **Se não encontrar**, liste os nomes de todas as trilhas disponíveis no JSON e sugira as mais próximas do termo buscado.
