# Slash Command: /trilha

## Descrição
Recebe uma tecnologia como argumento e retorna um plano de estudos formatado com os módulos da trilha correspondente, consultando o arquivo `data/trilhas_dio.json`.

## Uso
```
/trilha <tecnologia>
```

**Exemplos:**
```
/trilha Python
/trilha React
/trilha Java
/trilha Docker
```

---

## Comportamento

1. Recebe o argumento `<tecnologia>` (nome da tecnologia ou formação).
2. Busca no arquivo `data/trilhas_dio.json` a trilha que contenha a tecnologia informada no campo `tecnologias` ou `nome`.
3. Se encontrar, exibe o plano de estudos formatado.
4. Se não encontrar, lista as trilhas disponíveis.

---

## Template de Saída

Ao encontrar a trilha, o comando deve retornar no seguinte formato:

```markdown
# 📚 Plano de Estudos — {nome}

**Nível:** {nivel}
**Duração estimada:** {duracao_horas} horas
**Tecnologias:** {tecnologias}

---

## 🗂️ Módulos da Trilha

| # | Módulo |
|---|--------|
| 1 | {conteudo[0]} |
| 2 | {conteudo[1]} |
| 3 | {conteudo[2]} |
| 4 | {conteudo[3]} |
| 5 | {conteudo[4]} |

---

## 🛠️ Projetos Práticos

- 🔹 {projetos[0]}
- 🔹 {projetos[1]}
- 🔹 {projetos[2]}

---

> 💡 Dica: Conclua cada módulo antes de avançar para o próximo.
> Pratique os projetos para consolidar o aprendizado!
```

---

## Fonte de Dados
Arquivo: `dio_explorer/data/trilhas_dio.json`
