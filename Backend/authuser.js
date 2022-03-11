const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Authcontroller=require('./Authcontroller');

const router=express.Router();


router.post("/signin_stud",Authcontroller.signIn_stud);
router.post("/signin_org",Authcontroller.signIn_org);

router.get("/signout",Authcontroller.signOut);
router.post("/signup_stud",Authcontroller.signUp_stud);
router.post("/signup_org",Authcontroller.signUp_org);


module.exports=router;