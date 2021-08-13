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
let userRoom1 = []
let room1Msg = []
app.io = io
app.arrMsg = arrMsg

app.post('/sendmsg', (req, res) => {
    if (req.query.namespace === 'default') {
        if (req.body.room) {
            room1Msg.push(req.body)

            io.in(req.body.room).emit('room1Msg', room1Msg)
        } else {
            console.log(req.body)
            arrMsg.push(req.body)

            io.emit('chat msg', arrMsg)
        }
        
        res.status(200).send('berhasil')
    } else if (req.query.namespace === 'channel') {
        console.log(req.body)
        channelMsg.push(req.body)

        channelNsp.emit('chat msg', channelMsg)
        res.status(200).send(channelMsg)
    }
})

// namespace default
io.on('connection', socket => {
    socket.on('JoinChat', data => {
        console.log(data)
    })

    socket.on('JoinRoom1', data => {
        socket.join(data.room)
        userRoom1.push({ ...data, id: socket.id })
        io.in(data.room).emit('NotifJoinRoom1', `${data.username} just entered the room1`)
    })

    socket.on('disconnect', () => {
        console.log('User Disconnected')
    })
})

// namespace custom namanya channel
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