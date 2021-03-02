import {FETCH_SUBTOPIC} from "../actions/types";

let INITIAL_STATE = {data:[]};

export default (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case FETCH_SUBTOPIC:
            return {...state, data: action.payload};

        default:
            return state;
    }
}