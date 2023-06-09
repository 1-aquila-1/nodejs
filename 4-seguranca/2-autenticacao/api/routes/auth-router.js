const { Router } = require('express');
const AuthController = require("../controllers/auth-controller");

const router = Router();

router
    .post("/auth/login", AuthController.login);

module.exports = router;
