const Request = require('superagent');

const expiredMessage = 'Token has expired';

export const deleteSelectedUser = (id) => {

    return dispatch => {
        Request
            .delete(`https://protected-mountain-77919.herokuapp.com/api/usuario/${id}`)
            .set({'authorization': 'Bearer ' + localStorage.getItem('_token')})
            .accept('application/json')
            .then(()=>{
                dispatch(getUsuarios())
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

export const getSelectedUser = (id) => {

    return dispatch => {
        Request
        .get(`https://protected-mountain-77919.herokuapp.com/api/usuario/${id}`)
        .set({'authorization': 'Bearer ' + localStorage.getItem('_token')})
        .accept('application/json')
        .then(res=>{
            let selectedUser = res.body[0];
            dispatch({
                type: 'EDIT_USUARIO',
                selectedUsuario: selectedUser
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


