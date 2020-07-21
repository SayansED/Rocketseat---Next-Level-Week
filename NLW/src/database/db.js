// importar a dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose()
// criar o objeto de banco de dados - operações
const db = new sqlite3.Database("./nlw/src/database/database.db")

module.exports = db

/*
// operações
db.serialize(() => {
    //create table
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT, 
            address TEXT, 
            address2 TEXT,
            state TEXT, 
            city TEXT,
            items TEXT
        );
    `)

    // insert files
    const query = `
        INSERT INTO places (
            image, 
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
        ` 
    const values = [
        "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=801&q=80",
        "Colectoria",
        "Guilherme Gemballa, Jardim América",
        "Numero 260",
        "Santa Catarina",
        "Rio do Sul",
        "Resíduos Eletrônicos, Lâmpadas"
    ]
    function afterInsertData(err) {
        if(err) {
            return console.log(err)
        }
        console.log("Cadastro com sucesso")
        console.log(this)
    }
    //db.run(query, values, afterInsertData) // inserindo dados

    // consult files
    db.all(`SELECT * FROM places`, function(err, rows) {
        if(err) {
            return console.log(err)
        }
        console.log("Registros: ")
        console.log(rows)

    })

    // delete files
    db.run(`DELETE FROM places WHERE id = ?`, [1], function(err) {
        if(err) {
            return console.log(err)
        }
        console.log("Registro deletado com sucesso")
    })

    // consult files
    // está vazio
    db.all(`SELECT * FROM places`, function(err, rows) {
        if(err) {
            return console.log(err)
        }
        console.log("Registros: ")
        console.log(rows)

    })
}) 
*/