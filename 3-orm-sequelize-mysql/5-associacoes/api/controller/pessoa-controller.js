const database = require("../infra/models");

class PessoaController {
  static async pegaTodasAsPessoas(req, res) {
    try {
      const todasAsPessoas = await database.Pessoas.findAll();
      return res.status(200).send(todasAsPessoas);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }
  static async pegaUmaPessoa(req, res) {
    try {
      const { id } = req.params
      const umaPessoa = await database.Pessoas.findOne({
        where: {
          id: Number(id)
        }
      });
      return res.status(200).send(umaPessoa);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }
  static async criaPessoa(req, res) {
    try {
      const novaPessoa = req.body
      const pessoaCriada = await database.Pessoas.create(novaPessoa);
      return res.status(200).send(pessoaCriada);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }
  static async atualizaPessoa(req, res) {
    try {
      const { id } = req.params
      const novaInfo = req.body
      const pessoaAtualizada = await database.Pessoas.update(novaInfo, {
        where: {
          id: Number(id)
        }
      });
      if (pessoaAtualizada[0] === 1) {
        return res.status(200).send({
          mensagem: "Atualização realizada com sucesso"
        });
      }
      return res.status(400).send({
        mensagem: "Erro ao atualizar informação"
      });
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }
  static async apagaPessoa(req, res) {
    try {
      const { id } = req.params
      const removePessoa = await database.Pessoas.destroy({
        where: {
          id: Number(id)
        }
      });
      if (removePessoa === 1) {
        return res.status(200).send({
          mensagem: `A informação vinculada ao código ${id} foi excluido com sucesso.`,
        });
      }
      return res.status(400).send({
        mensagem: `Erro ao remover informação vinculado ao código ${id}.`
      });
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }
}

module.exports = PessoaController;