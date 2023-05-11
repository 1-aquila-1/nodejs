import ErroNaoEncontrado from "../error/ErroNaoEncontrado.js";

// eslint-disable-next-line no-unused-vars
function manipulador404(req, res, next){
  const erro404 = new ErroNaoEncontrado();
  next(erro404);
}

export default manipulador404;