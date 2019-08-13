const initState = {
    alpe:[],
    columbia: [],
    entidades:[],
    frances: [],
    galicia:[],
    icbc:[],
    maguitur:[],
    maxinta:[],
    montevideo:[],
    nacion:[],
    patagonia:[],
    provincia:[],
    santander:[],
    supervielle: [],  
    tokenExpired: false,
    user:[],
    vaccaro:[]
}

const dashboardReducer = (state = initState, action) => {
    switch (action.type) {
        case 'GET_ENTIDADES': 
            return {
                ...state,
                entidades: action.entidades
            }

        case 'GET_ENTIDADES_HISTORICO':
            return {
                ...state,
                [action.entidadesNombre]: action.entidadesHistorico
            }

        case 'GET_USER': 
            return {
                ...state,
                user: action.user
            }

        case 'HANDLE_ERROR_TOKEN':
            return {
                ...state,
                tokenExpired: true
            }

        default:
            //Nothing
        break;
    }
    return state
}

export default dashboardReducer;