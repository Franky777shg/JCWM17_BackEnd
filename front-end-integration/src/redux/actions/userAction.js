import Axios from 'axios'

const URL_API = 'http://localhost:2000/user'

export const login = (data) => {
    return (dispatch) => {
        Axios.post(`${URL_API}/login`, data)
            .then(res => {
                localStorage.setItem('idUser', res.data.id)

                dispatch({
                    type: 'LOGIN',
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type: 'FAILED_LOGIN',
                    payload: err.response.data
                })
                console.log(err.response.data)
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
        const idUser = localStorage.getItem('idUser')

        Axios.get(`${URL_API}/keeplogin/${idUser}`)
            .then(res => {
                dispatch({
                    type: 'LOGIN',
                    payload: res.data
                })
            })
    }
}