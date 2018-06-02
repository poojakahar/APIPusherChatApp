const mongoose=require('./../db/db');

var SConversation=mongoose.Schema({
    member1: {
        type: mongoose.Schema.ObjectId,
        ref:['User'],
    },
    member2: {
        type: mongoose.Schema.ObjectId,
        ref:['User'],
    }
})

var Conversation=mongoose.model('Conversation',SConversation);

module.exports={Conversation};
