import { combineReducers } from 'redux';
import { loginReducer } from './login-reducer';
import { userReducer } from './userReducer';


export const reducers = combineReducers({
                                login: loginReducer,
                                user:userReducer,
                            })