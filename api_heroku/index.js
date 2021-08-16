const express = require('express')
const cors = require('cors')
const { db } = require('./database')
const PORT = 2000

const app = express()

app.use(cors())
app.use(express.json())

db.connect(err => {
    if (err) {
        console.log('error connecting: ' + err.stack)
    }

    console.log('connected to MySQL');
})

app.get('/', (req, res) => {
    res.status(200).send('<h1>Welcome to my API!</h1>')
})

const { productRouter } = require('./routers')
app.use('/product', productRouter)

app.listen(PORT, () => console.log(`Server Running at PORT : ${PORT}`))