const express = require('express') // untuk membuat server
const cors = require('cors') // untuk menghandle izin sharing data
const PORT = 2000

const server = express()

server.use(cors())
server.use(express.json())

server.get('/', (req, res) => {
    res.status(200).send('<h1>Wellcome to My API :)</h1>')
})

const { userRouter, productRouter } = require('./router')
server.use('/product', productRouter)
server.use('/user', userRouter)

server.listen(PORT, () => console.log(`Server is Running at PORT : ${PORT}`))