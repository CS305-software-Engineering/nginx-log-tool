import {combineReducers} from 'redux';
import userReducer from './user.reducers';
import instanceReducer from './instance.reducers';


const appReducer =  combineReducers({
    userData: userReducer,
    instanceData: instanceReducer,
})

export default appReducer;