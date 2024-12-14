import {SET_APPLICATION} from './userTypes';

const initialState={
    application:{
    },
}

export const userReducer = (state= initialState, action) => {
    switch (action.type) {
        case SET_APPLICATION:return {
            ...state,
            application:action.value
        }
        default:
            return state
    }
}
