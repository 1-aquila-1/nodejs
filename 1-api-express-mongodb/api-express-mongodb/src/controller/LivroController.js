import Livro from "../model/Livro.js";

export default class LivroController{
    static listarLivros = (req, res) =>{
        Livro.find()
            .populate("autor")
            .exec((err, livro) =>{
            res.status(200).json(livro)
        })
    }
    static listarLivroId = (req, res) =>{
        const { id } = req.params
        Livro.findById(id)
            .populate("autor", "nome")
            .exec((err, livro) =>{
            if(err){
                return res.status(400).send({mensagem: `${err.message} - Falha ao pesquisar livro`})
            }
            res.status(200).json(livro)
        })
    }
    static listarLivroPorEditora = (req, res) =>{
        const { editora } = req.query
        Livro.find({'editora': editora},{},(err, livros) =>{
            if(err){
                return res.status(400).send({mensagem: `${err.message} - Falha ao pesquisar livros por editora`})
            }
            return res.status(200).send(livros)
        })
    }
    static cadastroLivro = (req, res) =>{
        let livro = new Livro(req.body)
        livro.save((err)=>{
            if(err){
               return res.status(500).send({mensagem: `${err.message} - Falha ao cadastrar livros`})
            }
            return res.status(201).send(livro.toJSON())
        })
    }
    static atualizarLivro = (req, res) =>{
        const {id} = req.params
        Livro.findByIdAndUpdate(id,{$set: req.body}, (err)=>{
            if(err){
                return res.status(500).send({mensagem: `${err.message} - Falha ao atualizar livro`})
            }
            return res.status(200).send({mensagem:"Livro atualizado com sucesso"})
        })
    }

    static excluirLivro = (req, res) =>{
        const {id} = req.params
        Livro.findByIdAndDelete(id, (err)=>{
            if(err){
                return res.status(500).send({mensagem: `${err.message} - Falha ao deletar livro`})
            }
            return res.status(200).send({mensagem:"Livro foi excluido com sucesso"})
        })
    }

}