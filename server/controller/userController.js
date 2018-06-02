var { Users } = require("./../model/User");
var _ = require("lodash");

exports.register=(req,res)=>{
    var usr=new Users();

    usr.username=req.body.username;
    usr.password=req.body.password;
    usr.token='no';

    usr.save().then((docs)=>{
        if(!docs)
        {
            return res.status(404).json("Not Saved");
        }
        res.status(200).json(docs);
    },(err)=>{
        res.status(404).json(err);
    }).catch((err)=>{
        res.status(404).json(err);
    });
}

exports.login=(req,res)=>{
    Users.find({username:req.body.username,password:req.body.password}).then((docs)=>{
        if(!docs)
        {
            return res.status(404).json("Not found");
        }

        Users.findOneAndUpdate({username:req.body.username,password:req.body.password},{
            $set:{
                token:'yes'
            }
        }).then((docs)=>{
            if(!docs)
            {
                return res.status(404).json("Not Update");
            }
            res.status(200).json(docs);
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

exports.getAll=(req,res)=>{
    Users.find().then((docs)=>{
        if(!docs)
        {
            return res.status(404).json("Not found");
        }

        let data=docs.filter((obj)=> obj._id!=req.params.id);
        //console.log(data)
        res.status(200).json(data);
    },(err)=>{
        res.status(404).json(err);
    }).catch((err)=>{
        res.status(404).json(err);
    });
}
