const bodyParser = require("body-parser");
const pessoas = require("./pessoa-router");

module.exports  = app =>{
    app.use(bodyParser.json());
    app.use(pessoas);
}