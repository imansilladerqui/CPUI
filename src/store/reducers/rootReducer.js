import dashboardReducer from './dashboardReducer';
import AuthReducer from './authReducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    auth: AuthReducer,
    dashboard: dashboardReducer,
});

export default rootReducer;