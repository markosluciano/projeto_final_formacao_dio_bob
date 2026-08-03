---
name: certificado
description: Use quando o usuário digitar /certificado <nome> <curso> para gerar um certificado fictício em Markdown com nome do aluno e curso realizado.
metadata:
  argument-hint: "<nome do aluno> <curso>"
---

# /certificado — Gerador de Certificado Fictício

O usuário quer gerar um certificado fictício de conclusão de curso da DIO.

## Passos

1. Extraia os argumentos `<nome do aluno>` e `<curso>` do que o usuário digitou após `/certificado`.
   - Se algum dado não for informado, pergunte ao usuário.

2. Leia o arquivo `dio_explorer/data/trilhas_dio.json` com a ferramenta `read_file`.

3. Busque no JSON a trilha cujo `nome` ou `tecnologias` corresponda ao curso informado (busca case-insensitive).
   - Se encontrar: use `nivel`, `duracao_horas` e `tecnologias` da trilha.
   - Se não encontrar: use os dados que o usuário forneceu e coloque "N/A" nos campos desconhecidos.

4. Gere:
   - **Data de emissão:** data atual formatada como DD/MM/AAAA.
   - **ID do certificado:** formato `DIO-{ANO}-{4 caracteres hex maiúsculos}`, ex: `DIO-2025-A3F1`.

5. Responda com o certificado formatado em Markdown:

```markdown
---

<div align="center">

# 🏆 CERTIFICADO DE CONCLUSÃO

### DIO — Digital Innovation One

---

**Certificamos que**

# {NOME DO ALUNO}

**concluiu com êxito o curso**

## {NOME DO CURSO}

com carga horária de **{duracao_horas} horas**,
abrangendo os conteúdos de **{tecnologias}**.

---

| Campo | Informação |
|---|---|
| 📅 Data de Emissão | {data} |
| 🔑 ID do Certificado | {id} |
| 🎓 Nível | {nivel} |
| ⏱️ Carga Horária | {duracao_horas}h |
| 🏫 Instituição | Digital Innovation One — DIO |

---

> *Este certificado comprova a dedicação e o esforço do aluno*
> *na jornada de aprendizado da plataforma DIO.*

---

**Digital Innovation One**
[www.dio.me](https://www.dio.me)

</div>

---
```

6. Após exibir o certificado no chat, salve-o como arquivo Markdown em `dio_explorer/docs/certificados-emitidos/{slug_nome}_{slug_curso}.md` usando a ferramenta `write_file`, onde o slug é o nome em lowercase com underscores.
