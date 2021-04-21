import {combineReducers} from 'redux';
import userReducer from './user.reducers';
import instanceReducer from './instance.reducers';
import timeseriesReducer from './timeseries.reducers';
import timestampReducer from './timestamp.reducer';

const appReducer =  combineReducers({
    userData: userReducer,
    instanceData: instanceReducer,
    timeseriesData: timeseriesReducer,
    timestamp:timestampReducer,
})

export default appReducer;