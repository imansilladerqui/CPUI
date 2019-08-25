const Request = require('superagent');

export const clearState = () => {
    return dispatch => {
        dispatch({
            type: 'CLEAR_STATE'
        })
    }
}

export const loginUser = (credentials) => {
    return dispatch => {
        dispatch({
            type: 'SHOW_PRELOADER'
        })
        Request
        .post('https://protected-mountain-77919.herokuapp.com/api/login')
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
        dispatch({
            type: 'SHOW_PRELOADER'
        })
        Request
        .post('https://protected-mountain-77919.herokuapp.com/api/signup')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({email: credentials.email, password: credentials.password })
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