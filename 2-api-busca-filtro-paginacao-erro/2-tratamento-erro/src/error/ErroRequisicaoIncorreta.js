import ErroBase from "./ErroBase.js";

class ErroRequisicaoIncorreta extends ErroBase{
  constructor(){
    super("Um ou mas dados foram enviado incorretos", 400);
  }
}

export default ErroRequisicaoIncorreta;