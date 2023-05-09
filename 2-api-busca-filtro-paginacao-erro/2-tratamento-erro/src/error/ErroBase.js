class ErroBase extends Error{
  constructor(mensagem, status){
    super();
    this.message = mensagem;
    this.status = status;
  }
  enviarResposta(res){
    res.status(this.status).send({
      status: this.status,
      mensagem: this.message
    });
  }
}
export default ErroBase;