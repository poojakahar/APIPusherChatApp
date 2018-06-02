const {Message}= require('./../model/Message')
const Pusher = require('pusher');
const pusherConfig = require('../pusher.json');

const pusherClient = new Pusher(pusherConfig);

exports.create_message=(req,res)=>{
    console.log('User ' + req.body.sender + ' sent message: ' + req.body.message);
    //pusherClient.trigger('new_conversation', 'new_message', { message: "hello world........." });
    /*{
        name: req.body.sender,
        message: req.body.message
    }*/
    //res.sendStatus(204);

    var newMsg=new Message({
        conversation_id: req.body.conversationID,
        sender : req.body.sender,
        message : req.body.message,
        receiver : req.body.receiver,
    });

    newMsg.save().then((docs)=>{
        if(!docs)
        {
            return res.status(404).json("Not Sent");
        }

        Message.find({conversation_id: req.body.conversationID,}).populate("sender").then((docs)=>{
            console.log(docs)
            if(!docs)
            {
                return res.status(404).json("No Data");
            }

            let length=docs.length;

            let msg=[];
                let data={
                    id: docs[length-1]._id,
                    createdAt: docs[length-1].message.createdAt,
                    text: docs[length-1].message.text,
                    send_by_me: docs[length-1].message.send_by_me,
                    sender: docs[length-1].sender._id,
                    sender_name: docs[length-1].sender.username,
                }
                msg.push(data);
            let obj={
                conversation_id: docs[0].conversation_id,
                sender: docs[0].sender._id,
                sender_name: docs[0].sender.username,
                receiver: docs[0].receiver,
                message: msg
            }
            pusherClient.trigger('new_conversation', 'new_message', obj );
            res.status(200).json(obj);
        },(err)=>{
            res.status(404).json(err);
        }).catch((err)=>{
            res.status(404).json(err);
        });
        //res.status(200).json(docs);
    },(err)=>{
        res.status(404).json(err);
    }).catch((err)=>{
        res.status(404).json(err);
    });
}

exports.getMessages=(req,res)=>{
    console.log(req.params.conversationID);
    Message.find({conversation_id: req.params.conversationID}).then((docs)=>{
        //console.log(docs)
        if(!docs || docs.length===0)
        {
            return res.status(201).json("Start Conversation");
        }
        else
        {
            Message.find({conversation_id: req.params.conversationID}).populate("sender").then((docs)=>{
                /*console.log("Inner Method");
                console.log(docs)*/
                if(!docs || docs.length===0)
                {
                    return res.status(201).json("Start Conversation");
                }
                else
                {
                    let msg=[];
                    docs.map((value)=>{
                        let data={
                            id: value._id,
                            createdAt: value.message.createdAt,
                            text: value.message.text,
                            send_by_me: value.message.send_by_me,
                            sender: value.sender._id,
                            sender_name: value.sender.username,
                        }
                        msg.push(data);
                    });
                    let obj={
                        conversation_id: docs[0].conversation_id,
                        sender: docs[0].sender._id,
                        sender_name: docs[0].sender.username,
                        receiver: docs[0].receiver,
                        message: msg
                    }
                    return res.status(200).json(obj);
                }

            },(err)=>{
                res.status(404).json(err);
            }).catch((err)=>{
                console.log("Inner Catch: " + err);
                res.status(404).json(err);
            });
        }

    },(err)=>{
        res.status(404).json(err);
    }).catch((err)=>{
        console.log("In Outer: " + err);
        res.status(404).json(err);
    });
}

const messageGet=()=>{
    Message.find({conversation_id: req.params.conversationID,}).populate("sender").then((docs)=>{
        console.log(docs)
        if(!docs)
        {
            return res.status(404).json("No Data");
        }

        let msg=[];
        docs.map((value)=>{
            let data={
                id: value._id,
                createdAt: value.message.createdAt,
                text: value.message.text,
                send_by_me: value.message.send_by_me,
                sender: value.sender._id,
                sender_name: value.sender.username,
            }
            msg.push(data);
        });
        let obj={
            conversation_id: docs[0].conversation_id,
            sender: docs[0].sender._id,
            sender_name: docs[0].sender.username,
            receiver: docs[0].receiver,
            message: msg
        }
        res.status(200).json(obj);
    },(err)=>{
        res.status(404).json(err);
    }).catch((err)=>{
        res.status(404).json(err);
    });
}