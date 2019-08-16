const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        "status": "succes" ,
        "data" : {
            "todos": []
        }
    });

});

router.post("/", (req, res) => {
    res.json({
        "status": "succes" ,
        "data" : {
            "todo": {
                "text": "learn Node.js"
            }
        }
    });

});

module.exports = router;