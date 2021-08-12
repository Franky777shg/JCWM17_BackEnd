const express = require('express')
const cors = require('cors')
const http = require('http')
const socketIO = require('socket.io')
const PORT = 2000

const app = express()
const server = http.createServer(app)

app.use(cors())
app.use(express.json())

//socket configuration
const io = socketIO(server)
let arrMsg = []
app.io = io
app.arrMsg = arrMsg

app.post('/sendmsg', (req, res) => {
    console.log(req.body)
    arrMsg.push(req.body)

    io.emit('chat msg', arrMsg)
    res.status(200).send(arrMsg)
})

io.on('connection', socket => {
    socket.on('JoinChat', data => {
        console.log(data)
    })

    socket.on('disconnect', () => {
        console.log('User Disconnected')
    })
})

server.listen(PORT, () => console.log(`Socket.IO running on PORT : ${PORT}`))