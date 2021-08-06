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
        localStorage.removeItem('idUser')
        dispatch({
            type: 'LOG_OUT'
        })
    }
}

export const keepLogin = () => {
    return (dispatch) => {
        const token = localStorage.getItem('token')

        // if (token) {
        //     Axios.get(`${URL_API}/keeplogin/${token}`)
        //         .then(res => {
        //             dispatch({
        //                 type: 'LOGIN',
        //                 payload: res.data[0]
        //             })
        //         })
        // }
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