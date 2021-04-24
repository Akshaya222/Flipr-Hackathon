const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const { errorHandler } =  require('../../helpers/responseHandler');

exports.auth = async (req, res, next) => {
    try {
        let err;

        const userToken = req.header('Authorization');

        // check if token is valid and hasn't expired
        const decoded = jwt.verify(userToken, process.env.JWT_SECRET);

        const user = await User.findOne({userToken});

        if (!user){
            err = new Error('Please Register first');
            err.statusCode = 401;
            throw err;
        }

        next();

    } catch (e) {
      errorHandler(res, e.statusCode, e.message);
    }
};
