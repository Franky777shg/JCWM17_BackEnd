const http = require('http')
const fs = require('fs')
const url = require('url')
const PORT = 2000

const server = http.createServer((req, res) => {
    const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE",
    }

    if (req.url.includes('products')) {
        if (req.method === 'GET') {
            // cara ambil data dari products.json
            let database = fs.readFileSync('./products.json')

            res.writeHead(200, headers)
            res.end(database)
        } else if (req.method === 'POST') {
            let data

            req.on('data', (chunk) => {
                data = chunk.toString()
            })
            req.on('end', () => {
                let obj = JSON.parse(data)

                let database = JSON.parse(fs.readFileSync('./products.json').toString())
                database.push(obj)

                fs.writeFileSync('./products.json', JSON.stringify(database))

                let newDatabase = fs.readFileSync('./products.json')

                res.writeHead(200, headers)
                res.end(newDatabase)
            })
        } else if (req.method === 'DELETE') {
            let link = req.url
            let linkParse = url.parse(link, true)
            let id = +linkParse.query.id

            let database = JSON.parse(fs.readFileSync('./products.json').toString())
            let delDatabase = database.filter(item => item.id !== id)
            console.log(delDatabase)

            fs.writeFileSync('./products.json', JSON.stringify(delDatabase))

            let newDatabase = fs.readFileSync('./products.json')

            res.writeHead(200, headers)
            res.end(newDatabase)
        } else if (req.method === 'PUT') {
            let link = req.url
            let linkParse = url.parse(link, true)
            let id = +linkParse.query.id

            let data

            req.on('data', (chunk) => {
                data = chunk.toString()
            })
            req.on('end', () => {
                let obj = JSON.parse(data)

                let database = JSON.parse(fs.readFileSync('./products.json').toString())

                let idPut = database.findIndex(item => item.id == id)
                database.splice(idPut, 1, obj)

                fs.writeFileSync('./products.json', JSON.stringify(database))

                let newDatabase = fs.readFileSync('./products.json')

                res.writeHead(200, headers)
                res.end(newDatabase)
            })
        } else if (req.method === 'PATCH') {
            
        }
    }
})

server.listen(PORT, () => console.log(`Server is Running at PORT : ${PORT}`))