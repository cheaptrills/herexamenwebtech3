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

const create = (req, res) => {
    let chat = new Chat();
    chat.text = "my first chat message";
    chat.user = "vince";
    chat.save( (err, doc) =>{
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