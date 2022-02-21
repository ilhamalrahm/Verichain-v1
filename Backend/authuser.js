const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Authcontroller=require('./Authcontroller');

const router=express.Router();


router.post("/signin",Authcontroller.signIn);
router.get("/signout",Authcontroller.signOut);
router.post("/signup",Authcontroller.signUp);

module.exports=router;