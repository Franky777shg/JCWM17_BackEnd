const express = require('express')
// const cors = require('cors')
const http = require('http')
const socketIO = require('socket.io')
const PORT = 2000

const app = express()
const server = http.createServer(app)

// app.use(cors())

//socket configuration
const io = socketIO(server)
let arrMsg = []
app.io = io
app.arrMsg = arrMsg

io.on('connection', socket => {
    socket.on('JoinChat', data => {
        console.log(data)
    })

    socket.on('disconnect', () => {
        console.log('User Disconnected')
    })
})

server.listen(PORT, () => console.log(`Socket.IO running on PORT : ${PORT}`))