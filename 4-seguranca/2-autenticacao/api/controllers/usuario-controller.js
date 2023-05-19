const UsuarioService = require("../services/usuario-service");

const usuarioService = new UsuarioService();

class UsuarioController {
    static async cadastrar(req, res) {
        try {
            const { nome, email, senha } = req.body;
            const usuario = await usuarioService.cadastrar({nome, email, senha});
            return res.status(201).send(usuario);
        } catch (error) {
            res.status(400).send({
                mensagem: error.message
            })
        }
    }
    static async listar(req, res) {
        try {
            const usuarios = await usuarioService.listar();
            return res.status(201).send(usuarios);
        } catch (error) {
            res.status(400).send({
                mensagem: error.message
            })
        }
    }
}

module.exports = UsuarioController;