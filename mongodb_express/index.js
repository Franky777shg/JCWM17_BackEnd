const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const PORT = 2000

const app = express()
dotenv.config()

app.use(cors())
app.use(express.json())

// set up mongo db
mongoose.connect(process.env.MONGO_DB,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err) => {
        if (err) {
            return console.log(err)
        }

        console.log('Connect to MongoDB')
    })

app.get('/', (req, res) => {
    res.status(200).send('<h1>Welcome to API MongoDB :) </h1>')
})

// create database or schema rules
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    }
})

// create model
const Product = mongoose.model('products', productSchema)

// create data
app.post('/add-data', (req, res) => {
    const { name, price, quantity, category } = req.body

    if (!name || !price || !quantity || !category) {
        return res.status(400).send('Please input all of data!')
    }

    // create new data product
    const newProduct = new Product({
        name,
        price,
        quantity,
        category
    })

    newProduct.save()
        .then(result => {
            console.log(result)
            res.status(200).send(result)
        })
        .catch(err => {
            console.log(err)
        })
})

// get data
app.get('/get-data', (req, res) => {
    Product.find()
        .then(result => {
            console.log(result)
            res.status(200).send(result)
        })
        .catch(err => {
            console.log(err)
        })
})

// filtering
app.get('/filter-data', (req, res) => {
    Product.find({ category: "Cloth" })
        .then(result => {
            console.log(result)
            res.status(200).send(result)
        })
        .catch(err => {
            console.log(err)
        })
})

// TUGAS!
// 1. filter flexible
// 2. update
// 3. delete
// 4. get by id

app.listen(PORT, () => console.log(`Server Running at PORT : ${PORT}`))