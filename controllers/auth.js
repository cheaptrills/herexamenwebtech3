const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');

const signup = async(req, res, next) => {
let username = req.body.username;
let password = req.body.password;
const date = req.body.date;

    const user = new User({
        username: username,
        date: date
    });
    await user.setPassword(password);
    await user.save().then(result =>{
        let token = jwt.sign({
            uid: result.id,
            date: user.date,
            username: user.username
        }, config.get('jwt.secret'));

         res.json({
            "status": "succes",
            "data": {
                "token": token,
                "birthday": user.date
            }
        });
    }).catch(error=>{
        res.json({
            "status": "error",
            "message": error
        });
    });
};

const login = async (req, res, next) => {
    try{
        const { user } = await User.authenticate()(req.body.username, req.body.password);

        if(!user){
            res.json({
                "status": "failed",
                "message": "login failed"
            });
        }

        let token = jwt.sign({
            uid: user.id,
            username: user.username,
            date: user.date
        }, config.get('jwt.secret'));

         return res.json({
            
        "status": "succes",
        "data": {
            "token": token,
            "birthday": user.date
        }
        });
    }catch(exception){
        res.json({
            "status": "error",
            "message": exception
        });
    }
};

module.exports.signup = signup;
module.exports.login = login;