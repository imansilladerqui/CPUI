import AuthReducer from './authReducer';
import DashboardReducer from './dashboardReducer';
import UserReducer from './userReducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    auth: AuthReducer,
    dashboard: DashboardReducer,
    user: UserReducer
});

export default rootReducer;