import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../UserContext';

const UserSignUp = () => {
  return (

    <section className="main position-absolute h-100 w-100" style={{ backgroundColor:"#2E2B2B"}}>
          
                
    <div class="container position-relative" style={{backgroundColor:"#161212", minWidth:"100vw" ,minHeight:"10vh"}}>
        <b className="navname text-white position-relative py-2" style={{fontSize:"2rem",left:"0%"}}>VERICHAIN</b>
    </div>

    <div className="welcom py-3 position-relative">
      <p className="welcom text-white" style={{fontSize:"3rem"}}>Enter Details to Sign Up!!</p>  
    </div>

 

    <div className="container position-relative py-5" style={{ backgroundColor:"#161212", width:"50%",height:"60vh",borderRadius:"20px",overflowY:"scroll",opacity:"75%"}}>

    <div className="forms py-3 position-relative" style={{height:"100%"}}>

        <label ><b className="name text-white" style={{fontSize:"1.5rem"}}> Name: </b></label><br/>
        <input type="text" id="name" name="name" style={{borderRadius:"20px",width:"60%"}} /><br/><br/>

        <label ><b className="pass text-white" style={{fontSize:"1.5rem"}}>Email:</b></label><br/>
        <input type="text" id="password" name="password" style={{borderRadius:"20px",width:"60%"}} /><br/><br/>


        <label ><b className="pass text-white" style={{fontSize:"1.5rem"}}>Password:</b></label><br/>
        <input type="text" id="password" name="password" style={{borderRadius:"20px",width:"60%"}} /><br/><br/>

        <label ><b className="pass text-white" style={{fontSize:"1.5rem"}}>Confirm Password:</b></label><br/>
        <input type="text" id="password" name="password" style={{borderRadius:"20px",width:"60%"}} /><br/><br/>



        <div className="signout btn"  style={{borderRadius:"20px",color:"white",backgroundColor:"black"}}>Sign up</div> 
        <p className="signumlink text-white pt-3">Have an account?</p> <Link to="/signin" className='text-white px-3' style={{textDecoration:"none"}}> <b className="link text-white" style={{textDecoration:"none"}}>Sign in</b> </Link>

    </div>

        

        
   
    

    </div>


</section>

);
}


      
export default UserSignUp;
