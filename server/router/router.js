exports.router=(app)=>{
    var userController=require("./../controller/userController");
    var messageController=require("./../controller/messageController")
    var conversationController=require("./../controller/conversationController")

    app.get('/users/:id',userController.getAll);
    app.post('/users/register',userController.register);
    app.post('/users/login',userController.login);

    app.post('/message',messageController.create_message);
    app.get('/message/:conversationID',messageController.getMessages);

    app.post('/conversation',conversationController.create_conversation);
}