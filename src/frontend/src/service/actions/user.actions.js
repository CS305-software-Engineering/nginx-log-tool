import {SAVE_USER , LOGOUT_USER ,AUTH_CHECK} from '../constants';

import {axios} from 'axios';


export const saveUser=(p)=>{

    // console.log("action" , p.data);
    localStorage.setItem('jwt_token', p.data.token)

    return {
        type:SAVE_USER,
        data:p.data
    }
    
}

export const authCheck=()=>{
    
    const flag = localStorage.getItem('jwt_token')?true:false;

    return {
        type:AUTH_CHECK,
        data:flag
        
    }
}

export const logOut = () =>{
    localStorage.removeItem('jwt_token');

    return {
        type:LOGOUT_USER
    }
}