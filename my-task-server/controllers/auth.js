const {  IncorrectCredentialsError} = require('../errrors/errors');
const { validations,  } = require('../config/index');
const User = require('../models/user');
const appconfig = require('../config/index');
const { wlogger } = require('../config/index');



// POST /auth/signup
exports.postSignup = async function(req, res, next) {
    wlogger.debug('postSignup: ', req.body);
    const validationResult = validateSignupForm(req.body);
    wlogger.debug('validationResult: ', validationResult);
    if (!validationResult.success) {
        return res.status(400).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors
        });
    }

    try {
        const ifUserExist = await User.getUserByEmail(req.body.email);

        if (ifUserExist) {
            wlogger.debug('ifUserExist: ', `User exist with email ${req.body.email}`);
            return res.status(409).json({
                success: false,
                message: 'Check the form for errors.',
                errors: {
                    email: 'This email is already taken.'
                }
            });
        }
        const user = await User.registerUser(req.body);
        if (user) {
            wlogger.info(`User registered successfully with email: ${req.body.email}`);
            delete req.body.password;
            return res.status(200).json({
                success: true,
                message: 'Sign up success.',
                user: user
            });
        }
    } catch(error) {
        wlogger.error('Error in postSignup: ', error);
        return res.status(400).json({
            success: false,
            message: 'Could not process the form.'
        });
    }
};

// POST /auth/login
exports.postLogin = async function(req, res, next) {
    let { email, password } = req.body;
    const validationResult = validateLoginForm(req.body);
    wlogger.debug('validationResult: ', validationResult);
    if (!validationResult.success) {
        return res.status(400).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors
        });
    }
    try {


        const user = await User.getUserByEmail(email);

        if(!user) {
            wlogger.debug(`Incorrect email or email not found:  ${email}`);
            const err = new IncorrectCredentialsError('Email not found');
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }

       
        return res.status(200).json({
            success: true,
            message: 'Login success.',
            user: user
        });
    } catch (error) {
        wlogger.error('Error in postLogin: ', error);
        return res.status(400).json({
            success: false,
            message: 'Could not process the login.'
        });
    }
};


exports.getUserDetails = async function(req, res, next) {
    wlogger.debug(`get user details`);
    
    try {
        const user = await User.getUserById(req.params.id);
        if(user) {
            wlogger.info(`get user success`);
            res.render('updateUser', {user: user});
        } else {
            wlogger.info(`no users found`);
            return res.json({
                success: true,
                message: 'No users found'
            });
        }
    }
    catch (err) {
        wlogger.error(`get user request failed`);
        return res.status(200).json({
            success: false,
            message: 'get user failed',
            result: err
        });
    }  
}



/**
 * Validate the login form
 *
 * @param   {object} body The HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
function validateLoginForm(body) {
    let errors = '';
    let isFormValid = true;
    let message = '';

    if (!body || typeof body.email !== 'string' ||
      !(validations.email.regex.value).test(body.email.trim())) {
        isFormValid = false;
        errors = validations.email.regex.message;
    }

    if (!body || !body || typeof body.password !== 'string' ||
        body.password.length < validations.password.minLength.value) {
        isFormValid = false;
        errors = validations.password.minLength.message;
    }

    if (!isFormValid) {
        message = 'Check the form for errors.';
    }

    return {
        success: isFormValid,
        message,
        errors
    };
}


/**
 * Validate the sign up form
 *
 * @param   {object} body The HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
function validateSignupForm(body) {
    const errors = {};
    let isFormValid = true;
    let message = '';
    if (!body || typeof body.email !== 'string' ||
      !(validations.email.regex.value).test(body.email.trim())) {
        isFormValid = false;
        errors.email = validations.email.regex.message;
    }

    if (!body || typeof body.password !== 'string' ||
        body.password.length < validations.password.minLength.value) {

        isFormValid = false;
        errors.password = validations.password.minLength.message;
    }

    if (!body || typeof body.fname !== 'string' || body.fname.trim().length === 0) {
        isFormValid = false;
        errors.name = 'Please provide your name.';
    }

    if (!body || typeof body.lname !== 'string' || body.lname.trim().length === 0) {
        isFormValid = false;
        errors.name = 'Please provide your name.';
    }

    if (!body || !body.mobile) {
        isFormValid = false;
        errors.name = 'Please provide your name.';
    }

    if (!isFormValid) {
        message = 'Check the form for errors.';
    }

    return {
        success: isFormValid,
        message,
        errors
    };
}


