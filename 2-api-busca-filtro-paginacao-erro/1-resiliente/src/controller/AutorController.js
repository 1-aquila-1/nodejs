import mongoose from "mongoose";
import Autor from "../model/Autor.js";

export default class AutorController {
  static listarAutores = async (req, res) => {
    try{
      let autorResponse = await Autor.find();
      res.status(200).send(autorResponse);
    }catch(erro){
      res.status(400).send({mensagem: "Ocorreu um erro ao buscar autores"});
    }

  };
  static listarAutorId = async (req, res) => {
    const { id } = req.params;
    try {
      let autorResponse = await Autor.findById(id);
      if(autorResponse !== null){
        return res.status(200).json(autorResponse); 
      }
      return res.status(404).send({ mensagem: "Id do autor não encontrado" });
    } catch (error) {
      if(error instanceof mongoose.Error.CastError){
        return res.status(400).send({ mensagem: "Um ou mas dados fornecido estão incorreto"});
      }
      return res.status(500).send({ mensagem: `${error.message} - Falha no servidor` });
    }
  };
  static cadastroAutor = async (req, res) => {
    let autor = new Autor(req.body);
    try {
      await autor.save();
      res.status(201).send(autor.toJSON());
    } catch (error) {
      res.status(500).send({ mensagem: `${error.message} - Falha ao cadastrar Autores` });
    }
  };
  static atualizarAutor = (req, res) => {
    const { id } = req.params;
    Autor.findByIdAndUpdate(id, { $set: req.body }, (err) => {
      if (err) {
        return res.status(500).send({ mensagem: `${err.message} - Falha ao atualizar Autor` });
      }
      return res.status(200).send({ mensagem: "Autor atualizado com sucesso" });
    });
  };
  static excluirAutor = async (req, res) => {
    const { id } = req.params;
    try {
      await Autor.findByIdAndDelete(id);
      res.status(200).send({ mensagem: "Autor foi excluido com sucesso" });
    } catch (error) {
      res.status(500).send({ mensagem: `${error.message} - Falha ao deletar Autor` });
    }
  };
}