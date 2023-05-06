import express from 'express'
import routes from './router/index.js'
import db from './config/db_connect.js'

db.on("error", console.log.bind(console, 'erro de conexão'))
db.once("open", ()=>{
    console.log("Conexão com o banco feita com sucesso")
})

const app = express();
app.use(express.json())
routes(app)

export default app