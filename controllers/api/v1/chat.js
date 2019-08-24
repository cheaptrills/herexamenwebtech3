const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const chatSchema = new Schema({

    text: String,
    user: String,

});
 
const Chat = mongoose.model('chat', chatSchema);

const getAll = (req, res) => {
    res.json({
        "status": "succes" ,
        "data" : {
            "chat": []
        }
    });
}

const create = (req, res, next) => {
    let chat = new Chat();
    chat.text = req.body.text;
    chat.user = req.body.user;
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