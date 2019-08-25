const User = require('../models/User');

const signup = async(req, res, next) => {
let username = req.body.username;
let password = req.body.password;

    const user = new User({
        username: username
    });
    await user.setPassword(password);
    await user.save().then(result =>{

         res.json({
            "status": "succes",
            "data": {
                "user": result
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
        res.json({
            
        "status": "succes",
        "data": {
            "user": user
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