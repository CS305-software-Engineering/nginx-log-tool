     
     
import {SAVE_TIME} from '../constants';


export default function timestampReducer(state=Date.now(), action){

    switch(action.type) {
        case SAVE_TIME:
            return action.data
        
        // case UPDATE_TIMESERIES_SEQ:
        //     data: [...state , ]

        default:
            return state



    }
}
