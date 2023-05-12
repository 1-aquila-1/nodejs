import express from "express";
import routes from "./router/index.js";
import db from "./config/db_connect.js";
import manipuladorDeErros from "./middlewares/manipulador_erros.js";
import manipulador404 from "./middlewares/manipulador404.js";

db.on("error", console.log.bind(console, "erro de conexão"));
db.once("open", ()=>{
  console.log("Conexão com o banco feita com sucesso");
});


const app = express();
app.use(express.json());
routes(app);
// Os middlewares precisa ser registrado em sequência da sua execução.
// No caso o middlewar manipulador404 tem que ser registrado após o routes(app)
//porque ele vai tratar erro de rota que não existe.
app.use(manipulador404);
app.use(manipuladorDeErros);


export default app;