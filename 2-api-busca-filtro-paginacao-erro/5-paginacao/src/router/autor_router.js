import express from "express";
import AutorController from "../controller/AutorController.js";
import { paginar } from "../middlewares/paginacao.js";

const router = express.Router();

router
  .get("/autores", AutorController.listarAutores, paginar)
  .get("/autores/:id", AutorController.listarAutorId)
  .post("/autores", AutorController.cadastroAutor)
  .put("/autores/:id", AutorController.atualizarAutor)
  .delete("/autores/:id", AutorController.excluirAutor);

export default router;
