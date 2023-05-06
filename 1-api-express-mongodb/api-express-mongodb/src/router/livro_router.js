import express from 'express'
import LivroController from '../controller/LivroController.js'

const router = express.Router()

router
    .get("/livros", LivroController.listarLivros)
    .get("/livros/busca", LivroController.listarLivroPorEditora)
    .get("/livros/:id", LivroController.listarLivroId)
    .post("/livros", LivroController.cadastroLivro)
    .put("/livros/:id", LivroController.atualizarLivro)
    .delete("/livros/:id", LivroController.excluirLivro)

export default router
