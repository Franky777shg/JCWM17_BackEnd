const jwt = require('jsonwebtoken')

module.exports = {
    createToken: (payload) => {
        let token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '5h' })
        return token
    },
    verifyToken: (req, res, next) => {
        let result = jwt.verify(req.token, process.env.JWT_KEY)

        req.user = result

        next()
    }
}