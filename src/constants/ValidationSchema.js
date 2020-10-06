import * as Yup from 'yup';
import { VALIDATE } from './ValidationConst';


export const VALIDATION_SCHEMA = {

    LOGIN: Yup.object().shape({   
        email: Yup.string()
            .nullable(true)
            .email(VALIDATE.EMAIL_INVALID)
            .required('Email is required')
            .max(255, VALIDATE.CHAR_LIMIT),
        password: Yup.string()
            .nullable(true)
            .required('Password is required')
            .max(255, VALIDATE.CHAR_LIMIT),
        
    }),

}