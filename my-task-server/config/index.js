const validations = require('../validation/model-validations');
const app = require('./app')[process.env.NODE_ENV];
const logger = require('../config/winston');
// const constants = require('./constants');

module.exports = {
    dbUri: app.db,

    logging: {
        dbUri: app.db
    },

    // jsonwebtoken secret
    jwtSecret: '!!secret phrase!!',

    // Model validations
    validations, // :validations,

    // Env variables
    port: app.port,

    host: app.host,

    sms_api_key: app.sms_api_key,

    server_uri: app.server_uri,

    admin_share: app.admin_share,

    admin_email: app.admin_email,

    admin_password: app.admin_password,

    wlogger: logger,

};