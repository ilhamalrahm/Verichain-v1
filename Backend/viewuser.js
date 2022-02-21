const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Authcontroller=require('./Authcontroller');

const router=express.Router();


router.get("/users",Authcontroller.checkUser);

router.post("/pdf",Authcontroller.fetchPdf);

module.exports=router;