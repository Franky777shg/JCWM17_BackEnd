const express = require('express') // untuk membuat server
const cors = require('cors') // untuk menghandle izin sharing data
const fs = require('fs')
const PORT = 2000

const server = express()

server.use(cors())
server.use(express.json())

server.get('/', (req, res) => {
    res.status(200).send('<h1>Wellcome to My API :)</h1>')
})

server.get('/products', (req, res) => {
    let database = fs.readFileSync('./products.json')
    res.status(200).send(JSON.parse(database))
})

server.post('/products', (req, res) => {
    let database = JSON.parse(fs.readFileSync('./products.json'))
    database.push(req.body)

    fs.writeFileSync('./products.json', JSON.stringify(database))

    let newDatabase = fs.readFileSync('./products.json')
    res.status(200).send(JSON.parse(newDatabase))
})

server.delete('/products/:id', (req, res) => {
    let { id } = req.params

    let database = JSON.parse(fs.readFileSync('./products.json'))

    let idProduct =  database.findIndex(item => item.id === +id)
    database.splice(idProduct, 1)

    fs.writeFileSync('./products.json', JSON.stringify(database))

    let newDatabase = fs.readFileSync('./products.json')
    res.status(200).send(JSON.parse(newDatabase))
})

server.put('/products/:id', (req, res) => {
    let { id } = req.params

    let database = JSON.parse(fs.readFileSync('./products.json'))

    let idProduct = database.findIndex(item => item.id === +id)
    database.splice(idProduct, 1, req.body)

    fs.writeFileSync('./products.json', JSON.stringify(database))

    let newDatabase = fs.readFileSync('./products.json')
    res.status(200).send(JSON.parse(newDatabase))
})

server.patch('/products/:id', (req, res) => {
    let { id } = req.params

    let database = JSON.parse(fs.readFileSync('./products.json'))

    let idProduct = database.findIndex(item => item.id === +id)
    
    for (let prop in req.body) {
        for (let prop2 in database[idProduct]) {
            if (prop === prop2) {
                database[idProduct][prop2] = req.body[prop]
            }
        }
    }

    fs.writeFileSync('./products.json', JSON.stringify(database))

    let newDatabase = fs.readFileSync('./products.json')
    res.status(200).send(JSON.parse(newDatabase))
})

// TUGAS!
// 1. Sesuaikan algoritma request kita dengan bentuk database (products.json) yang terbaru
// 2. Buat request untuk get all user, login, register

server.listen(PORT, () => console.log(`Server is Running at PORT : ${PORT}`))