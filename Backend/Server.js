const express=require("express");
const app=express();
const mongoose=require("mongoose");
const cors=require('cors');
const bodyParser = require('body-parser');
const cookieparser= require('cookie-parser');
const authuser=require('./authuser');
const hashing=require('./hashing');

const viewuser=require('./viewuser');

mongoose.connect("mongodb+srv://verichain:helloverichain123@main.ehj4f.mongodb.net/verichain_database?retryWrites=true&w=majority",{useUnifiedTopology: true},(err,client)=>{
    if(!err)
    {
        console.log("connection to database successfull")

    }
    else{
        console.log(err);
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

app.use("/api/",viewuser);

app.use("/api/auth/",authuser);
app.use("/api/upload/",hashing);

app.listen(5000,()=>{

    console.log("backend is running");

})