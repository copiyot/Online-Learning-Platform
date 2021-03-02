import {FETCH_SCHEME_WORK, CREATE_SCHEME_OF_WORK} from "../actions/types";

let INITIAL_STATE = {data:[]};

export default (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case FETCH_SCHEME_WORK:
            return {...state, data: action.payload};

        case CREATE_SCHEME_OF_WORK:
            return {...state, isCreated: action.payload};

        default:
            return state;
    }
}