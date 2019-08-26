const jwt = require('jsonwebtoken');
const Chat = require("../../../models/Chat");

const getAll = async(req, res) => {
    try{
        const { authorization } =   req.headers;
        var stringeske = "bearer "; 
        var token = authorization.slice(stringeske.length, authorization.length);

        const {date} = jwt.decode(token);
        let birthday = date.toString().substr(4);

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
    chat.user = req.body.user;

    const { authorization } =   req.headers;
        var stringeske = "bearer "; 
        var token = authorization.slice(stringeske.length, authorization.length);

        const {date} = jwt.decode(token);
        let birthday = date.toString().substr(4);
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
            });
        }
    }) 
}

module.exports.getAll = getAll;
module.exports.create = create;