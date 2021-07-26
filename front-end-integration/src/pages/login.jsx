import React from 'react'
import {
    FormControl,
    InputGroup,
    Button,
    Modal
} from 'react-bootstrap'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

class LoginPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visibility: false,
            error: false
        }
    }

    clickEnter = (e) => {
        if (e.key === 'Enter') {
            this.onLogin()
        }
    }

    onLogin = () => {
        // ambil data dari input username dan password
        let username = this.refs.username.value
        let password = this.refs.password.value
        // console.log(username, password)

        // kalau ada input yang masih kosong kita notif bahwa data tidak boleh kosong
        if (!username || !password) {
            return this.setState({ error: true })
        }

        // cek apakah data yang dikirim oleh user sudah ada di daftar users di database
        // this.props.login(username, password)
    }

    render() {
        const { visibility } = this.state
        return (
            // <h1>Hello World</h1>
            <div style={styles.cont}>
                <div style={styles.contForm}>
                    <h1>Hello,</h1>
                    <h3 className="mb-4">Welcome Back!</h3>
                    <label>Username</label>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">
                            <i className="fas fa-user-circle"></i>
                        </InputGroup.Text>
                        <FormControl
                            placeholder="Input Here"
                            ref="username"
                            onKeyDown={(e) => this.clickEnter(e)}
                        />
                    </InputGroup>
                    <label>Password</label>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1" onClick={() => this.setState({ visibility: !visibility })}>
                            {visibility ? <i className="fas fa-eye"></i> : <i className="fas fa-eye-slash"></i>}
                        </InputGroup.Text>

                        <FormControl
                            placeholder="Input Here"
                            type={visibility ? "text" : "password"}
                            ref="password"
                            onKeyDown={(e) => this.clickEnter(e)}
                        />
                    </InputGroup>
                    <div style={styles.contButton}>
                        <Button onClick={this.onLogin} variant="primary" style={styles.button}>
                            <i className="fas fa-sign-in-alt" style={{ marginRight: '10px' }}></i>
                            Login
                        </Button>
                    </div>
                    <p style={styles.goToRegis}>Do You Have an Account? <Link style={{ color: '#303f9f', fontWeight: 'bold' }} to="/register">Register Here</Link></p>
                    <p style={styles.goToRegis}>Go to <Link style={{ color: '#303f9f', fontWeight: 'bold' }} to="/">Home</Link></p>
                </div>
                {/* <Modal show={this.state.error}>
                    <Modal.Header>
                        <Modal.Title>Error</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>Please input all of data!</p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={() => this.setState({ error: false })} variant="primary">OK</Button>
                    </Modal.Footer>
                </Modal> */}
            </div >
        )
    }
}

const styles = {
    cont: {
        background: "url(https://images.unsplash.com/photo-1506544777-64cfbe1142df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80) no-repeat center",
        backgroundSize: 'cover',
        height: '100vh',
        paddingTop: '12vh'
    },
    contForm: {
        width: '30vw',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: '10px',
        backgroundColor: 'rgba(255, 255, 255, .7)',
        padding: '1% 2%'
    },
    contButton: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '10px'
    },
    button: {
        backgroundColor: '#303f9f',
        border: 'none'
    },
    goToRegis: {
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '0'
    }
}

export default LoginPage