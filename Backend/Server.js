const express=require("express");
const app=express();
const mongoose=require("mongoose");
const cors=require('cors');
const bodyParser = require('body-parser');
const cookieparser= require('cookie-parser');
const authuser=require('./authuser');

const viewuser=require('./viewuser');

mongoose.connect("mongodb://localhost:27017/reactnode",{useUnifiedTopology: true},(err,client)=>{
    if(!err)
    {
        console.log("connection to database successfull")

    }
    else{
        console.log("error connecting to database")
    }
}
)

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true,
}));
app.use(cookieparser());

app.use("/",viewuser);

app.use("/auth/",authuser);

app.listen(5002,()=>{

    console.log("backend is running");

})