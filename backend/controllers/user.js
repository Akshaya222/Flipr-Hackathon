const {successHandler, errorHandler} =  require('../helpers/responseHandler');

exports.sendOTP = async (req, res) => {
    try{

        let err;

        successHandler(res, user, 201);

    }catch(e){
        errorHandler(res, e.statusCode, e.message);
    }
};