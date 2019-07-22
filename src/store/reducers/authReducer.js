const initState = {
    showError: false,
    successLogin: false,
    showPreloader: false
}

const AuthReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CLEAR_STATE':
            return initState

        case 'SHOW_PRELOADER':
            return {
                ...state,
                showPreloader: true
            }
        case 'LOGIN_OK':
        case 'REGISTER_OK':
            return {
                ...state,
                successLogin: true,
                showPreloader: false
            }

        case 'LOGIN_ERROR':
            return {
                ...state,
                showError: true,
                showPreloader: false
            }

        default:
            return state
    }
}

export default AuthReducer;