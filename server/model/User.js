const mongoose=require('./../db/db');

var SUser=mongoose.Schema({
    username: {
        type: String,
    },
    password:{
        type: String,
    },
    token: {
        type: String,
    }
})

var Users=mongoose.model('User',SUser);

module.exports={Users};
