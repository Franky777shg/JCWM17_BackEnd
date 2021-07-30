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
}