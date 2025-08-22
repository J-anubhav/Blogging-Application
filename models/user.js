const { creatHmac, randomBytes} = require('crypto')
const { Schema, model } = require("mongoose");
const { setDefaultHighWaterMark } = require('stream');

const userschema = new Schema({
    fullName: {
        type : String,
        require : true, 
    },
    email:{
        type : String,
        require : true,
        unique : true,
    },salt:{
        type: String,
        require : true,
    },
    password:{
        type: String,
        require : true,
    },
     profileImageURL: {
        type: String,
        default: '/images/user.png',
     },
     role:{
        type: String,
        enum: ["USER", "ADMIN"],
        default : 'USER',
     }
}, {timestamps: true});

userSchema.pre("save", function (next) {
    const user = this;
    if(!user.ismodified('password')) return ;

    const salt = randomBytes(16).toString();
    const hashedPassword = creatHmac('sha256', salt).update(user.password).digest("hex");

    this.salt =  salt;
    this.password = hashedPassword;

    next()
})


const user = model('user', userSchema);

model.exports = User;