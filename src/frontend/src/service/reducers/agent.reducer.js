     
     
import {SAVE_AGENT} from '../constants';



              
export default function agentReducer(state = '', action) {
    // console.log('state: ', state);
    // console.log('actiondata: ', action.data)
    switch (action.type) {
        case SAVE_AGENT:
            return action.data;
            


        

        
        default:
            return state;
    }
}