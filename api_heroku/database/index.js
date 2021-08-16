const mysql = require('mysql')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'Frengky777',
    password: 'Mysql123',
    database: 'practice_jcwm17',
    port: 3306
})

module.exports = { db }