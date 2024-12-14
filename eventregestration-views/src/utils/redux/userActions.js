import {SET_APPLICATION} from './userTypes';

export const setApplication =(application) =>{
    return{
        type: SET_APPLICATION,
        value: application
    }
}