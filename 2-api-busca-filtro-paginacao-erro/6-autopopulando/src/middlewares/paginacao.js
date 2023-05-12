import ErroRequisicaoIncorreta from "../error/ErroRequisicaoIncorreta.js";

async function paginar(req, res, next) {
  try {
    let { limite=5, pagina=1, ordenacao = "titulo:1" } = req.query;

    let [campo, ordem] = ordenacao.split(":");

    limite = parseInt(limite);
    pagina = parseInt(pagina);
    ordem = parseInt(ordem);

    const resultado = req.resultado;

    if (isNaN(limite) || isNaN(pagina) || isNaN(ordem)) return next(new ErroRequisicaoIncorreta());
    if (limite <= 0 || pagina <= 0 || (ordem != 1 && ordem != -1)) return next(new ErroRequisicaoIncorreta());

    const resultadoPaginado = await resultado
      .sort({ [campo]: ordem })
      .skip((pagina - 1) * limite)
      .limit(limite);
    return res.status(200).send(resultadoPaginado);
  } catch (error) {
    next(error);
  }
}

export { paginar };