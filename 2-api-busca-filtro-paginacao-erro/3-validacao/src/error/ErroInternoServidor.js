import ErroBase from "./ErroBase.js";

export default class ErroInternoServidor extends ErroBase{
  constructor(){
    super("Erro interno no servidor", 500);
  }
}