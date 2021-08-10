import Axios from 'axios'

const URL_API = 'http://localhost:2000/user'

export const login = (data) => {
    return (dispatch) => {
        Axios.post(`${URL_API}/login`, data)
            .then(res => {
                console.log(res.data)

                localStorage.setItem('token', res.data.token)

                dispatch({
                    type: 'LOGIN',
                    payload: res.data.dataUser
                })

                // if (res.data.length !== 0) {
                //     localStorage.setItem('idUser', res.data[0].idusers)

                //     dispatch({
                //         type: 'LOGIN',
                //         payload: res.data[0]
                //     })
                // } else {
                //     dispatch({
                //         type: 'FAILED_LOGIN',
                //         payload: 'Username/Password is Invalid'
                //     })
                // }
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const closeModal = () => {
    return (dispatch) => {
        dispatch({
            type: 'CLOSE_MODAL'
        })
    }
}

export const logout = () => {
    return (dispatch) => {
        localStorage.removeItem('token')
        dispatch({
            type: 'LOG_OUT'
        })
    }
}

export const keepLogin = () => {
    return (dispatch) => {
        const token = localStorage.getItem('token')

        if (token) {
            Axios.post(`${URL_API}/keeplogin`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => {
                    console.log(res.data[0])
                    dispatch({
                        type: 'LOGIN',
                        payload: res.data[0]
                    })
                })
        }
    }
}

export const register = (body) => {
    return (dispatch) => {
        Axios.post(`${URL_API}/register`, body)
            .then(res => {
                console.log(res.data)
                dispatch({
                    type: 'SUCCESS_REGIS'
                })
            })
            .catch(err => {
                console.log(err)
                dispatch({
                    type: 'FAILED_REGIS',
                    payload: err.response.data
                })
            })
    }
}

export const closeModalFailedRegis = () => {
    return (dispatch) => {
        dispatch({
            type: 'CLOSE_MODAL_FAILED_REGIS'
        })
    }
}

export const verification = (token) => {
    return (dispatch) => {
        Axios.post(`${URL_API}/verification`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const uploadFile = (data, id) => {
    return (dispatch) => {
        Axios.post(`http://localhost:2000/profile/upload/${id}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                console.log(res.data)

                const token = localStorage.getItem('token')

                if (token) {
                    Axios.post(`${URL_API}/keeplogin`, {}, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                        .then(res => {
                            console.log(res.data[0])
                            dispatch({
                                type: 'LOGIN',
                                payload: res.data[0]
                            })
                        })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
}