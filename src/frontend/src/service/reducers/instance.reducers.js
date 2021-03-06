import {ADD_INSTANCE , REMOVE_INSTANCE ,SAVE_TIMESERIES_SEQ} from '../constants';



export default function instanceReducer(state=[], action){

    switch(action.type) {
        case ADD_INSTANCE:
            return {
                ...state,
                instanceData: action.data,
            }

        case REMOVE_INSTANCE:
            return {
                ...state,
                instanceData: {},
            }

        default:
            return state



    }
}