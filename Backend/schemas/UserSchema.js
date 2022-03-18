const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
const userSchema = new Schema({
    name: String,
    email: {
        type:String,
        
    },
    password: String

})




module.exports = mongoose.model('User', userSchema);