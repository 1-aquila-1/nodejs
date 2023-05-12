import mongoose from "mongoose";

const autorSchema = new mongoose.Schema(
  {
    id: {type: String},
    nome: {
      type: String, 
      required: [true, "O campo nome é obrigatório"],
    },
    nacionalidade: {type: String}
  },
  {
    versionKey: false
  }
);

const Autor = mongoose.model("autor", autorSchema);
export default Autor; 