import { ACTIONS } from "../action-constants/Actions";
import _ from 'lodash';

export const userReducer = (state={}, action={})=>{

    switch(action.type){

        case ACTIONS.USER_PROFILE.USER_PROFILE_GOT :{

            let {  result } = action.payload

            let newState = _.cloneDeep(state)

            newState = { ...{}, ...newState ,...result}

            return {...newState};
        }
        case ACTIONS.USER_PROFILE.USER_PROFILE_RESET:{

            // let {  result } = action.payload

            let newState = _.cloneDeep(state)

            newState = {}

            return {...newState};

        }
        default:{

            return {...state}
        }
    }
}