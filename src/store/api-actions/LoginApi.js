import _callApi from "../../services/baseService";
import { END_POINT } from "../../constants/api-end-points";
// let UserLogin = require("../actions/UserLogin")
import { UserLogin } from '../actions/UserLogin';

export const LoginApi = (form)=>{

    return (dispatch, getState)=>{

        dispatch(UserLogin.UserLogging());

       return _callApi(
            form,
            END_POINT.LOGIN.END_POINT,
            END_POINT.LOGIN.METHOD).then(res=>{

                const {  success=null, user } = res.data;

                if(!success){

                    dispatch(UserLogin.UserLogInFail({error: "User not found"}))

                    
                }else{

                    localStorage.setItem("token", JSON.stringify( user));


                    dispatch(UserLogin.UserLoggedIn({ result: user}))
                    dispatch(UserLogin.UserUpdateProfile({ result: user}))
                     
                   
                }
                
                return res
            }).catch(error=>{

                let { message } = error.response.data
                // console.error('error', error.response);
                dispatch(UserLogin.UserLogInFail({error:{message}}))
                
            })
    }
}