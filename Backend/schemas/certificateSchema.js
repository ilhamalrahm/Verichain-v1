const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Certificate = new Schema({
    filename:String,
    org_email: String,
    stud_email:String,
    pdflink: String,
    hash: String,
    org: String
})

module.exports = mongoose.model('certificate', Certificate);