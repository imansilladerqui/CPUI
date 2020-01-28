const Request = require('superagent');
const SETUP = require('../../config');


export const clearState = () => {
    return dispatch => {
        dispatch({
            type: 'CLEAR_STATE'
        })
    }
}

export const loginUser = (credentials) => {
    return dispatch => {
        Request
        .post(`${SETUP.CONFIG.backendApi}/api/login`)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({email: credentials.email, password: credentials.password })
        .then(res=>{
            localStorage.setItem('_token', res.body.token);
            dispatch({
                type: 'LOGIN_OK'
            })
        })
        .catch(err=>{
            dispatch({
                type: 'LOGIN_ERROR',
                err
            })
        })
    }
}

export const signUp = (credentials) => {
    return dispatch => {
        Request
        .post(`${SETUP.CONFIG.backendApi}/api/signup`)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({nombre: credentials.nombre, apellido: credentials.apellido, email: credentials.email, password: credentials.password })
        .then(() => {
            dispatch(loginUser(credentials))
        })
        .catch(err=>{
            dispatch({
                type: 'REGISTER_ERROR',
                err
            })
        })
    }
}