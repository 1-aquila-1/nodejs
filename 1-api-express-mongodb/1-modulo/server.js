const http = require("http")
const port = 3000

const rotas = {
    '/': 'Curso de Node',
    '/livros': 'Entrei na pag de livros',
    '/autores': 'Listagem de autores',
    '/info': 'Informação sobre projeto'
}

const server = http.createServer((req, resp) =>{
    resp.writeHead(200, {
        'Content-Type': 'text/plain'
    })
    resp.end(rotas[req.url])
})

server.listen(port,()=>{
    console.log(`Servidor na porta ${port}`)
})
