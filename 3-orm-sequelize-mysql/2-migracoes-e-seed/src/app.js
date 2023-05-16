import express from "express";

const app = express();
app.use(express.json());

app.get("/teste", (req, res) => res.status(200).send({mensagem: "orm sequelize e mysql"}));

export default app;