import {SAVE_USER , LOGOUT_USER ,AUTH_CHECK , ADD_INSTANCE , REMOVE_INSTANCE , SAVE_TIMESERIES_SEQ} from '../constants';

import {axios} from 'axios';


export const saveUser=(p)=>{

    console.log("action" , p.data);
    localStorage.setItem('access_token', p.data.token)


    return {
        type:SAVE_USER,
        data:p.data
    }



}

export const authCheck=()=>{
    
    const accessToken = localStorage.getItem('access_token');
    console.log("access token" , accessToken);
    var flag = false;
    if (accessToken == undefined){
        flag = false;
    }
    else {
        flag =true;
    }
 


    return {
        type:AUTH_CHECK,
        data:flag
        
    }
}

export const logOut = () =>{
    localStorage.removeItem('access_token');

    return {
        type:LOGOUT_USER
    }
}

export const addInstance = (p) =>{

    return {
        type:ADD_INSTANCE,
        data:p.data.resData

    }
}

export const saveTimeSeriesData = ( p) =>{

    return {
        type:SAVE_TIMESERIES_SEQ,
        data:p.data
    }
}