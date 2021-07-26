const INITIAL_STATE = {
    id: null,
    username: "",
    password: "",
    failedLogin: false,
    msgFailedLogin: ""
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                id: action.payload.id,
                username: action.payload.username,
                password: action.payload.password
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
        default:
            return state
    }
}

export default userReducer