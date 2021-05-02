     
     
import {SAVE_TIME, SAVE_TIMESERIES_SEQ , CLEAR_TIMESERIES,UPDATE_TIMESERIES_SEQ} from '../constants';

const data = {}


              
export default function timeseriesReducer(state = data, action) {
    // console.log('state: ', state);
    // console.log('actiondata: ', action.data)
    switch (action.type) {
        case SAVE_TIMESERIES_SEQ:
            let tempState = { ...state };
            Object.entries(action.data).map(([key, value]) => {
                if (key in state) {
                    tempState[key] = tempState[key]?.concat(value);
                } else {
                    tempState[key] = value;
              
                }
            });
            return tempState;
        
        case CLEAR_TIMESERIES:
            return {}
        
        default:
            return state;
    }
}