import React, { useEffect, useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Link , useNavigate} from 'react-router-dom';
import axios from 'axios';
import Mail from "./Images/Mail.svg";
import Uploads from  "./Images/Upload.svg";
import Chain from "./Images/chain.svg";
import { useMediaQuery } from 'react-responsive';

import { UserContext } from '../UserContext';



const Signin_org=()=>{
    let navigate=useNavigate()
    const {user,setUser}=useContext(UserContext);
    const {org,setOrg}=useContext(UserContext);
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 768px)'
      });


    const setUserContext=()=>{
        axios.get("/api/users_stud",{withCredentials:true}).then((res)=>{
            setUser(res.data.currentuser);
            console.log("current user set");
            navigate("/user");
        });
    }
    const Home=()=>{
      navigate("/");
    }

    const Login=async()=>{
        const names=document.getElementById("name").value;
        const passwords=document.getElementById("password").value
        console.log(names + passwords);

        axios.post("/api/auth/signin_org",{withCredentials:true},{
            name:names,
            password:passwords,
        }).then(async(res)=>{
            console.log(res);
           await setUserContext();
        });   
        
    }

    if(isDesktopOrLaptop){

    if(!user && !org )
    {
    return(

        <section className="main position-absolute" style={{backgroundColor:"#16324F",width:"100%", height:"100vh", overflowY:"scroll"}}>
        <nav className="navbar navbar-dark"style={{backgroundColor:"#16324F"}}>
          <div className="container-fluid justify-content-center position-relative">
          <div className="btn position-absolute signin text-white" onClick={Home} style={{borderRadius:"30px",fontSize:"1.5rem",left:"3%"}}>Home</div>
            <a className="navbar-brand" href="#"><p className="head" style={{fontWeight:"bolder",fontSize:"2.0rem",borderBottom:"solid",borderColor:"#3E92CC",borderWidth:"thick"}}>Signin</p></a>
          </div>
        </nav>
  
       
        <div className="how position-relative d-md-flex flex-md-row flex-md-wrap justify-content-md-around my-5 py-5"style={{alignContent:"center"}}>
       
         

          <div className="outer  p-2" style={{backgroundColor:"#16324F",width:"40%",maxHeight:"40%",borderRadius:"20px", borderStyle:"solid",borderColor:"white",borderWidth:"medium"}}>
             <div className="inner position-relative d-flex d-flex-column justify-content-center pt-3 pb-3 align-items-center d-flex" style={{backgroundColor:"white",width:"100%",height:"100%",borderRadius:"20px"}}>
            
             <div className="id position-relative px-3" style={{width:"60%"}}>
                <p className="id" style={{fontWeight:"bolder", fontSize:"2.0rem"}}>Email Id:</p>
                <input className="form-control px-2 py-3 " id="name" style={{width:"100%"}} type="text" placeholder="Unique ID" aria-label="default input example"></input>
                <p className="id" style={{fontWeight:"bolder", fontSize:"2.0rem"}}>Password:</p>
                <input className="form-control px-2 py-3 " id="password" style={{width:"100%"}} type="text" placeholder="Unique ID" aria-label="default input example"></input>

                <div className="btn btn-md mt-3 text-white" onClick={Login} style={{backgroundColor:"#2A628F",borderRadius:"30px",fontSize:"1.5rem"}}>Sign In</div>

            </div>
        </div>
      </div>

       
         
  
        </div>
  
        
  
        
       
  
       
  
    
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
  
  
  
      </section>

    );
    }

    else{
        return(
            <section className="main position-absolute" style={{backgroundColor:"#16324F", height:"100%", width:"100%"}}>
            <nav className="navbar navbar-dark"style={{backgroundColor:"#16324F"}}>
              <div className="container-fluid justify-content-center position-relative">
                <a className="navbar-brand" href="#"><p className="head" style={{fontWeight:"bolder",fontSize:"2.0rem",borderBottom:"solid",borderColor:"#3E92CC",borderWidth:"thick"}}>Signin</p></a>
              </div>
            </nav>
      
           
            <div className="how position-relative d-flex flex-colunm justify-content-center align-items-center my-5 py-5"style={{alignContent:"center"}}>
           
             
             
      
           
              <div className="details py-2 " style={{maxWidth:"80%"}}>
                <p className="work text-white text-wrap" style={{fontSize:"2.5rem"}}>
               Sorry, you are already Signed in
                </p>
              </div>
      
             
      
           
             
      
            </div>
      
            
      
      
            
      
           
      
        
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
      
      
      
          </section>
        );
    }
}
else
{
    if(!user  && !org)
    {   
        return(
        <section className="main" style={{backgroundColor:"#16324F", height:"100vh",width:"100%",overflowY:"scroll"}}>
        <nav className="navbar navbar-dark"style={{backgroundColor:"#16324F"}}>
          <div className="container-fluid justify-content-center position-relative">
            <a className="navbar-brand" href="#"><p className="head" style={{fontWeight:"bolder",fontSize:"2.0rem",borderBottom:"solid",borderColor:"#3E92CC",borderWidth:"thick"}}>Sign in</p></a>
          </div>
        </nav>
  
       
        <div className="how position-relative d-flex flex-colunm justify-content-center align-items-center my-5 py-5"style={{alignContent:"center"}}>

        <div className="outer p-2" style={{backgroundColor:"#16324F",maxWidth:"70%",maxHeight:"20%",borderRadius:"20px", borderStyle:"solid",borderColor:"white",borderWidth:"medium"}}>
        <div className="inner position-relative flex-column pb-3 pt-3 align-items-center d-flex" style={{backgroundColor:"white",maxWidth:"100%",maxHeight:"100%",borderRadius:"20px"}}>
          
          <div className="id position-relative px-3">
            <p className="id" style={{fontWeight:"bolder", fontSize:"2.0rem"}}>Email Id:</p>
            <input className="form-control px-2 py-3 " id="name" style={{width:"100%"}} type="text" placeholder="Unique ID" aria-label="default input example"></input>
            <p className="id" style={{fontWeight:"bolder", fontSize:"2.0rem"}}>Password:</p>
            <input className="form-control px-2 py-3 " id="password" style={{width:"100%"}} type="text" placeholder="Unique ID" aria-label="default input example"></input>
           

           <div className="btn btn-md mt-3 text-white" onClick={Login} style={{backgroundColor:"#2A628F",borderRadius:"30px",fontSize:"1.5rem"}}>Sign in</div>

          </div>
        </div>
      </div>
       
         
        
         
  
       
         
  
        </div>
  
       
  
       
  
  
        
  
  
       
  
    
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
  
  
  
      </section>
        );

    }
    else{
        return(
            <section className="main position-absolute" style={{backgroundColor:"#16324F", height:"100%", width:"100%"}}>
            <nav className="navbar navbar-dark"style={{backgroundColor:"#16324F"}}>
              <div className="container-fluid justify-content-center position-relative">
                <a className="navbar-brand" href="#"><p className="head" style={{fontWeight:"bolder",fontSize:"2.0rem",borderBottom:"solid",borderColor:"#3E92CC",borderWidth:"thick"}}>Organisation</p></a>
              </div>
            </nav>
      
           
            <div className="how position-relative d-flex flex-colunm justify-content-center align-items-center my-5 py-5"style={{alignContent:"center"}}>
           
             
             
      
           
              <div className="details py-2 " style={{maxWidth:"80%"}}>
                <p className="work text-white text-wrap" style={{fontSize:"2.5rem"}}>
               Sorry, you are not Signed in. Please Sign in
                </p>
              </div>
      
             
      
           
             
      
            </div>
      
            
      
      
            
      
           
      
        
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
      
      
      
          </section>
        );
    }
}

}

export default Signin_org;


