const express = require('express')
const cors = require('cors')
const PORT = 2000

const app = express()

app.use(cors())
app.use(express.json())

const { db } = require('./database')

db.connect((err) => {
    if (err) {
        console.error('error connecting: ' + err.message);
        return;
    }

    console.log('connected to MySQL as id ' + db.threadId);
});

app.get('/', (req, res) => {
    res.status(200).send(`<h1>Welcome to My API!</h1>`)
})

const { productRouter } = require('./routers')
app.use('/product', productRouter)

app.listen(PORT, () => console.log(`Server Running at PORT: ${PORT}`))