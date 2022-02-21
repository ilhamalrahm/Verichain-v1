const express=require('express');
const jwt = require('jsonwebtoken');
const cookieparser= require('cookie-parser');
const User=require('./UserSchema');
const bodyParser = require('body-parser')
const Pdf=require('./PdfSchema');


exports.signIn=async(req,res,next)=>{

   const name=req.body.name;
   const password=req.body.password;
   console.log("signin detected");
   console.log(name);
   console.log(password);

   
   const user= await User.findOne({name:name}).select("+password");
   if(!user || password!=user.password)
   {
       console.log("username or password incorrect");
       
   }
   else{
       console.log("successful")
     await createusertoken(user,200,req,res);
     console.log("token created");
   }

}

exports.signOut=async(req,res)=>{
    const token=Signtoken("nouser");
    let d=new Date();
    d=d.setDate(d.getDate()+30);
    await res.cookie("jwt",token,{
        expiresIn:d,
        httpOnly:true,
        secure:true,
        sameSite:"None"
    }).status(200).send("sent cookie with token");

}

exports.fetchPdf=async(req,res)=>{
    console.log(req.body.owner);
    console.log("this is fetchpdf");
    const own=req.body.owner;

    const name= await Pdf.find({owner:own});
            console.log("try block running in if");
            console.log(name);
            res.send(name);
}

const createusertoken=async(user,code,req,res)=>{
    const token=Signtoken(user.name);
    let d=new Date();
    d=d.setDate(d.getDate()+30);

    await res.cookie("jwt",token,{
        expiresIn:d,
        httpOnly:true,
        secure:true,
        sameSite:"None"
    }).send("sent cookie with token");

    console.log("created token and sent");



}

const Signtoken=(name)=>{
    return jwt.sign({name},"random_key",{
        expiresIn:10000000
    });
}

exports.checkUser=async(req,res,next)=>{

    console.log("running chekuser");

    
    var currentuser;

    if(req.cookies.jwt)
    {
        console.log(req.cookies.jwt + " cookie got in database")
        const token=req.cookies.jwt;
        try{
            const decode= await jwt.verify(token,"random_key");
            const [{name}]= await User.find({name:decode.name});
            console.log("try block running in if");
            console.log(name);
            currentuser=name;
        
        }
        catch(Err)
        {
            console.log("jwt changed");
            currentuser=null;
        }
    }
    else{
        console.log("cookie not found, no current user");
        currentuser=null
    }
    res.status(200).send({currentuser});

    console.log("sent user");


}
//signup part

exports.signUp= async(req,res,next)=>{
    console.log("signup detected");

    console.log(req.body);
    
    

    const newuser = User({
        name:req.body.name,
        password:req.body.password,
       

    })

    await newuser.save((error,doc)=>{
        if(error)
        {
            console.log("error signing up")
        }
        else
        {
            console.log("signup complete")
        }

        res.status(200).redirect('/signin');
        
    });
    
}





//code template to upload pdf

// const newpdf = Pdf({
//     name:"first pdf",
//     url:"link_for _pdf,
//     owner:"ilham"

// })

// await newpdf.save((error,doc)=>{
//     if(error)
//     {
//         console.log("error signing up")
//     }
//     else
//     {
//         console.log("signup complete")
//     }

//     res.status(200).redirect('/signin');
    
// });
