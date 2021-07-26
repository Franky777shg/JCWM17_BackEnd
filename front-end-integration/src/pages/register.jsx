import React from 'react'
import {
    FormControl,
    InputGroup,
    Button,
    Form,
    Modal
} from 'react-bootstrap'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
// import { register, resetRegErr } from '../redux/actions'

class RegisPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visibility1: false,
            visibility2: false,
            usernameErr: [false, ""],
            emailErr: [false, ""],
            passErr: [false, ""],
            registerErr: [false, ""]
        }
    }

    userValid = (e) => {
        console.log(e.target.value)
        let symb = /[!@#$%^&*]/

        if (symb.test(e.target.value) || e.target.value.length < 6) return this.setState({ usernameErr: [true, "Username must have 6 character & can't include symbol"] })

        this.setState({ usernameErr: [false, ""] })
    }

    emailValid = (e) => {
        let regex = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!regex.test(e.target.value)) return this.setState({ emailErr: [true, "Email not valid"] })

        this.setState({ emailErr: [false, ""] })
    }

    passValid = (e) => {
        let number = /[0-9]/
        let symb = /[!@#$%^&*]/

        if (!symb.test(e.target.value) || !number.test(e.target.value) || e.target.value.length < 6) return this.setState({ passErr: [true, "Password must have 6 character, include number and symbol"] })

        this.setState({ passErr: [false, ""] })
    }

    onRegister = () => {
        let username = this.refs.username.value
        let email = this.refs.email.value
        let password = this.refs.password.value

        // cek apakah semua input sudah terisi
        if (!username || !email || !password) return this.setState({ registerErr: [true, "Please input all of data"] })

        // cek apakah ada error dalam validasi input user
        if (this.state.usernameErr[0] || this.state.emailErr[0] || this.state.passErr[0]) return this.setState({ registerErr: [true, "Make sure all of your data is valid"] })

        // cek apakah confirm password sama dengan password
        if (this.refs.confpassword.value !== password) return this.setState({ registerErr: [true, "Confirm password doesn't match with password"] })

        // siapkan object data user
        let obj = {
            username,
            email,
            password,
            role: 'user',
            cart: []
        }

        // action untuk register
        // this.props.register(username, email, obj)
    }

    render() {
        // if (this.props.successReg) {
        //     return <Redirect to="/login" />
        // }
        const { visibility1, visibility2 } = this.state
        return (
            <div style={styles.contUtama}>
                <div style={styles.contLeft}></div>
                <div style={styles.contRight}>
                    <div style={styles.contForm}>
                        <h1>Need Shoes?</h1>
                        <h3 className="mb-4">Register Now!</h3>
                        <label>Username</label>
                        <InputGroup>
                            <InputGroup.Text id="basic-addon1">
                                <i className="fas fa-user-circle"></i>
                            </InputGroup.Text>
                            <FormControl
                                placeholder="Input Here"
                                onChange={(e) => this.userValid(e)}
                                ref="username"
                            />
                        </InputGroup>
                        <Form.Text style={styles.textErr}>
                            {this.state.usernameErr[0] ? this.state.usernameErr[1] : ""}
                        </Form.Text>
                        <br></br>
                        <label>Email</label>
                        <InputGroup>
                            <InputGroup.Text id="basic-addon1" >
                                <i className="fas fa-envelope"></i>
                            </InputGroup.Text>
                            <FormControl
                                placeholder="Input Here"
                                onChange={(e) => this.emailValid(e)}
                                ref="email"
                            />
                        </InputGroup>
                        <Form.Text style={styles.textErr}>
                            {this.state.emailErr[0] ? this.state.emailErr[1] : ""}
                        </Form.Text>
                        <br></br>
                        <label>Password</label>
                        <InputGroup>
                            <InputGroup.Text id="basic-addon1" onClick={() => this.setState({ visibility1: !visibility1 })}>
                                {visibility1 ? <i className="fas fa-eye"></i> : <i className="fas fa-eye-slash"></i>}
                            </InputGroup.Text>
                            <FormControl
                                placeholder="Input Here"
                                type={visibility1 ? "text" : "password"}
                                onChange={(e) => this.passValid(e)}
                                ref="password"
                            />
                        </InputGroup>
                        <Form.Text style={styles.textErr}>
                            {this.state.passErr[0] ? this.state.passErr[1] : ""}
                        </Form.Text>
                        <br></br>
                        <label>Confirm Password</label>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1" onClick={() => this.setState({ visibility2: !visibility2 })}>
                                {visibility2 ? <i className="fas fa-eye"></i> : <i className="fas fa-eye-slash"></i>}
                            </InputGroup.Text>
                            <FormControl
                                placeholder="Input Here"
                                type={visibility2 ? "text" : "password"}
                                ref="confpassword"
                            />
                        </InputGroup>
                        <div style={styles.contButton}>
                            <Button variant="primary" style={styles.button} onClick={this.onRegister}>
                                <i className="fas fa-user-plus" style={{ marginRight: '10px' }}></i>
                                Register
                            </Button>
                        </div>
                        <p style={styles.goToRegis}>Already Have an Account? <Link style={{ color: '#303f9f', fontWeight: 'bold' }} to="/login">Login Here</Link></p>
                        <p style={styles.goToRegis}>Go to <Link style={{ color: '#303f9f', fontWeight: 'bold' }} to="/">Home</Link></p>
                    </div>
                </div>
                <Modal show={this.state.registerErr[0]}>
                    <Modal.Header>
                        <Modal.Title>Error!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{this.state.registerErr[1]}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => this.setState({ registerErr: [false, ""] })}>
                            OK
                        </Button>
                    </Modal.Footer>
                </Modal>
                {/* <Modal show={this.props.errorReg[0]}>
                    <Modal.Header>
                        <Modal.Title>Error!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{this.props.errorReg[1]}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.props.resetRegErr}>
                            OK
                        </Button>
                    </Modal.Footer>
                </Modal> */}
            </div>
        )
    }
}

const styles = {
    contUtama: {
        display: 'flex',
        height: '100vh'
    },
    contLeft: {
        flexBasis: '50%',
        height: '100vh',
        backgroundColor: 'salmon',
        background: "url(https://images.unsplash.com/photo-1579338559194-a162d19bf842?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1534&q=80) no-repeat center",
        backgroundSize: 'cover'
    },
    contRight: {
        flexBasis: '50%',
        // backgroundColor: 'lightblue',
        paddingTop: '5vh',
        overflow: 'scroll'
    },
    contForm: {
        width: '40vw',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: '10px',
        // border: '1px solid #303f9f',
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
    },
    textErr: {
        color: 'red',
        marginBottom: '15px'
    }
}

// const mapStateToProps = (state) => {
//     return {
//         errorReg: state.userReducer.errorRegister,
//         successReg: state.userReducer.successRegister
//     }
// }

// export default connect(mapStateToProps, { register, resetRegErr })(RegisPage)
export default RegisPage