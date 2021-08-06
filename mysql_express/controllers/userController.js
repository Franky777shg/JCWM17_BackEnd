const { db } = require('../database')
const crypto = require('crypto')
const { createToken } = require('../helpers/jwt')

module.exports = {
    login: (req, res) => {
        const { username, password } = req.body

        let hashPassword = crypto.createHmac('sha1', 'hash123').update(req.body.password).digest('hex')

        const getUser = `select * from users where username = ${db.escape(username)} and password = ${db.escape(hashPassword)};`
        console.log(getUser)

        db.query(getUser, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }
            result[0]

            let token = createToken({
                idusers: result[0].idusers
            })

            res.status(200).send({
                dataUser: result[0],
                token
            })
        })
    },
    register: (req, res) => {
        const { username, password, email } = req.body

        if (!username || !password || !email) {
            res.status(400).send('Please input all of data!')
            return
        }

        req.body.password = crypto.createHmac('sha1', 'hash123').update(req.body.password).digest('hex')

        const checkUser = `select * from users where username = ${db.escape(username)};`

        db.query(checkUser, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            } else if (result.length !== 0) {
                res.status(400).send('Username already used!')
            } else if (result.length === 0) {

                const addUser = `insert into users set ?`

                db.query(addUser, req.body, (err2, result2) => {
                    if (err2) {
                        console.log(err2)
                        res.status(400).send(err2)
                    }

                    res.status(200).send('berhasil')
                })
            }
        })
    },
    keeplogin: (req, res) => {
        const getUser = `select * from users where idusers = ${db.escape(req.params.id)}`

        db.query(getUser, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }

            res.status(200).send(result)
        })
    }
}