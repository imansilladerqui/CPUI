const Request = require('superagent');
const SETUP = require('../../config');

const expiredMessage = 'Token has expired';

export const deleteSelectedUser = (id) => {

    return dispatch => {
        Request
            .delete(`${SETUP.CONFIG.backendApi}/api/usuario/${id}`)
            .set({'authorization': 'Bearer ' + localStorage.getItem('_token')})
            .accept('application/json')
            .then(()=>{
                dispatch(getUsuarios())
            })
    }
}

export const getUsuarios = () => {

    return dispatch => {
        Request
        .get(`${SETUP.CONFIG.backendApi}/api/allusuarios`)
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



export const getProfile = (id) => {

    return dispatch => {
        Request
        .get(`${SETUP.CONFIG.backendApi}/api/profile/${id}`)
        .set({'authorization': 'Bearer ' + localStorage.getItem('_token')})
        .accept('application/json')
        .then(res=>{
            dispatch({
                type: 'GET_PROFILE',
                selectedUsuario: res.body
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

export const updateProfile = (id, data) => {

    return dispatch => {
        Request
        .post(`${SETUP.CONFIG.backendApi}/api/profile/${id}`)
        .set({'authorization': 'Bearer ' + localStorage.getItem('_token')})
        .accept('application/json')
        .send(data)
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

export const userClearState = () => {
    return dispatch => {
        dispatch({
            type: 'CLEAR_STATE'
        })
    }
}


