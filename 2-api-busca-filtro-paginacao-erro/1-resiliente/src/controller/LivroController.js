import Livro from "../model/Livro.js";

export default class LivroController{
  static listarLivros = async (req, res) =>{
    try {
      let livroResponse = await Livro.find().populate("autor").exec(); 
      res.status(200).json(livroResponse);
    } catch (error) {
      res.status(400).send({mensagem: `${error.message} - Falha ao pesquisar livro`});
    }
  };
  static listarLivroId = async (req, res) =>{
    const { id } = req.params;
    try {
      let livroResponse = await Livro.findById(id).populate("autor", "nome").exec();   
      res.status(200).json(livroResponse);
    } catch (error) {
      res.status(400).send({mensagem: `${error.message} - Falha ao pesquisar livro`});
    }
  };
  static listarLivroPorEditora = async (req, res) =>{
    const { editora } = req.query;
    try {
      let livroResponse = await Livro.find({"editora": editora},{});
      res.status(200).send(livroResponse);
    } catch (error) {
      res.status(400).send({mensagem: `${error.message} - Falha ao pesquisar livros por editora`});
    }
  };
  static cadastroLivro = (req, res) =>{
    let livro = new Livro(req.body);
    livro.save((err)=>{
      if(err){
        return res.status(500).send({mensagem: `${err.message} - Falha ao cadastrar livros`});
      }
      return res.status(201).send(livro.toJSON());
    });
  };
  static atualizarLivro = (req, res) =>{
    const {id} = req.params;
    Livro.findByIdAndUpdate(id,{$set: req.body}, (err)=>{
      if(err){
        return res.status(500).send({mensagem: `${err.message} - Falha ao atualizar livro`});
      }
      return res.status(200).send({mensagem:"Livro atualizado com sucesso"});
    });
  };
  static excluirLivro = async (req, res) =>{
    const {id} = req.params;
    try {
      await Livro.findByIdAndDelete(id);
      res.status(200).send({mensagem:"Livro foi excluido com sucesso"});  
    } catch (error) {
      res.status(500).send({mensagem: `${error.message} - Falha ao deletar livro`});
    }
  };
}