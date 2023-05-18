const express = require("express");
const router = require("./router")

const app = express();
router(app);

const port = 3000;

app.listen(port, () => console.log(`servidor está rodando na porta ${port}`));

module.exports = app;