const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Certificate=require('./schemas/certificateSchema');
const sha256=require("sha256");


const router = express.Router();

function hashing(linkedemail, pdf, orgemail) {
    var x = linkedemail + pdf + orgemail;
    var Hash = sha256(x);

    // hash checking

    console.log(Hash);
}

router.post("/hashing", (req, res) => {

    const {org_email,filename,stud_email,org,pdflink}=req.body;
    console.log("hash running");

    // hash here
    var x = stud_email+ pdflink+ org_email;
    var Hash = sha256(x);
  

    // hash checking

    console.log(Hash);

    // save it to mongo3

    const certi = new Certificate({
        filename:filename,
        org_email: org_email,
        stud_email: stud_email,
        pdflink:pdflink,
        hash: Hash,
        org:org
    })
    certi.save().then(() => {
        console.log("Saved to DB")
        res.status(200).json({success:true,data:"Uploaded successfully"});
    })
});


router.post("/verify",(req,res)=>{
    const {hash}=req.body;
    console.log(req.body)
    console.log(hash)
    Certificate.findOne({hash:hash},(error,response)=>{
        if(error)
        {
            console.log("Error finding pdf");
            res.status(500).json({success:false,data:"error finding pdf with hash"});
        }
        else{
            const send_data=response;
            console.log(send_data);
            if(send_data!=null){
            res.status(200).json({success:true,data:send_data});
            }
            else{
                res.status(200).json({success:false,data:send_data});

            }
        }
    })

});
module.exports = router;