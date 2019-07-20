import authReducer from './authReducer';
import entidadesReducer from './entidadesReducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    auth: authReducer,
    entidades: entidadesReducer
});

export default rootReducer;