import ErroNaoEncontrado from "../error/ErroNaoEncontrado.js";
import { Autor, Livro } from "../model/index.js";

export default class LivroController {
  static listarLivros = (req, res, next) => {
    try {
      req.resultado = Livro.find();
      next();
    } catch (error) {
      return next(error);
    }
  };
  static listarLivroId = async (req, res, next) => {
    const { id } = req.params;
    try {
      let livroResponse = await Livro.findById(id,{}, {autopopulate: false}).populate("autor");
      res.status(200).send(livroResponse);
    } catch (error) {
      next(error);
    }
  };
  static listarLivroPorFiltro = async (req, res, next) => {
    try {
      const busca = await processaBusca(req.query);
      if (!busca) {
        return res.status(200).send([]);
      }
      req.resultado = Livro.find(busca).populate("autor");
      next();
    } catch (error) {
      next(error);
    }
  };
  static cadastroLivro = async (req, res, next) => {
    try {
      let livro = new Livro(req.body);
      const livroResponse = await livro.save();
      return res.status(201).send(livroResponse.toJSON());
    } catch (error) {
      next(error);
    }
  };
  static atualizarLivro = async (req, res, next) => {
    try {
      const { id } = req.params;
      const livroResponse = await Livro.findByIdAndUpdate(id, { $set: req.body });
      if (livroResponse !== null) {
        return res.status(200).send({ mensagem: "Livro atualizado com sucesso" });
      }
      next(new ErroNaoEncontrado(`O Id ${id} do livro não foi localizado`));
    } catch (error) {
      next(error);
    }
  };
  static excluirLivro = async (req, res, next) => {
    const { id } = req.params;
    try {
      const livroResponse = await Livro.findByIdAndDelete(id);
      if (livroResponse !== null) {
        return res.status(200).send({ mensagem: "Livro foi excluido com sucesso" });
      }
      next(new ErroNaoEncontrado(`O Id ${id} do livro não foi localizado`));
    } catch (error) {
      next(error);
    }
  };

}
async function processaBusca(query) {
  const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = query;
  let busca = {};
  if (editora) busca.editora = editora;
  if (titulo) busca.titulo = { $regex: titulo, $options: "i" };

  if (minPaginas | maxPaginas) busca.numeroPaginas = {};

  if (minPaginas) busca.numeroPaginas.$gte = minPaginas;
  if (maxPaginas) busca.numeroPaginas.$lte = maxPaginas;

  if (nomeAutor) {
    const autorResponse = await Autor.findOne({ nome: nomeAutor });
    if (autorResponse === null) {
      return null;
    }
    busca.autor = autorResponse._id;
  }
  return busca;
}