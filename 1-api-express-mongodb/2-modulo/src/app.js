import express from 'express'

const app = express();

app.use(express.json())

const livros = [
    { id: 1, titulo: "Senhor dos Aneis" },
    { id: 2, titulo: "Hobiit" }
]

app.get('/', (req, resp) => {
    resp.status(200).send("Curso de livros")
})

app.get('/livros', (req, resp) => {
    resp.status(200).json(livros)
})

app.get('/livros/:id', (req, res) => {
    let index = buscarLivro(req.params.id)
    res.json(livros[index])
})

app.post('/livros', (req, resp) => {
    livros.push(req.body)
    resp.status(201).send("Livro adicionado com sucesso")
})
app.put('/livros/:id', (req, res) => {
    let index = buscarLivro(req.params.id)
    livros[index].titulo = req.body.titulo
    res.json(livros)
})

app.delete('/livros/:id', (req, res) => {
    let { id } = req.params
    let index = buscarLivro(id)
    livros.splice(index, 1)
    res.send(`Livro de ID ${id} excluido com sucesso`)
})

const buscarLivro = (id) => {
    return livros.findIndex(livro => livro.id == id)
}
export default app