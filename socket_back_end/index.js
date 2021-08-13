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
let channelMsg = []
app.io = io
app.arrMsg = arrMsg

app.post('/sendmsg', (req, res) => {
    if (req.query.namespace === 'default') {
        console.log(req.body)
        arrMsg.push(req.body)

        io.emit('chat msg', arrMsg)
        res.status(200).send(arrMsg)
    } else if (req.query.namespace === 'channel') {
        console.log(req.body)
        channelMsg.push(req.body)

        channelNsp.emit('chat msg', channelMsg)
        res.status(200).send(channelMsg)
    }
})

io.on('connection', socket => {
    socket.on('JoinChat', data => {
        console.log(data)
    })

    socket.on('disconnect', () => {
        console.log('User Disconnected')
    })
})

const channelNsp = io.of('/channel')
channelNsp.on('connection', socket => {
    socket.on('JoinChat', data => {
        console.log('User Join Channel: ', data)
    })

    socket.on('disconnect', () => {
        console.log('User Disconnected from Channel')
    })
})



server.listen(PORT, () => console.log(`Socket.IO running on PORT : ${PORT}`))