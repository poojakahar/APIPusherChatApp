const mongoose=require('mongoose');

mongoose.connect("mongodb://localhost:27017/ChatApp").then((database)=>{
    console.log("Connect successfully");
}).catch((err)=>{
    console.log("Error in connection: " + err);
})

module.exports=mongoose;