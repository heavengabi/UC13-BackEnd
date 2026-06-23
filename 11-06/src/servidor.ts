import express from "express";
import { pool } from "./database";
import { json } from "node:stream/consumers";

const app = express();

const PORT = 3000;

app.use(express.json());

app.get("/livros", async (req, res) => {
  try {
    const [livros] = await pool.query("SELECT * FROM livros");

    return res.status(200).json(livros);
  } catch (erro) {
    console.log("Erro: ", erro);
    return res.status(500).json("Erro ao buscar livro: " + erro);
  }
});

app.post("/livros", async (req, res) => {
  try {
    const { titulo, autor, categoria, ano_publicacao } = req.body;

    const [resultado] = await pool.query(
      "INSERT INTO livros (titulo, autor, categoria, ano_publicacao) VALUES (?, ?, ?, ?)",
      [titulo, autor, categoria, ano_publicacao],
    );

    return res.status(201).json("Livro cadastrado com sucesso!");
  } catch (erro) {
    return res.status(500).json("Erro interno do servidor: " + erro);
  }
});

app.put("/livros/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { titulo, autor, categoria, ano_publicacao } = req.body;

    const [resultado] = await pool.query(
      "UPDATE livros SET titulo = ?, autor = ?, categoria = ?, ano_publicacao = ? WHERE id = ?",
      [titulo, autor, categoria, ano_publicacao, id],
    );

    return res.status(200).json("Livro atualizado com sucesso!");
  } catch (erro) {
    return res.status(500).json("Erro interno do servidor: " + erro);
  }
});
app.delete("/livros/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [resultado] = await pool.query("DELETE FROM livros WHERE id = ?", [
      id,
    ]);

    return res.status(200).json("Livro excluído");
  } catch (erro) {
    return res.status(500).json("Erro interno do servidor: " + erro);
  }
});

app.patch("/livros/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const campos = req.body;
    const keys = Object.keys(campos);
    const values = Object.values(campos);
    if (keys.length === 0) {
      return res.status(400).json("Nenhum campo enviado para atualização.");
    }
    const setClause = keys.map((key) => `${key} = ?`).join(",");
    await pool.query(`UPDATE livros SET ${setClause} WHERE id = ?`, [
      ...values,
      id,
    ]);
    return res.status(200).json("Livro atualizado parcialmente com sucesso!");
  } catch (erro) {
    return res.status(500).json("Erro interno do servidor" + erro);
  }
});

app.listen(PORT, () => {
  console.log("O servidor está no ar, ufa");
});
