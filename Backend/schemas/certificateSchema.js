const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Certificate = new Schema({
    email: String,
    link: String,
    hash: String,
    org: String
})

module.exports = mongoose.model('certificate', Certificate);