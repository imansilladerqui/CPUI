const initState = {
    allUsuarios:[],
    dashboardData: [],
    tokenExpired: false,
    user:[]
}

const dashboardReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CLEAR_STATE':
            return initState
        case 'GET_DASHBOARD_DATA':
            return {
                ...state,
                dashboardData: action.dashboard
            }
        case 'GET_USER':
            return {
                ...state,
                user: action.user
            }
        case 'HANDLE_ERROR_TOKEN':
            return {
                ...state,
                tokenExpired: true
            }

        default:
            //Nothing
        break;
    }
    return state
}

export default dashboardReducer;