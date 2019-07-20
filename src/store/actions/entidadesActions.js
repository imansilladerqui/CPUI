export const getEntidad = (entidad) => {

    // async call to DB


    return (dispatch, getState) => {
        dispatch({
            type: 'GET_ENTIDAD',
            entidad
        })
    }
}