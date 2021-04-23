const mongoose=require('mongoose');
// const validator = require('validator');

const userSchema= new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        minlength: 7,
        validate(value) {
            // • be a string, 6 chars, atleast one num, atleast one letter
            if (value.toLowerCase().includes('password') || value.match(/[a-z]/i) && value.match(/[0-9]/)) {
                throw new Error('Password must contain atleast 6 char, 1 number and 1 letter');
            }
        }
    },
    teamChoosen: {
        type: Boolean,
        default: false
    },
    phoneNumber: {
        type: Number,
        validate(value){
            if (value.length() < 10) {
                throw new Error('Invalid Phone Number');
            }
        }
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
        type: String
    }
});

var User=mongoose.model('User',userSchema);
module.exports=User;