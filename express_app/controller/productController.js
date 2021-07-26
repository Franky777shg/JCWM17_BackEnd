const fs = require('fs')

module.exports = {
    getAllProducts: (req, res) => {
        let database = fs.readFileSync('./products.json')
        res.status(200).send(JSON.parse(database))
    },
    addProduct: (req, res) => {
        let database = JSON.parse(fs.readFileSync('./products.json'))
        console.log(req.body)

        let newProductID = database[database.length - 1].id + 1
        req.body.id = newProductID

        database.push(req.body)

        fs.writeFileSync('./products.json', JSON.stringify(database))

        let newDatabase = fs.readFileSync('./products.json')
        res.status(200).send(JSON.parse(newDatabase))
    },
    deleteProduct: (req, res) => {
        let { id } = req.params

        let database = JSON.parse(fs.readFileSync('./products.json'))

        let idProduct = database.findIndex(item => item.id === +id)
        database.splice(idProduct, 1)

        fs.writeFileSync('./products.json', JSON.stringify(database))

        let newDatabase = fs.readFileSync('./products.json')
        res.status(200).send(JSON.parse(newDatabase))
    },
    putProduct: (req, res) => {
        let { id } = req.params

        let database = JSON.parse(fs.readFileSync('./products.json'))

        let idProduct = database.findIndex(item => item.id === +id)
        database.splice(idProduct, 1, req.body)

        fs.writeFileSync('./products.json', JSON.stringify(database))

        let newDatabase = fs.readFileSync('./products.json')
        res.status(200).send(JSON.parse(newDatabase))
    },
    patchProduct: (req, res) => {
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
    }
}