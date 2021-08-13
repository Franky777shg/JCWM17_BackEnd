import React from 'react'
import Axios from 'axios'
import {
  Container,
  InputGroup,
  FormControl,
  Button,
  Table
} from 'react-bootstrap'
import NavigationBar from './component/navigationBar';
import io from 'socket.io-client'

const URL_API = 'http://localhost:2000'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: [],
      username: '',
      nsp: '',
      messageRoom1: [],
      notifRoom1: ''
    }
  }

  onJoinChat = (nsp) => {
    this.setState({ nsp })

    const username = this.state.username
    const socket = io(URL_API + nsp)

    socket.emit('JoinChat', { username })
    socket.on('chat msg', updateMsg => {
      console.log('receive socket: ', updateMsg)
      this.setState({ msg: updateMsg })
    })
  }

  onJoinRoom1 = (room) => {
    const socket = io(URL_API + this.state.nsp)

    let dataUser = {
      room,
      username: this.state.username
    }
    socket.emit('JoinRoom1', dataUser)

    socket.on('NotifJoinRoom1', notif => {
      this.setState({ notifRoom1: notif })
    })

    socket.on('room1Msg', updateMsg => {
      this.setState({ messageRoom1: updateMsg })
    })
  }

  onSend = (room) => {
    const message = room === null ? this.refs.message.value : this.refs.messageRoom.value
    const username = this.state.username

    const body = {
      room,
      username,
      message
    }

    let namespace = this.state.nsp === '/' ? 'default' : 'channel'

    Axios.post(`${URL_API}/sendmsg?namespace=${namespace}`, body)
      .then(res => {
        console.log(res.data)
        alert('Message Send ✔')
        this.refs.message.value = ""
        this.refs.messageRoom.value = ""
      })
      .catch(err => {
        console.log(err)
        this.refs.message.value = ""
        this.refs.messageRoom.value = ""
      })
  }

  onRenderTBody = () => {
    return this.state.msg.map((item, index) => {
      return (
        <tr key={index}>
          <td>{item.username}</td>
          <td>{item.message}</td>
        </tr>
      )
    })
  }

  onRenderMsgRoom1 = () => {
    return this.state.messageRoom1.map((item, index) => {
      return (
        <tr key={index}>
          <td>{item.username}</td>
          <td>{item.message}</td>
        </tr>
      )
    })
  }

  render() {
    return (
      <div>
        <NavigationBar />
        <Container>
          <h1>Chat App</h1>
          <h2>Global Room</h2>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
            <FormControl
              placeholder="Username"
              onChange={(e) => this.setState({ username: e.target.value })}
            />
          </InputGroup>
          <Button variant="success" onClick={() => this.onJoinChat('/')}>Join</Button>
          <Button variant="success" onClick={() => this.onJoinChat('/channel')}>Join Channel</Button>
          <Table striped bordered hover variant="dark" className="mt-3">
            <thead>
              <tr>
                <th>Username</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {this.onRenderTBody()}
            </tbody>
          </Table>
          <FormControl
            as="textarea"
            placeholder="Write your Message"
            ref="message"
            className="mb-3"
          />
          <Button className="mb-3" variant="success" onClick={() => this.onSend(null)}>Send Message</Button>

          <h2 className="mt-3">Room 1</h2>
          <h3>{this.state.notifRoom1}</h3>
          <Button variant="success" onClick={() => this.onJoinRoom1('Room 1')}>Join Room 1</Button>
          <Table striped bordered hover variant="dark" className="mt-3">
            <thead>
              <tr>
                <th>Username</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {this.onRenderMsgRoom1()}
            </tbody>
          </Table>
          <FormControl
            as="textarea"
            placeholder="Write your Message"
            ref="messageRoom"
            className="mb-3"
          />
          <Button variant="success" onClick={() => this.onSend('Room 1')}>Send Message</Button>
        </Container>
      </div>
    );
  }
}

export default App;
