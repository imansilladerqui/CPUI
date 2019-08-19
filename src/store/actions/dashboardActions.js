const Request = require('superagent');

const expiredMessage = 'Token has expired';

export const dashboardClearState = () => {
    console.log('hola');
    return dispatch => {
        dispatch({
            type: 'CLEAR_STATE'
        })
    }
}

export const getEntidades = () => {

    return dispatch => {
        Request
        .get('https://protected-mountain-77919.herokuapp.com/api/entidadesAll')
        .set({'authorization': 'Bearer ' + localStorage.getItem('_token')})
        .accept('application/json')
        .then(res=>{
            let entidades = Object.values(res.body);
            for(let i=0; i<entidades.length; i++) {
                entidades[i].logo = `/entidades/${entidades[i].entidad}.png`;
            }
        
            dispatch({
                type: 'GET_ENTIDADES',
                entidades: entidades
            })
        })
        .catch(err=>{
            if (err.response.body.message === expiredMessage) {
                localStorage.removeItem('_token');
                return dispatch({
                    type: 'HANDLE_ERROR_TOKEN',
                })
            }
        })
    }
}

export const getEntidadesHistorico = (entidadesList) => {
    return dispatch => {
        Request
        .get(`https://protected-mountain-77919.herokuapp.com/api/${entidadesList}`)
        .set({'authorization': 'Bearer ' + localStorage.getItem('_token')})
        .accept('application/json')
        .then(res=>{
            let entidades = Object.values(res.body);
            for(let i=0; i<entidades.length; i++) {
                entidades[i].logo = `/entidades/${entidades[i].entidad}.png`;
            }
            dispatch({
                type: 'GET_ENTIDADES_HISTORICO',
                entidadesNombre: entidadesList,
                entidadesHistorico: entidades
            })
        })
        .catch(err=>{
            if (err.response.body.message === expiredMessage) {
                localStorage.removeItem('_token');
                return dispatch({
                    type: 'HANDLE_ERROR_TOKEN',
                })
            }
        })
    }
}

export const getUser = () => {
    return dispatch => {
        Request
        .get('https://protected-mountain-77919.herokuapp.com/api/usuario')
        .set({'authorization': 'Bearer ' + localStorage.getItem('_token')})
        .accept('application/json')
        .then(res=>{
            dispatch({
                type: 'GET_USER',
                user: res.body
            })
        })
        .catch(err=>{
            if (err.response.body.message === expiredMessage) {
                localStorage.removeItem('_token');
                return dispatch({
                    type: 'HANDLE_ERROR_TOKEN',
                })
            }
        })
    }
}

export const getUsuarios = () => {

    return dispatch => {
        Request
        .get('https://protected-mountain-77919.herokuapp.com/api/allusuarios')
        .set({'authorization': 'Bearer ' + localStorage.getItem('_token')})
        .accept('application/json')
        .then(res=>{
            dispatch({
                type: 'GET_USUARIOS',
                usuarios: res.body
            })
        })
        .catch(err=>{
            if (err.response.body.message === expiredMessage) {
                localStorage.removeItem('_token');
                return dispatch({
                    type: 'HANDLE_ERROR_TOKEN',
                })
            }
        })
    }
}