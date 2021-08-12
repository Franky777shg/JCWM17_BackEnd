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
      username: ''
    }
  }

  onJoinChat = () => {
    const username = this.state.username
    const socket = io(URL_API)

    socket.emit('JoinChat', { username })
    socket.on('chat msg', updateMsg => {
      console.log('receive socket: ', updateMsg)
      this.setState({ msg: updateMsg })
    })
  }

  onSend = () => {
    const message = this.refs.message.value
    const username = this.state.username

    const body = {
      username,
      message
    }
    console.log(body)

    Axios.post(`${URL_API}/sendmsg`, body)
      .then(res => {
        console.log(res.data)
        alert('Message Send ✔')
        this.refs.message.value = ""
      })
      .catch(err => {
        console.log(err)
        this.refs.message.value = ""
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

  render() {
    return (
      <div>
        <NavigationBar />
        <Container>
          <h1>Chat App</h1>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
            <FormControl
              placeholder="Username"
              onChange={(e) => this.setState({ username: e.target.value })}
            />
          </InputGroup>
          <Button variant="success" onClick={this.onJoinChat}>Join Chat</Button>
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
          <Button variant="success" onClick={this.onSend}>Send Message</Button>
        </Container>
      </div>
    );
  }
}

export default App;
