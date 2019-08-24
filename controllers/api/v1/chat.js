const Chat = require('../../../models/Chat');

const getAll = (req, res) => {
    Chat.find({
        "user": "vince"
    }, (err,docs) => {
        if(!err){
            res.json({
                "status": "succes",
                "data": {
                    "chats": docs
                }
            });
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
                "message": "couldn't send chat item"
            })
        }

        if(!err){
            res.json({
                "status": "succes",
                "data": {
                    "chat": doc
                }
            });
        }
    })

    
}

module.exports.getAll = getAll;
module.exports.create = create;