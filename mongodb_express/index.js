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
        .then(() => {
            Product.find()
                .then(result => {
                    console.log(result)
                    res.status(200).send(result)
                })
                .catch(err => {
                    res.status(400).send(err)
                })
        })
        .catch(err => {
            res.status(400).send(err)
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
            res.status(400).send(err)
        })
})

// filtering
app.post('/filter-data', (req, res) => {
    Product.find(req.body)
        .then(result => {
            console.log(result)
            res.status(200).send(result)
        })
        .catch(err => {
            res.status(400).send(err)
        })
})

// get data by id
app.get('/get-data-id/:id', (req, res) => {
    Product.findById(req.params.id)
        .then(result => {
            console.log(result)
            res.status(200).send(result)
        })
        .catch(err => {
            res.status(400).send(err)
        })
})

// delete data
app.delete('/delete-data/:id', (req, res) => {
    Product.findByIdAndDelete(req.params.id)
        .then(() => {
            Product.find()
                .then(result => {
                    console.log(result)
                    res.status(200).send(result)
                })
                .catch(err => {
                    res.status(400).send(err)
                })
        })
        .catch(err => {
            res.status(400).send(err)
        })
})

// update data
app.post('/update-data/:id', (req, res) => {
    Product.findByIdAndUpdate(req.params.id, req.body)
        .then(() => {
            Product.find()
                .then(result => {
                    console.log(result)
                    res.status(200).send(result)
                })
                .catch(err => {
                    res.status(400).send(err)
                })
        })
        .catch(err => {
            res.status(400).send(err)
        })
})

// grouping data
app.get('/grouping-data', (req, res) => {
    Product.aggregate([
        {
            $group: {
                _id: "$category",
                count: { $sum: 1 }
            }
        }
    ])
        .then(result => {
            res.status(200).send(result)
        })
        .catch(err => {
            res.status(400).send(err)
        })
})

// sorting and limiting data
app.get('/sorting-data', (req, res) => {
    Product.find().sort({ name: 1 }).limit(5).skip(3)
        .then(result => {
            res.status(200).send(result)
        })
        .catch(err => {
            res.status(400).send(err)
        })
})

app.listen(PORT, () => console.log(`Server Running at PORT : ${PORT}`))