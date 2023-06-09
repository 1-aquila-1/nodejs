import ErroNaoEncontrado from "../error/ErroNaoEncontrado.js";
import { Autor } from "../model/index.js";

export default class AutorController {
  static listarAutores = async (req, res, next) => {
    try{
      let autorResponse = await Autor.find();
      res.status(200).send(autorResponse);
    }catch(error){
      next(error);
    }
  };
  static listarAutorId = async (req, res, next) => {
    const { id } = req.params;
    try {
      let autorResponse = await Autor.findById(id);
      if(autorResponse !== null){
        return res.status(200).json(autorResponse); 
      }
      next(new ErroNaoEncontrado(`Id ${id} do(a) autor(a) não encontrado`));
    } catch (error) {
      next(error);
    }
  };
  static cadastroAutor = async (req, res, next) => {
    try {
      let autor = new Autor(req.body);
      const autorResponse = await autor.save();
      return res.status(201).send(autorResponse.toJSON());
    } catch (error) {
      next(error);
    }
  };
  static atualizarAutor = async (req, res, next) => {
    const { id } = req.params;
    const autorResponse = await Autor.findByIdAndUpdate(id, { $set: req.body });
    if(autorResponse !== null){
      return res.status(200).send({ mensagem: "Autor atualizado com sucesso" });
    }
    next(new ErroNaoEncontrado(`O Id ${id} do autor(a) não foi localizado`));
  };
  static excluirAutor = async (req, res, next) => {
    const { id } = req.params;
    try {
      const autorResponse = await Autor.findByIdAndDelete(id);
      if(autorResponse !== null){
        return res.status(200).send({ mensagem: "Autor foi excluido com sucesso" });
      }
      next(new ErroNaoEncontrado(`O Id ${id} do autor(a) não foi localizado para exclusão`));
    } catch (error) {
      next(error);
    }
  };
}