const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
const Certificate = new Schema({
    filename:String,
    org_email: String,
    stud_email:String,
    pdflink: String,
    hash: {
        type:String,
    },
    org: String
})


module.exports = mongoose.model('certificate', Certificate);