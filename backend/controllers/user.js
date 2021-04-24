const {successHandler, errorHandler} =  require('../helpers/responseHandler');
var accountSid = process.env.TWILIO_ACCOUNT_SID;
var authToken = process.env.TWILIO_AUTH_TOKEN;

exports.sendOTP = async (req, res) => {
    try{

        let err;

        const client = require('twilio')(accountSid, authToken, {
            lazyLoading: true
        });
        console.log(client);

        successHandler(res, user, 201);

    }catch(e){
        errorHandler(res, e.statusCode, e.message);
    }
};