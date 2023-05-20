const bodyParser = require('body-parser');
 
const produto = require('./produtoRoute');
const usuario = require("./usuario-router");
const auth = require("./auth-router");

module.exports = app => {
  app.use(
    bodyParser.json(),
    auth,
    produto,
    usuario
  )
}
