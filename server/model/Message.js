const mongoose=require('./../db/db');

var SMessage=mongoose.Schema({
    conversation_id : {
        type: mongoose.Schema.ObjectId,
        ref:['Conversation'],
    },
    sender: {
        type:mongoose.Schema.Types.ObjectId,
        ref:['User'],
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: ['User'],
    },
    message: {
        createdAt: Date,
        text: String,
        send_by_me: Boolean,
    }
})

var Message=mongoose.model('Message',SMessage);

module.exports={Message};
