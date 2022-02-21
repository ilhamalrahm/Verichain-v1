const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const OrgSchema = new Schema({
    name: String,
    email: String,
    password: String
})

module.exports = mongoose.model('orgSchema', OrgSchema);