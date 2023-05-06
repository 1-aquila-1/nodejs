import mongoose from "mongoose";

const autorSchema = new mongoose.Schema(
    {
        id: {type: String},
        nome: {type: String, required: true},
        nacionalidade: {type: String}
    },
    // Desabilitar o versionamento
    {
        versionKey: false
    }
)

const Autor = mongoose.model("autor", autorSchema)
export default Autor 