const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Certificate=require('./schemas/certificateSchema');
const sha256=require("sha256");
const nodemailer=require("nodemailer");
const { restart } = require("nodemon");


const router = express.Router();

const transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:"theverichain@gmail.com",
        pass:"verichain2022"
    }
});


function hashing(linkedemail, pdf, orgemail) {
    var x = linkedemail + pdf + orgemail;
    var Hash = sha256(x);

    // hash checking

    console.log(Hash);
}

router.post("/hashing",async(req, res) => {

    const {org_email,filename,stud_email,org,pdflink}=req.body;
   
    console.log("hash running");
    

    // hash here
    var x = stud_email+ pdflink+ org_email;
    var Hash = sha256(x);
  

    // hash checking

    console.log(Hash);
   const exists=await Certificate.findOne({hash:Hash})
    console.log(exists+" exist here")

    // save it to mongo3
    if(!exists)
    {
    const certi = new Certificate({
        filename:filename,
        org_email: org_email,
        stud_email: stud_email,
        pdflink:pdflink,
        hash: Hash,
        org:org
    })
    try
    {
        certi.save().then(() => {
            console.log("Saved to DB")
            var mailOptions={
                from:"ilhamalrahm@gmail.com",
                to:stud_email,
                subject:"Certificate Recieved",
                text:"Your certificate for the "+ filename+ " has been uploaded on Verichain.\n \n"+
                "https://verichain.live/ \n \n"+
                
                "To access your certificate follow the following steps:\n"+
                "1) Sign-up using the email id  which you have received this email\n"+
                   "(https://verichain.live/user) and sign in\n \n"+

                "2) Scroll down and click on the certificate card and download your certificate\n \n"+
                "What is Verichain and why!?\n /n"+
                "Verichain is certificate authentication and storage  portal.\n"+
                "We aim to bring more value to all certificates issued!!\n"+
                "We provide the unique id wherever needed to prove the authenticity of your certificates!\n"+
                "We only allow valid organizations to upload certificates.\n"+
                "Click the show code on the certificate card to get your unique code for the certificate.\n"+
                "Anyone can verify the certificate by using the code on the landing page\n \n"+
                "Any issues while accessing the certificate  contact on whatsapp\n"+
                "9952006360:Anirudh\n"+
                "9847347134:Ilham\n \n"+
                "Follow us on instagram\n"+
                "@veri.chain"
                


               
            }
            transporter.sendMail(mailOptions,(err,info)=>{
                if(err)
                {
                    console.log("error sending mail");
                    console.log(err);
                    res.status(200).json({success:true,data:"Uploaded successfully but mail not sent due to some error!"});
                }
                else{
                    console.log("mail sent");
                    res.status(200).json({success:true,data:"Uploaded successfully and mail sent!"});
                }
            });
            // res.status(200).json({success:true,data:"Document uploaded Successfully!"})
        })
    }
    catch(er)
    {
        console.log("Error occured");
        res.status(201).json({success:false,data:"Error occured"});
    }
}
else{
    console.log("File already exists");
        res.status(201).json({success:false,data:"Document already exists! "})

}
   
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