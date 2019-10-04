const Request = require('superagent');

const expiredMessage = 'Token has expired';

export const dashboardClearState = () => {
    return dispatch => {
        dispatch({
            type: 'CLEAR_STATE'
        })
    }
}

export const getEntidadesHistorico = (entidadesList) => {
    return dispatch => {
        dispatch({
            type: 'SHOW_PRELOADER'
        })
        let promises = entidadesList.map((data)=> {
            return Request
            .get(`https://protected-mountain-77919.herokuapp.com/api/${data}`)
            .set({'authorization': 'Bearer ' + localStorage.getItem('_token')})
            .accept('application/json')
            .then(res=>{
                let entidades = Object.values(res.body);
                for(let i=0; i<entidades.length; i++) {
                    entidades[i].logo = `/entidades/${entidades[i].entidad}.png`;
                }
                dispatch({
                    type: 'GET_ENTIDADES_HISTORICO',
                    entidadesNombre: data,
                    entidadesHistorico: entidades
                })
            })
            .catch(err=>{
                if (err.response.body.message && (err.response.body.message === expiredMessage)) {
                    localStorage.removeItem('_token');
                    return dispatch({
                        type: 'HANDLE_ERROR_TOKEN',
                    })
                }
            })
        })
        Promise.all(promises).then(() => {
            dispatch({
                type: 'HIDE_PRELOADER'
            })
        });
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
            if (err.response.body.message && (err.response.body.message === expiredMessage)) {
                localStorage.removeItem('_token');
                return dispatch({
                    type: 'HANDLE_ERROR_TOKEN',
                })
            }
        })
    }
}
