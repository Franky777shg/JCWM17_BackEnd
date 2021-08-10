const INITIAL_STATE = {
    id: null,
    username: "",
    password: "",
    email: "",
    failedLogin: false,
    msgFailedLogin: "",
    successRegister: false,
    failedRegister: false,
    msgFailedRegis: '',
    profilePic: ''
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                id: action.payload.idusers,
                username: action.payload.username,
                password: action.payload.password,
                email: action.payload.email,
                profilePic: action.payload.profile_pic
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
        case 'FAILED_REGIS':
            return {
                ...state,
                failedRegister: true,
                msgFailedRegis: action.payload
            }
        case 'CLOSE_MODAL_FAILED_REGIS':
            return {
                ...state,
                failedRegister: false,
                msgFailedRegis: ''
            }
        default:
            return state
    }
}

export default userReducer