     
     
import {SAVE_NGINX} from '../constants';



              
export default function nginxReducer(state = [], action) {
    // console.log('state: ', state);
    // console.log('actiondata: ', action.data)
    switch (action.type) {
        case SAVE_NGINX:
            return action.data;
            


        

        
        default:
            return state;
    }
}