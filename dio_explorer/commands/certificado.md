# Slash Command: /certificado

## Descrição
Gera um certificado fictício em Markdown com o nome do aluno e o curso realizado.

## Uso
```
/certificado <nome_do_aluno> <nome_do_curso>
```

**Exemplos:**
```
/certificado "Marcos Luciano" "Formação Python Developer"
/certificado "Ana Silva" "Formação React Developer"
/certificado "João Santos" "Formação Cloud AWS"
```

---

## Comportamento

1. Recebe `<nome_do_aluno>` e `<nome_do_curso>` como argumentos.
2. Verifica se o curso informado existe em `data/trilhas_dio.json`.
3. Gera o certificado com data atual, ID único e carga horária da trilha.
4. Salva o arquivo em `docs/certificados-emitidos/{nome_aluno}_{curso}.md`.

---

## Template de Saída

Ao executar o comando, o seguinte certificado é gerado em Markdown:

```markdown
---

<div align="center">

# 🏆 CERTIFICADO DE CONCLUSÃO

### DIO — Digital Innovation One

---

**Certificamos que**

# {NOME_DO_ALUNO}

**concluiu com êxito o curso**

## {NOME_DO_CURSO}

com carga horária de **{duracao_horas} horas**,
abrangendo os conteúdos de **{tecnologias}**.

---

| Campo              | Informação                        |
|--------------------|-----------------------------------|
| 📅 Data de Emissão | {data_atual}                      |
| 🔑 ID do Certificado | {id_unico}                      |
| 🎓 Nível           | {nivel}                           |
| ⏱️ Carga Horária   | {duracao_horas}h                  |
| 🏫 Instituição     | Digital Innovation One — DIO      |

---

> *Este certificado comprova a dedicação e o esforço do aluno*
> *na jornada de aprendizado da plataforma DIO.*

---

**Digital Innovation One**
[www.dio.me](https://www.dio.me)

</div>

---
```

---

## Arquivos Gerados

O certificado é salvo em:
```
dio_explorer/docs/certificados-emitidos/{nome_aluno}_{curso}.md
```

> ⚠️ A pasta `docs/certificados-emitidos/` está listada no `.bobignore`
> para evitar que certificados gerados sejam versionados acidentalmente.

---

## Exemplo de Certificado Gerado

```markdown
---

<div align="center">

# 🏆 CERTIFICADO DE CONCLUSÃO

### DIO — Digital Innovation One

---

**Certificamos que**

# Marcos Luciano

**concluiu com êxito o curso**

## Formação Python Developer

com carga horária de **64 horas**,
abrangendo os conteúdos de **Python, Flask, Django, SQL**.

---

| Campo                | Informação                      |
|----------------------|---------------------------------|
| 📅 Data de Emissão   | 09/07/2025                      |
| 🔑 ID do Certificado | DIO-2025-0001-PY                |
| 🎓 Nível             | Básico ao Avançado              |
| ⏱️ Carga Horária     | 64h                             |
| 🏫 Instituição       | Digital Innovation One — DIO   |

---

> *Este certificado comprova a dedicação e o esforço do aluno*
> *na jornada de aprendizado da plataforma DIO.*

---

**Digital Innovation One**
[www.dio.me](https://www.dio.me)

</div>

---
```
