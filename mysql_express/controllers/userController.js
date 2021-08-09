const { db } = require('../database')
const crypto = require('crypto')
const { createToken } = require('../helpers/jwt')
const transporter = require('../helpers/nodemailer')

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
            console.log(result[0])

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
                    console.log(result2)

                    let token = createToken({
                        idusers: result2.insertId
                    })

                    let info = transporter.sendMail({
                        from: '"ADMIN" <frengky.sihombing.777@gmail.com>', // sender address
                        to: `${email}`, // list of receivers
                        subject: `Email Verification for ${username}`, // Subject line
                        text: 'Hello World', // plain text body
                        html: `<a href="http://localhost:3000/verification/${token}">Click Here to Verify Your Account!</a>`, // html body
                    });

                    res.status(200).send('berhasil')
                })
            }
        })
    },
    keeplogin: (req, res) => {
        console.log(req.user)
        const getUser = `select * from users where idusers = ${db.escape(req.user.idusers)}`

        db.query(getUser, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }

            console.log(result)
            res.status(200).send(result)
        })
    },
    verification: (req, res) => {
        console.log(req.user)
        const updateUser = `update users set status = 'verified' where idusers = ${db.escape(req.user.idusers)}`

        db.query(updateUser, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }

            console.log(result)
            res.status(200).send('berhasil')
        })
    }
}