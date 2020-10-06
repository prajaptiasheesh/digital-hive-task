import { ACTIONS } from "../action-constants/Actions";


const UserLogging = ()=>{

    return {
        type:ACTIONS.USER_LOGIN.USER_LOGGING,
        payload: {isLogging:true}
    }
}

const UserLoggedIn = ({result})=>{

    return {
        type:ACTIONS.USER_LOGIN.USER_LOGGEDIN,
        payload: {isLogging:false, result}
    }
}


const UserLogInFail = ({error})=>{

    return {
        type:ACTIONS.USER_LOGIN.USER_FAIL_LOGIN,
        payload: {isLogging:false, error:error}
    }
}

const UserUpdateProfile = ({result})=>{

    return {
        type:ACTIONS.USER_PROFILE.USER_PROFILE_GOT,
        payload: {result}
    }
}

export const UserLogin = {
    UserLogging,
    UserLoggedIn,
    UserLogInFail,
    UserUpdateProfile
}