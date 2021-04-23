const User = require('../models/user');

exports.createUser = async (data) => {
    try{
        const user = await User.create(data);
        return user;
    }catch(e){
        throw new Error(e);
    }
};

exports.findUserByEmail = async (email) => {
    try{
        const user = await User.findOne({email});
        return user;
    }catch(e){
        throw new Error(e);
    }
};

exports.isValidUser = async (_id) => {
    try{
        const user = await User.findById(_id);
        return user;
    }catch(e){
        throw new Error(e);
    }
};

exports.updateUser = async (data) => {
    try{
        const email = data.email;
        const user = await User.findByIdAndUpdate({email}, data, {new: true});
        return user;
    }catch(e){
        throw new Error(e);
    }
};