import ErroBase from "./ErroBase.js";

class ErroValidacao extends ErroBase{
  constructor(error){
    const mensagemErro = Object.values(error.errors).map(err => err.message).join("; ");
    super(`Os seguintes erros foram encontrados: ${mensagemErro}`, 400);
  }
}

export default ErroValidacao;