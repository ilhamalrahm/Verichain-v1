const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
const userSchema = new Schema({
    name: String,
    email: {
        type:String,
        unique:true
    },
    password: String

})

userSchema.plugin(uniqueValidator);


module.exports = mongoose.model('User', userSchema);