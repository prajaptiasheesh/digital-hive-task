import { ACTIONS } from "../action-constants/Actions";


export const loginReducer= (state={},action={})=>{

    switch(action.type){

        case ACTIONS.USER_LOGIN.USER_LOGGING:{

            let newState = {...{},...state}
            
            newState.isLogging = true
            newState.success = false
            newState.error =   null        
            newState.token = null

            
            return {...newState};
        }

        case ACTIONS.USER_LOGIN.USER_LOGGEDIN:{

            let {  result } = action.payload;
            
            let newState = {...{}, ...state}

            
            newState.isLogging = false;
            newState.success = true
            newState.error =   null            
            
            return {...newState};

        }
        case ACTIONS.USER_LOGIN.USER_FAIL_LOGIN:{

            let {  error } = action.payload

            let newState = {...{}, ...state}
            
            newState.isLogging = false;
            newState.success = false
            newState.token =   null
            newState.error =   error.message


            return {...newState};
            
        }
        default :{

            return state;
        }
    }
} 