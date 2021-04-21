     
     
import {SAVE_TIME} from '../constants';

const data ={}

export default function timestampReducer(state=data, action){

    switch(action.type) {
        case SAVE_TIME:
            return {
                ...state,
                timestamp: action.data,
            }
        
        // case UPDATE_TIMESERIES_SEQ:
        //     data: [...state , ]

        default:
            return state



    }
}
