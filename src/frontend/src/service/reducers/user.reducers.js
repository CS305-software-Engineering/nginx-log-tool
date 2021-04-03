import {LOGIN_USER,REGISTER_USER} from '../constants';

const initialState = {
    userData:{}
}

export default function userReducer(state=initialState, action){

    switch(action.type) {
        case LOGIN_USER:
            return {
                ...state,
                userData: action.data
            }
        break;

        case REGISTER_USER:
            return {
                ...state,
                userData: action.data
            }
        break;

        default:
            return state



    }
}