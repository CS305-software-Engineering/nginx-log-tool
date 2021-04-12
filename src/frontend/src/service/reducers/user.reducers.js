import {SAVE_USER, LOGOUT_USER , AUTH_CHECK} from '../constants';



export default function userReducer(state={}, action){

    switch(action.type) {
        case SAVE_USER:
            return {
                ...state,
                userData: action.data,
                isAuthenticated:true
            }

        case LOGOUT_USER:
            return {
                ...state,
                userData: {},
                isAuthenticated: false
            }
        case AUTH_CHECK:
            return {
                ...state,
                isAuthenticated:action.data
            }
        default:
            return state



    }
}