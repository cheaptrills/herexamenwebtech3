const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const DateOnly = require('mongoose-dateonly')(mongoose);

const User = new Schema({
    date: {
        type: DateOnly,
        required: true
    }
});
User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User',User);