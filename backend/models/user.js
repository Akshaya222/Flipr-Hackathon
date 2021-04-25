const mongoose=require('mongoose');
// const validator = require('validator');

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        lowercase:true
    },
    username: {
        type: String,
        // unique: true,
        lowercase: true
        // default: null
    },
    password: {
        type: String,
        minlength: 7
        // default: null
    },
    fbID:{
        type: String
    },
    phoneNumber: {
        type: Number
        // default: null
    },
    currCredits: {
        type: Number,
        default: 100
    },
    totalCredits: {
        type: Number,
        default: 100
    },
    token: {
        type: String,
        default: null
    }
});

userSchema.methods.toJSON = function() {
    var obj = this.toObject(); //or var obj = this;
    delete obj.password;
    return obj;
};   

var User=mongoose.model('User',userSchema);
module.exports=User;