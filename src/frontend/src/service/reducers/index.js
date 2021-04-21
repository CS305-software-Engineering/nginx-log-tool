import {combineReducers} from 'redux';
import userReducer from './user.reducers';
import instanceReducer from './instance.reducers';
import timeseriesReducer from './timeseries.reducers';


const appReducer =  combineReducers({
    userData: userReducer,
    instanceData: instanceReducer,
    timeseriesData: timeseriesReducer,
})

export default appReducer;