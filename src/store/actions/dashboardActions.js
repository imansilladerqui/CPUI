const Request = require('superagent');
const SETUP = require('../../config');

const expiredMessage = 'Token has expired';

export const dashboardClearState = () => {
    return dispatch => {
        dispatch({
            type: 'CLEAR_STATE'
        })
    }
}

export const getDashboardTable = () => {
    return dispatch => {
        Request
        .get(`${SETUP.CONFIG.backendApi}/api/dashboard`)
        .set({'authorization': 'Bearer ' + localStorage.getItem('_token')})
        .accept('application/json')
        .then(res=>{
            dispatch({
                type: 'GET_DASHBOARD_DATA',
                dashboard: res.body
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

export const getUser = () => {
    return dispatch => {
        Request
        .get(`${SETUP.CONFIG.backendApi}/api/usuario`)
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
