import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../UserContext';



const Signin=()=>{
    let navigate=useNavigate()
    const {user,setUser}=useContext(UserContext);

    const setUserContext=()=>{
        axios.get("/users").then((res)=>{
            setUser(res.data.currentuser);
            console.log("current user set");
            navigate("/user");
        });
    }

    const Login=async()=>{
        const names=document.getElementById("name").value;
        const passwords=document.getElementById("password").value
        console.log(names + passwords);

        axios.post("/auth/signin",{
            name:names,
            password:passwords,
        }).then(async(res)=>{
            console.log(res);
           await setUserContext();
        });
        
        
    }
    if(!user)
    {
    return(

        <section className="main position-absolute h-100 w-100" style={{ backgroundColor:"#2E2B2B"}}>
          
                
                    <div class="container position-relative" style={{backgroundColor:"#161212", minWidth:"100vw" ,minHeight:"10vh"}}>
                        <b className="navname text-white position-relative py-2" style={{fontSize:"2rem",left:"0%"}}>VERICHAIN</b>
                    </div>

                    <div className="welcom py-3 position-relative">
                      <p className="welcom text-white" style={{fontSize:"3rem"}}>Sign In!</p>  
                    </div>

                 

                    <div className="container position-relative py-5" style={{ backgroundColor:"#161212", width:"50%",height:"60vh",borderRadius:"20px",overflowY:"scroll",opacity:"75%"}}>

                    <div className="forms py-3 position-relative" style={{height:"100%"}}>

                        <label ><b className="name text-white" style={{fontSize:"1.5rem"}}> Name: </b></label><br/>
                        <input type="text" id="name" name="name" style={{borderRadius:"20px",width:"60%"}} /><br/><br/>
                        <label ><b className="pass text-white" style={{fontSize:"1.5rem"}}>Password:</b></label><br/>
                        <input type="text" id="password" name="password" style={{borderRadius:"20px",width:"60%"}} /><br/><br/>
                        <div className="signout btn" onClick={Login} style={{borderRadius:"20px",color:"white",backgroundColor:"black"}}>Sign in</div> 
                        <p className="signumlink text-white pt-3">Don't have an account yet?</p> <Link to="/signup" className='text-white px-3' style={{textDecoration:"none"}}> <b className="link text-white" style={{textDecoration:"none"}}>Sign up</b> </Link>

                    </div>

                        

                        
                   
                    

                    </div>
                
            
        </section>

    );
    }

    else{
        return(
            <section className="main position-absolute h-100 w-100" style={{ backgroundColor:"#2E2B2B"}}>
          
                
            <div class="container position-relative" style={{backgroundColor:"#161212", minWidth:"100vw" ,minHeight:"10vh"}}>
                <b className="navname text-white position-relative py-2" style={{fontSize:"2rem",left:"0%"}}>VERICHAIN</b>
            </div>

            <div className="welcom py-3 position-relative">
              <p className="welcom text-white" style={{fontSize:"3rem"}}>Already signed in by {user}</p>  
            </div>

         

            <div className="container position-relative py-5" style={{ backgroundColor:"#161212", width:"50%",height:"60vh",borderRadius:"20px",overflowY:"scroll",opacity:"75%"}}>

           

                

                
           
            

            </div>
        
    
</section>
        );
    }
}

export default Signin;