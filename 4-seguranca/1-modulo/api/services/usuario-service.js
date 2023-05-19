const dataBase = require("../../infra/sequelize/models");
const { hash } = require("bcryptjs");
const uuid = require("uuid")

class UsuarioService {
    async cadastrar(dto) {
        const { nome, email, senha } = dto
        const usuario = await dataBase.usuarios.findOne({
            where: {
                email: email
            }
        });
        if (usuario) {
            throw new Error("usuário já cadastro");
        }
        try {
            const senhaHash = await hash(senha, 8);
            const novoUsuario = await dataBase.usuarios.create({
                id: uuid.v4(),
                nome: nome,
                email: email,
                senha: senhaHash
            });
            return novoUsuario;
        } catch (error) {
            throw new Error("Erro ao cadastrar usuário")
        }
    }
}

module.exports = UsuarioService;