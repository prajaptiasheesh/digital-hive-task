const User = require('../models/user');
const { wlogger } = require('../config/index');

exports.getUser = async function(req, res) {
    try {

        let user = null;
        let query = req.query;
        let body = req.body;
        let email =  '';
        if(query.email){
            email = query.email
            user = await User.getUserByEmail(query.email);
        }else{
            email = body.email
            user = await User.getUserByEmail(body.email);
        }

        if(user){

            return res.status(200).json({
                success: true,
                user
            });
        }else{

            wlogger.error(`User not found with email ${email}`)
            return res.status(401).json({
                success: false,
                message: `User not found with email ${email}`
            });
        }
    }
    catch (error) {
        wlogger.error('Error in getting profile details: ', error);
        return res.status(400).json({
            success: false,
            message: 'Could not get profile details.'
        });
    }
}


