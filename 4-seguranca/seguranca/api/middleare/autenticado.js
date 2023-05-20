const { verify, decode } = require("jsonwebtoken");
const { secret } = require("../../infra/config/json-secret");

module.exports = async (req, res, next) =>{
    const token = req.headers.authorization;
    if(!token){
        return res.status(401).send({mensagem: "Acess token não informado"});
    }
    const [, acessToken] = token.split(" ");
    try {
        verify(acessToken, secret);
        const { id, email } = decode(acessToken);
        req.auth = {
            id,
            email
        }
        return next();
    } catch (error) {
        return res.status(401).send({mensagem: "Usuário não autorizado"});
    }
}