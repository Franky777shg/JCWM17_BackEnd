const { db } = require('../database')

module.exports = {
    login: (req, res) => {
        const { username, password } = req.body

        const getUser = `select * from users where username = ${db.escape(username)} and password = ${db.escape(password)};`
        console.log(getUser)

        db.query(getUser, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(result)
            }

            res.status(200).send(result)
        })
    },
    register: (req, res) => {
        const { username, password, email } = req.body

        if (!username || !password || !email) {
            res.status(400).send('Please input all of data!')
            return
        }

        const checkUser = `select * from users where username = ${db.escape(username)};`

        db.query(checkUser, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(result)
            } else if (result.length !== 0) {
                res.status(400).send('Username already used!')
            } else if (result.length === 0) {

                const addUser = `insert into users set ?`

                db.query(addUser, req.body, (err, result) => {
                    if (err) {
                        console.log(err)
                        res.status(400).send(result)
                    }

                    res.status(200).send('berhasil')
                })
            }
        })

    }
}