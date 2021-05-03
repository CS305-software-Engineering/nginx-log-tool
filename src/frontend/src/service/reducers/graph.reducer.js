     
     
import {SAVE_GRAPHINIT} from '../constants';


export default function graphReducer(state=false, action){

    switch(action.type) {
        case SAVE_GRAPHINIT:
            return action.data
        
        // case UPDATE_TIMESERIES_SEQ:
        //     data: [...state , ]

        default:
            return state



    }
}
