const jwt = require('jsonwebtoken');
const Chat = require("../../../models/Chat");

const cutBday = (headers) =>{

    const { authorization } = headers;
        var stringeske = "bearer "; 
        var token = authorization.slice(stringeske.length, authorization.length);

        const {date, uid,username} = jwt.decode(token);
        let birthday = date.toString().substr(4);

        return {birthday, uid,username};

}

const getAll = async(req, res) => {
    try{
        const {birthday} = cutBday(req.headers);

        const result = await Chat.find({date:birthday}).exec();


        res.json({
            "status": "succes" ,
            "data" : {
                "chat": result
            }
        });
    }catch(ex){
        res.json({
            "status": "failed" ,
            "data" : {
                "message": "something went wrong"
            }});
    }
}

const create = (req, res, next) => {
    let chat = new Chat();
    chat.text = req.body.text;

    const {birthday, username} = cutBday(req.headers);
        chat.user = username;
        chat.date = birthday;

    chat.save( (err, doc) =>{
        if(err){
            res.json({
                "status": "error",
                "message": "could not send chat"
            });
        }
        if(!err){
            res.json({
                "status": "succes",
                "data": chat
            });
        }
    }) 
}

module.exports.getAll = getAll;
module.exports.create = create;