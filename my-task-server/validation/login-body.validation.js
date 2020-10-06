// Model property validations
const Joi = require('@hapi/joi');
const logger = require('../config/winston');

const schema = Joi.object({
                            email: Joi
                                    .string()
                                    .email()
                                    .required()
                                    .error((errors)=>{
                                        errors.forEach(err=>{
                                
                                        getError({ error: err, name: 'email'  })
                                    })
                                return errors;
                            }),
                            password: Joi
                                    .string()
                                    .required()
                                    .min(8)
                                    .error((errors)=>{
                                        errors.forEach(err=>{
                                            
                                            getError({ 
                                                error: err, 
                                                name: 'password', 
                                                minValue: 8
                                            })
                                        })
                                        return errors;
                                    }), 
                        })
module.exports = validate

function validate(req, res, next){
    

    try {
        
        let { error } = schema.validate(req.body, { abortEarly: false });
    
        if( error && error.details.length){
            let customErrors = formatErrors(error.details);
            res.status(400).json({
                status: false,
                error: customErrors,
                result: null
            })
        }else{
            next()
        }
    } catch (error) {
        
        logger.error(error)
    }
}
function formatErrors(errors){
return errors.map(item=>{
        return {
                message: item.message,
                path: item.context.key
            }
    })
}

function getError({error, name, anotherName, minValue, maxValue, allowedValues}){

    
    switch(error.code){
        case 'string.pattern.base':{
            error.message = `${name} should be a string.`
            break;
        }

        case 'any.invalid': {
            error.message = `${name} is invalid.`
            break;
        }

        case 'any.only': {
            error.message = `${name} and ${anotherName} do not match.`
            break;
        }

        case 'any.required':{
            error.message = `${name} is required.`
            break;
        }
        case "string.max": {
            error.message = `${name} should not be more than ${maxValue}`;
            break;
        }
        case "string.min": {
            error.message = `${name} should be minimum of ${minValue} characters long.`;
            break;
        }
        case "string.base": {
            error.message = `${name} should be a string.`;
            break;
        }

        case 'string.empty':{
            error.message = `${name} is required.`;
            break;
        }

        case 'string.email': {

            error.message = `${name} should be a valid email.`;
            break;
        }

        default: {
            break;
        }
    }
}