const { db } = require('../database')

module.exports = {
    getAllProducts: (req, res) => {
        const getQuery = 'select * from products;'

        db.query(getQuery, (err, result) => {
            if (err) {
                res.status(400).send(err)
            }

            res.status(200).send(result)
        })
    }
}