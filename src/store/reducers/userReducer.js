const initState = {
    allUsuarios:[],
    selectedUser: {
        id: '',
        nombre: '',
        apellido: '',
        email: '',
        avatar: ''
    },
    tokenExpired: false
}

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CLEAR_STATE':
            return initState
        
        case 'GET_USUARIOS': 
            return {
                ...state,
                allUsuarios: action.usuarios
            }

        case 'GET_PROFILE':
            return {
                ...state,
                selectedUser: action.selectedUsuario
            }

        case 'UPDATE_PROFILE':
            return {
                ...state,
                selectedUser: action.selectedUsuario
            }

        case 'UPDATE_PROFILE_STORE':
            return {
                ...state,
                selectedUser: action.data
            }

        default:
            //Nothing
        break;
    }
    return state
}

export default userReducer;