     
     
import {SAVE_TIMESERIES_SEQ} from '../constants';

const data = {}

export default function timeseriesReducer(state=data, action){

    switch(action.type) {
        case SAVE_TIMESERIES_SEQ:
            return {
                ...state,
                data: action.data,
            }

        default:
            return state



    }
}
