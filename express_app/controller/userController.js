const fs = require('fs')
const database = JSON.parse(fs.readFileSync('./users.json'))

module.exports = {
    getAllUsers: (req, res) => {
        res.status(200).send(database)
    },
    login: (req, res) => {
        const { username, password } = req.body

        let result = database.filter(item => item.username === username && item.password === password)

        if (result.length === 0) return res.status(400).send('Username/Password is Invalid')

        res.status(200).send(result[0])
    },
    register: (req, res) => {
        const { id, username, password } = req.body

        if (!id || !username || !password) return res.status(400).send('Input all of data!')

        let checkUsername = database.filter(item => item.username === username)

        if (checkUsername.length !== 0) return res.status(400).send('Username already used')

        database.push(req.body)

        fs.writeFileSync('./users.json', JSON.stringify(database))

        res.status(200).send({
            status: "Register Success",
            data: req.body
        })
    },
    keeplogin: (req, res) => {
        const idUser = +req.params.id

        let searchUser = database.filter(item => item.id === idUser)

        res.status(200).send(searchUser[0])
    }
}