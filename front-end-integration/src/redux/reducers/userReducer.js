const INITIAL_STATE = {
    id: null,
    username: "",
    password: "",
    email: "",
    failedLogin: false,
    msgFailedLogin: "",
    successRegister: false
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                id: action.payload.idusers,
                username: action.payload.username,
                password: action.payload.password,
                email: action.payload.email
            }
        case 'FAILED_LOGIN':
            return {
                ...state,
                failedLogin: true,
                msgFailedLogin: action.payload
            }
        case 'CLOSE_MODAL':
            return {
                ...state,
                failedLogin: false,
                msgFailedLogin: ""
            }
        case 'LOG_OUT':
            return INITIAL_STATE
        case 'SUCCESS_REGIS':
            return {
                ...state,
                successRegister: true
            }
        default:
            return state
    }
}

export default userReducer