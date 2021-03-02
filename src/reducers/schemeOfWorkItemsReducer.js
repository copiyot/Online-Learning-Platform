import {FETCH_SCHEME_WORK_ITEMS} from "../actions/types";

let INITIAL_STATE = {data:[]};

export default (state = INITIAL_STATE, action)=>{
    switch(action.type){
        case FETCH_SCHEME_WORK_ITEMS:
            return {...state, data: action.payload};

        default:
            return state;
    }
}