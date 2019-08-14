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
            // localStorage.setItem('_token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjMsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbG9naW4iLCJpYXQiOjE1NjU2NDczMDIsImV4cCI6MTU2NTY2ODkwMiwibmJmIjoxNTY1NjQ3MzAyLCJqdGkiOiJCbFpYYWZTV3dsZk1uREN1In0.UrpkCKBEesnbluDfCxx0uKZDywYiuusb-_RToXzbhMk');
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
        .then(res=>{
            dispatch({
                type: 'REGISTER_OK'
            })
            this.loginUser(credentials);
        })
        .catch(err=>{
            dispatch({
                type: 'REGISTER_ERROR',
                err
            })
        })
    }
}