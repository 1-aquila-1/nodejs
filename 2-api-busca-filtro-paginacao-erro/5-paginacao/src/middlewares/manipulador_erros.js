import mongoose from "mongoose";
import ErroInternoServidor from "../error/ErroInternoServidor.js";
import ErroRequisicaoIncorreta from "../error/ErroRequisicaoIncorreta.js";
import ErroValidacao from "../error/ErroValidacao.js";
import ErroBase from "../error/ErroBase.js";

// eslint-disable-next-line no-unused-vars
export default function manipuladorDeErros(error, req, res, next){
  if(error instanceof mongoose.Error.CastError){
    return new ErroRequisicaoIncorreta().enviarResposta(res);
  }
  if(error instanceof mongoose.Error.ValidationError){
    return new ErroValidacao(error).enviarResposta(res);
  }
  if(error instanceof ErroBase){
    return error.enviarResposta(res);
  }
  return new ErroInternoServidor().enviarResposta(res);
}