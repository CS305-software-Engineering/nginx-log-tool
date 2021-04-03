import {combineReducers} from 'redux';
import userReducer from './user.reducers';


const appReducer =  combineReducers({
    userData: userReducer,
})

export default appReducer;