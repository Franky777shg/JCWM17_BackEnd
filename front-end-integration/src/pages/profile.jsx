import React from 'react'
import { connect } from 'react-redux'
import {
    Button
} from 'react-bootstrap'

import { uploadFile } from '../redux/actions'

const URL_API = 'http://localhost:2000/'

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: ''
        }
    }

    handleChoose = (e) => {
        console.log('e.target.files', e.target.files)
        this.setState({ images: e.target.files[0] })
    }

    handleUpload = () => {
        const data = new FormData()
        console.log(data)
        data.append('IMG', this.state.images)
        console.log(data.get('IMG'))

        this.props.uploadFile(data, this.props.idusers)
        this.setState({ images: '' })
    }

    render() {
        const { profilePic } = this.props
        console.log(this.state.images)
        return (
            <div>
                <h1>Profile Page</h1>
                <div style={styles.profileContainer}>
                    <div style={styles.profileBox}>
                        <div
                            style={{
                                height: '100%',
                                width: '100%',
                                backgroundColor: 'blue',
                                backgroundImage: `url(${profilePic ? URL_API + profilePic : null})`,
                                backgroundPosition: 'center',
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat'
                            }}>
                        </div>
                        <div style={styles.buttonProfile}>
                            <form encType="multipart/form-data">
                                <input
                                    type="file"
                                    accept="image/*"
                                    name="IMG"
                                    onChange={(e) => this.handleChoose(e)}
                                />
                            </form>
                            <Button
                                className="button"
                                variant="success"
                                onClick={this.handleUpload}
                            >
                                Upload
                            </Button>
                        </div>
                    </div>
                </div >
            </div>
        );
    }
}

const styles = {
    profileContainer: {
        width: '100%',
        height: '90vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'violet'
    },
    profileBox: {
        width: '50vw',
        height: '75vh',
        // backgroundColor: 'yellowgreen',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2% 5%',
    },
    buttonProfile: {
        marginTop: '3%'
    }
}

const mapStatetoProps = (state) => {
    return {
        idusers: state.userReducer.id,
        profilePic: state.userReducer.profilePic
    }
}

export default connect(mapStatetoProps, { uploadFile })(ProfilePage);