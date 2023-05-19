const dataBase = require("../../infra/models");
const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const { secret } = require("../../infra/config/json-secret");
class AuthService {
    async login(dto) {
        const { email, senha } = dto;
        const usuario = await dataBase.usuarios.findOne({
            attributes: ["id", "email", "senha"],
            where: {
                email: email,
            }
        });
        
        if (!usuario) {
            throw new Error("Usuário não cadastrado");
        }

        const senhaIgaul = await compare(senha, usuario.senha);
        if(!senhaIgaul){
            throw new Error("Senha invalida");
        }

        const accessToken = sign(
            {
                id: usuario.id,
                email: usuario.email
            },
            secret,
            {
                expiresIn: 86400
            }
        );
        return { accessToken }
    }
}

module.exports = AuthService;