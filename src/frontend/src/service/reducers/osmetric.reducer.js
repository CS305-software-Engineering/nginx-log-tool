     
import {SAVE_OS} from '../constants';



              
export default function osReducer(state = [], action) {
    // console.log('state: ', state);
    // console.log('actiondata: ', action.data)
    switch (action.type) {
        case SAVE_OS:
            return action.data;
            


        

        
        default:
            return state;
    }
}