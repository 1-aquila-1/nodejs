import Autor from "../model/Autor.js";

export default class AutorController{
    static listarAutores = (req, res) =>{
        Autor.find((err, autor) =>{
            res.status(200).json(autor)
        })
    }
    static listarAutorId = (req, res) =>{
        const { id } = req.params
        Autor.findById(id, (err, autor) =>{
            if(err){
                return res.status(400).send({mensagem: `${err.message} - Falha ao pesquisar Autor`})
            }
            res.status(200).json(autor)
        })
    }
    static cadastroAutor = (req, res) =>{
        let autor = new Autor(req.body)
        autor.save((err)=>{
            if(err){
               return res.status(500).send({mensagem: `${err.message} - Falha ao cadastrar Autores`})
            }
            return res.status(201).send(autor.toJSON())
        })
    }
    static atualizarAutor = (req, res) =>{
        const {id} = req.params
        Autor.findByIdAndUpdate(id,{$set: req.body}, (err)=>{
            if(err){
                return res.status(500).send({mensagem: `${err.message} - Falha ao atualizar Autor`})
            }
            return res.status(200).send({mensagem:"Autor atualizado com sucesso"})
        })
    }

    static excluirAutor = (req, res) =>{
        const {id} = req.params
        Autor.findByIdAndDelete(id, (err)=>{
            if(err){
                return res.status(500).send({mensagem: `${err.message} - Falha ao deletar Autor`})
            }
            return res.status(200).send({mensagem:"Autor foi excluido com sucesso"})
        })
    }

}