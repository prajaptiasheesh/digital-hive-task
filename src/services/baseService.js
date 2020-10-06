import axios from 'axios'
import { END_POINT } from '../constants/api-end-points';


export default function _callApi(data, url, method,handleCancel, headerData){

     let token = JSON.parse( localStorage.getItem("token"));
     let header = null

     if(!token){
           header = {
                "Content-Type": "application/json",
                "Authorization": "machine_test"
            };
     }else{

        header = {
            "Content-Type": "application/json",
            "Authorization": token
        };
     }
        let  instance = axios.create({
                                baseURL:`${END_POINT.BASE_URL}/`,
                            });


    let result ;
// =========================================METHOD 1 = POST, METHOD 2 = GET=================================================================================//
    if(method === 1){

      result =  instance.post(url, data,{headers: header})
        .then(res=>{

            return res
        })
    }else if(method === 2){

        let urlParams = ''

        for(let key in data){
            urlParams += key+"="+data[key]+"&" 
        }


         result = instance.get(url+"?"+urlParams, {headers: header})
         .then(res=>{
 
             return res
         }) 
    }

    return result;
}
