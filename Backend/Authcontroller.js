const express=require('express');
const jwt = require('jsonwebtoken');
const cookieparser= require('cookie-parser');
const User=require('./schemas/UserSchema');
const bodyParser = require('body-parser')
const Pdf=require('./schemas/PdfSchema');
const Organisation=require('./schemas/organizationSchema');
const Certificate=require('./schemas/certificateSchema');
const bcrypt = require('bcrypt');
const saltRounds = 10;


exports.signIn_stud=async(req,res,next)=>{

  const {email,password}=req.body;
   console.log("signin detected");
  console.log(email);
   console.log(password);
   var match=null;

   
   const user= await User.findOne({email:email}).select("+password");
   if(user)
   {
     match= await bcrypt.compare(password,user.password)
   }
   
   if(!user || !match)
   {
       console.log("username or password incorrect");
       res.status(200).json({success:false,data:"Please recheck your credentials!"});
       
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
    var match=null;
 
    
    const user= await Organisation.findOne({email:email}).select("+password");
    if(user){
    match= await bcrypt.compare(password,user.password)
    }
    if(!user || !match)
    {
        console.log("username or password incorrect");
        res.status(200).json({success:false,data:"Please recheck your credentials!"});
        
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
        sameSite:"None",
        domain:"http://3.6.100.244/"
    }).status(200).json({success:true,data:"Logged out!"});

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
        sameSite:"None",
        domain:"http://verichain.live"
    }).status(200).json({success:true,data:"Login successful!"});

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

exports.signUp_stud= async(req,res,next)=>{
    console.log("signup detected");
    const {name,email,password}=req.body

    console.log(req.body);

    const exists= await User.findOne({email:email});

  if(!exists)
  {
    bcrypt.hash(password, saltRounds).then(async(hash)=> {
        // Store hash in your password DB.
        const newuser = new User({
            name:name,
            password:hash,
            email:email
           
    
        });
    
         newuser.save((error,doc)=>{
            if(error)
            {
                console.log("error signing up")
                res.status(200).json({success:false,data:"Error occured!"});
            }
            else
            {
                console.log("signup complete")
                res.status(200).json({success:true,data:"Signup Successfull!"});
                console.log(doc);
            }
    
            
            
        });
    });
    
    
}
else{
    console.log("user already exists");
    res.status(200).json({success:false,data:"Account already exists for this Email!"});
}
}

exports.signUp_org= async(req,res,next)=>{
    console.log("signup detected");
    const {name,email,password}=req.body;

    console.log(req.body);
    const exists= await Organisation.findOne({email:email});
    
    if(!exists)
    {
        bcrypt.hash(password, saltRounds).then(async(hash)=> {
            // Store hash in your password DB.
            const newuser = Organisation({
                name:name,
                email:email,
                password:hash,  
        
            });
        
            await newuser.save((error,doc)=>{
                if(error)
                {
                    console.log("error signing up")
                    res.status(200).json({success:false,data:"Error Occurred!"});
                }
                else
                {
                    console.log("signup complete")
                    res.status(200).json({success:true,data:"Signup Successful!"});
                }
        
                
                
            });
        });

    
    
}
else{
    console.log("user already exists");
    res.status(200).json({success:false,data:"Account already exists for this Email!"});
}
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
