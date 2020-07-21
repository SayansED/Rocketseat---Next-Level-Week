const express = require("express")
const server = express()

// Conectar ao banco
const db = require("./database/db.js")

// configurar pasta publica 
server.use(express.static("nlw/public"))

// habilitar req.body
server.use(express.urlencoded({ extended: true }))

// utilizar template engine
const nunjucks = require("nunjucks")
nunjucks.configure("nlw/src/views", {
    express: server,
    noCache: true
})

// configurar caminhos da minha aplicação
// page inicial
// req: requisição 
// res: resposta
server.get("/", (req, res) => {
    return res.render("index.html", { title: "Seu marketplace de coleta de resíduos" })
})

server.get("/create-point", (req, res) => {
    //req.query: Query string da url
    //console.log(req.query) 
    return res.render("create-point.html")
})

server.post("/create-point", (req, res) => {
    //req.body: O corpo do nosso formulário
    //console.log(req.body)
    // inserir dados no bd
    const query = `
INSER INTO places (
    image,
    name, 
    address,
    address2,
    state,
    city,
    items
) VALUES (?, ?, ?, ?, ?, ?, ?);
`

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items,
    ]

    function afterInsertData(err) {
        if (err) {
            console.log(err)
            return res.send("Erro no cadastro!")
        }
        console.log("Cadastrado com sucesso")
        console.log(this)
        return res.send("create-point.html", { saved: true })
    }
    db.run(query, values, afterInsertData)
})

server.get("/search", (req, res) => {
    const search = req.query.search
    if(search == "") {
        // pesquisa vazia
        return res.render("search-results.html", { total: 0 })
    }
    //buscar dados no banco de dados
    // consult files
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
        if (err) {
            return console.log(err)
        }
        console.log("Registros: ")
        console.log(rows)
        const total = rows.length // qtd elementos
        // page com os dados
        return res.render("search-results.html", { places: rows, total: total })
    })
})

server.listen(3000)