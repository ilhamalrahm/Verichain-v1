const mongoose=require("mongoose");
const Schema =mongoose.Schema;
const PdfSchema = new Schema({
    name : String,
    url : String,
    owner : String
})

module.exports= mongoose.model('Pdf',PdfSchema);