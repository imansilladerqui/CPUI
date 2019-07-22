const initState = {
    entidades:[]
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