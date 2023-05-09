import ErroNaoEncontrado from "../error/ErroNaoEncontrado.js";
import { Livro } from "../model/index.js";

export default class LivroController{
  static listarLivros = async (req, res, next) =>{
    try {
      let livroResponse = await Livro.find().populate("autor").exec(); 
      res.status(200).json(livroResponse);
    } catch (error) {
      next(error);
    }
  };
  static listarLivroId = async (req, res, next) =>{
    const { id } = req.params;
    try {
      let livroResponse = await Livro.findById(id).populate("autor", "nome").exec();   
      res.status(200).json(livroResponse);
    } catch (error) {
      next(error);
    }
  };
  static listarLivroPorEditora = async (req, res, next) =>{
    const { editora } = req.query;
    try {
      let livroResponse = await Livro.find({"editora": editora},{});
      res.status(200).send(livroResponse);
    } catch (error) {
      next(error);
    }
  };
  static cadastroLivro = async (req, res, next) =>{
    try {
      let livro = new Livro(req.body);
      const livroResponse = await livro.save();
      return res.status(201).send(livroResponse.toJSON());
    } catch (error) {
      next(error);
    }
  };
  static atualizarLivro = async (req, res, next) =>{
    try {
      const {id} = req.params;
      const livroResponse = await Livro.findByIdAndUpdate(id,{$set: req.body});
      if(livroResponse !== null){
        return res.status(200).send({mensagem:"Livro atualizado com sucesso"});
      }
      next(new ErroNaoEncontrado(`O Id ${id} do livro não foi localizado`));
    } catch (error) {
      next(error);
    }
  };
  static excluirLivro = async (req, res, next) =>{
    const {id} = req.params;
    try {
      const livroResponse = await Livro.findByIdAndDelete(id);
      if(livroResponse !== null){
        return res.status(200).send({mensagem:"Livro foi excluido com sucesso"}); 
      }
      next(new ErroNaoEncontrado(`O Id ${id} do livro não foi localizado`));
    } catch (error) {
      next(error);
    }
  };
}