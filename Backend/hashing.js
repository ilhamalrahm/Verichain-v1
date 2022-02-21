const express = require("express");
const app = express();
const mongoose = require("mongoose");


const router = express.Router();

function hashing(linkedemail, pdf, orgemail) {
    var x = linkedemail + pdf + orgemail;
    var Hash = sha256(x);

    // hash checking

    console.log(Hash);
}

router.post("/hashing", (req, res) => {

    // hash here
    var x = req.body.linkedemail + req.body.pdf + req.body.orgemail;
    var Hash = sha256(x);

    // hash checking

    console.log(Hash);

    // save it to mongo3

    const certi = new Certificate({
        org: req.body.orgemail,
        email: email,
        hash: Hash,
        link: req.body.pdf
    })
    certi.save().then(() => {
        console.log("Saved to DB")
    })
});

module.exports = router;