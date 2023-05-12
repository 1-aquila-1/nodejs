import mongoose from "mongoose";

const livroSchema = new mongoose.Schema(
  {
    id: { type: String },
    titulo: { type: String, required: true },
    autor: { 
      type: mongoose.Schema.Types.ObjectId, ref: "autor", 
      required: true 
    },
    editora: { 
      type: String, 
      required: true,
      enum:{
        values: ["Casa do código", "Alura"],
        message: "A editora fornecida não é um valor permitido"
      }
    },
    numeroPaginas: { 
      type: Number,
      validate:{
        validator: (valor) =>{
          return valor >=10 && valor <= 1000;
        },
        message: "O números de páginas deve está entre 10 a 1000. Valor informado {VALUE}"
      }
    }
  }
);
const Livro = mongoose.model("livros", livroSchema);
export default Livro;