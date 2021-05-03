     
     
import {SAVE_NOTIFICATION} from '../constants';

const data = {}


              
export default function notificationReducer(state = data, action) {
    // console.log('state: ', state);
    // console.log('actiondata: ', action.data)
    switch (action.type) {
        case SAVE_NOTIFICATION:
            return {
                ...state,
                notification:action.data
            }


        

        
        default:
            return state;
    }
}