const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Authcontroller=require('./Authcontroller');

const router=express.Router();


router.get("/users_stud",Authcontroller.checkUser_stud);
router.get("/users_org",Authcontroller.checkUser_org);

router.post("/pdf_stud",Authcontroller.fetchPdf_stud);
router.post("/pdf_org",Authcontroller.fetchPdf_org);

module.exports=router;