import userReducer from './userReducer';
import entidadesReducer from './entidadesReducer';
import AuthReducer from './authReducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    auth: AuthReducer,
    user: userReducer,
    entidades: entidadesReducer
});

export default rootReducer;