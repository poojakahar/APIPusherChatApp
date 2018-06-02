var { Conversation } = require("./../model/Conversation");

exports.create_conversation=(req,res)=>{
    Conversation.find({member1: req.body.member1, member2: req.body.member2}).then((docs)=>{
        console.log("Conversation First: ")
        console.log(docs);

        if(!docs || docs.length===0)
        {
            Conversation.find({member1: req.body.member2, member2: req.body.member1}).then((docs)=>{
                console.log("Conversation 2: ")
                console.log(docs);

                if(!docs || docs.length===0)
                {
                    let con=new Conversation({
                        member1:req.body.member1,
                        member2:req.body.member2
                    });

                    con.save().then((docs)=>{
                        console.log("Save: ")
                        console.log(docs);
                        if(!docs)
                        {
                            return res.status(404).json("Not Sent");
                        }
                        res.status(200).json(docs);
                    },(err)=>{
                        res.status(404).json(err);
                    }).catch((err)=>{
                        res.status(404).json(err);
                    });
                }
                else
                {
                    res.status(200).json(docs);
                }
            },(err)=>{
                res.status(404).json(err);
            }).catch((err)=>{
                res.status(404).json(err);
            });
        }
        else
        {
            res.status(200).json(docs);
        }
    },(err)=>{
        res.status(404).json(err);
    }).catch((err)=>{
        res.status(404).json(err);
    });
}