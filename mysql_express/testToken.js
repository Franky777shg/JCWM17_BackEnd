const jwt = require('jsonwebtoken')

let token = jwt.sign({ username: "Budi" }, 'asd123')
console.log(token)