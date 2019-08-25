const initState = {
    allUsuarios:[],
    selectedUser: [],
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

        case 'EDIT_USUARIO':
            return {
                ...state,
                selectedUser: action.selectedUsuario
            }

        default:
            //Nothing
        break;
    }
    return state
}

export default userReducer;