const initState = {
    showError: false,
    successLogin: false
}

const AuthReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CLEAR_STATE':
            return initState
        case 'LOGIN_OK':
            return {
                ...state,
                successLogin: true
            }

        case 'LOGIN_ERROR':
            return {
                ...state,
                showError: true
            }

        default:
            return state
    }
}

export default AuthReducer;