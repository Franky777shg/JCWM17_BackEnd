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
    }
    // TUGAS!
    // 1. get product by id
    // 2. add product
    // 3. delete product
    // 4. edit product
}