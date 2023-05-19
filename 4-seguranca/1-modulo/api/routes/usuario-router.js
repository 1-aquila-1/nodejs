const { Router } = require('express');
const UsuarioController = require("../controllers/usuario-controller");

const router = Router();

router
    .post("/usuarios", UsuarioController.cadastrar)
    .get("/usuarios")
    .get("/usuarios/id/:id")
    .put("/usuarios/id/:id")
    .delete("/usuarios/id/:id");

    module.exports = router;
