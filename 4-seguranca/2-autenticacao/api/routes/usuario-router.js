const { Router } = require('express');
const UsuarioController = require("../controllers/usuario-controller");
const autenticado = require("../middleare/autenticado");

const router = Router();

router.use(autenticado);

router
    .post("/usuarios", UsuarioController.cadastrar)
    .get("/usuarios", UsuarioController.listar);

    module.exports = router;
