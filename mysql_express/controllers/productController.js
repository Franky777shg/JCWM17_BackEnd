const { db } = require('../database')

module.exports = {
    getAllProd: (req, res) => {
        let getQuery = `select * from products;`

        db.query(getQuery, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }

            res.status(200).send(result)
        })
    },
    getProductById: (req, res) => {
        let getQuery = `select * from products where idproducts = ${req.params.id}`

        db.query(getQuery, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }
            res.status(200).send(result)
        })
    },
    addProduct: (req, res) => {
        let addQuery = `insert into products set ?;`

        db.query(addQuery, req.body, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }

            const getAllProducts = `select * from products;`

            db.query(getAllProducts, (err2, result2) => {
                if (err2) {
                    console.log(err2)
                    res.status(400).send(err2)
                }

                res.status(200).send(result2)
            })
        })
    },
    deleteProduct: (req, res) => {
        const delProduct = `delete from products where idproducts = ${req.params.id}`

        db.query(delProduct, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }

            const getAllProducts = `select * from products;`

            db.query(getAllProducts, (err2, result2) => {
                if (err2) {
                    console.log(err2)
                    res.status(400).send(err2)
                }

                res.status(200).send(result2)
            })
        })
    },
    updateProduct: (req, res) => {
        const updateProduct = `update products set ? where idproducts = ${req.params.id}`

        db.query(updateProduct, req.body, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }

            const getAllProducts = `select * from products;`

            db.query(getAllProducts, (err2, result2) => {
                if (err2) {
                    console.log(err2)
                    res.status(400).send(err2)
                }

                res.status(200).send(result2)
            })
        })
    },
    sortingProduct: (req, res) => {
        const sortingProduct = `select * from products order by name;`

        db.query(sortingProduct, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }

            res.status(200).send(result)
        })
    }
}