const initState = {
    columbia:[],
    frances:[],
    galicia:[],
    icbc:[],
    nacion:[],
    patagonia:[],
    provincia:[],
    santander:[],
    supervielle:[],
    alpe:[],
    maguitur:[],
    maxinta:[],
    montevideo:[],
    vaccaro:[]
}



const entidadesReducer = (state = initState, action) => {
    switch (action.type) {
        case 'GET_ENTIDAD': 
        console.log(action.entidad)
        break;

        default:
            //Nothing
        break;
    }
    return state
}

export default entidadesReducer;