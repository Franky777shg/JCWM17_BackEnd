import React from 'react'
import {
  Container,
  InputGroup,
  FormControl,
  Button
} from 'react-bootstrap'
import NavigationBar from './component/navigationBar';
import io from 'socket.io-client'

const URL_API = 'http://localhost:2000'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  onJoinChat = () => {
    const username = this.refs.username.value
    const socket = io(URL_API)

    socket.emit('JoinChat', { username })
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
              ref="username"
            />
          </InputGroup>
          <Button variant="success" onClick={this.onJoinChat}>Join Chat</Button>
        </Container>
      </div>
    );
  }
}

export default App;
