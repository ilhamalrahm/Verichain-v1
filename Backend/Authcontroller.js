const express=require('express');
const jwt = require('jsonwebtoken');
const cookieparser= require('cookie-parser');
const User=require('./schemas/UserSchema');
const bodyParser = require('body-parser')
const Pdf=require('./schemas/PdfSchema');
const Organisation=require('./schemas/organizationSchema');
const Certificate=require('./schemas/certificateSchema');


exports.signIn_stud=async(req,res,next)=>{

  const {email,password}=req.body;
   console.log("signin detected");
  console.log(email);
   console.log(password);

   
   const user= await User.findOne({email:email}).select("+password");
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
exports.signIn_org=async(req,res,next)=>{

    const {email,password}=req.body
    console.log("signin detected");
    
    console.log(password);
 
    
    const user= await Organisation.findOne({email:email}).select("+password");
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

exports.fetchPdf_stud=async(req,res)=>{
    console.log(req.body.owner);
    console.log("this is fetchpdf");
    const own=req.body.owner;

    const name= await Certificate.find({stud_email:own});
            console.log("try block running in pdf");
            console.log(name);
            res.send(name);
}
exports.fetchPdf_org=async(req,res)=>{
    console.log(req.body.owner);
    console.log("this is fetchpdf");
    const own=req.body.owner;

    const name= await Certificate.find({org_email:own});
            console.log("try block running in pdf");
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
    }).status(200).json({success:true});

    console.log("created token and sent");



}

const Signtoken=(name)=>{
    return jwt.sign({name},"random_key",{
        expiresIn:10000000
    });
}

exports.checkUser_stud=async(req,res,next)=>{

    console.log("running chekuser");

    
    var currentuser;

    if(req.cookies.jwt)
    {
        console.log(req.cookies.jwt + " cookie got in database")
        const token=req.cookies.jwt;
        try{
            const decode= await jwt.verify(token,"random_key");
            console.log(decode)
            // const [{name}]= await User.find({name:decode.name});
            const data=await User.findOne({name:decode.name})
            
            console.log(data);
            currentuser=data;
        
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
    console.log(currentuser);
    res.status(200).json({success:true,currentuser:currentuser});

    console.log("sent user");


}

exports.checkUser_org=async(req,res,next)=>{

    console.log("running chekuser");

    
    var currentuser;

    if(req.cookies.jwt)
    {
        console.log(req.cookies.jwt + " cookie got in database")
        const token=req.cookies.jwt;
        try{
            const decode= await jwt.verify(token,"random_key");
            console.log(decode)
            // const [{name}]= await User.find({name:decode.name});
            const data=await Organisation.findOne({name:decode.name})
            
            console.log(data);
            currentuser=data;
        
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
    console.log(currentuser);
    res.status(200).json({success:true,currentuser:currentuser});

    console.log("sent user");


}
//signup part

exports.signUp_stud= (req,res,next)=>{
    console.log("signup detected");
    const {name,email,password}=req.body

    console.log(req.body);
    
    

    const newuser = new User({
        name:name,
        password:password,
        email:email
       

    });

     newuser.save((error,doc)=>{
        if(error)
        {
            console.log("error signing up")
        }
        else
        {
            console.log("signup complete")
            console.log(doc);
        }

        res.status(200).json({success:true});
        
    });
    
}

exports.signUp_org= async(req,res,next)=>{
    console.log("signup detected");
    const {name,email,password}=req.body;

    console.log(req.body);
    
    

    const newuser = Organisation({
        name:name,
        email:email,
        password:password,  

    });

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
