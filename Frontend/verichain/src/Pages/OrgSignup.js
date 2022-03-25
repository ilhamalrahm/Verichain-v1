import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../UserContext';
import { useMediaQuery } from 'react-responsive';


const UserSignUp = () => {
  const {user,setUser}=useContext(UserContext);
  const [tog,setTog]=useState(false);
  const {org,setOrg}=useContext(UserContext);
  const [message,setMessage]=useState("");
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 840px)'
  });

  const Home=()=>{
    navigate("/");
  }
  const Toggle=()=>{
    setTog(!tog);
    if(tog==false)
    {
      document.getElementById("sidebar").style.visibility="visible";
      console.log(document.getElementById("sidebar").style.visibility);
    }
    else{
      document.getElementById("sidebar").style.visibility="hidden";
      console.log(document.getElementById("sidebar").style.visibility);
    }
  }


  const navigate=useNavigate();
  const Submit=async()=>
  {
      const name=document.getElementById('name').value;
      console.log("helo signup")
      const email=document.getElementById('email').value;
      const password=document.getElementById('password').value;
      if(password.length<8)
      {
        alert("Password should be more than 8 characters long");
      }
      else{
      await axios.post('/api/auth/signup_org',{name,password,email}).then((res)=>{
        if(res.data.success==false)
        {
          setMessage(res.data.data);
        }
        else{
          setMessage(res.data.data);
          navigate('/company');
        }
      })
    }
      
  }

  if(isDesktopOrLaptop){

    if(!user && !org )
    {
    return(

        <section className="main position-absolute" style={{backgroundColor:"#16324F",width:"100%", height:"100vh", overflowY:"scroll"}}>
        <nav className="navbar navbar-dark"style={{backgroundColor:"#16324F"}}>
          <div className="container-fluid justify-content-center position-relative">
          <div className="btn position-absolute signin text-white" onClick={Home} style={{borderRadius:"30px",fontSize:"1.5rem",left:"3%"}}>Home</div>
            <a className="navbar-brand" href="#"><p className="head" style={{fontWeight:"bolder",fontSize:"2.0rem",borderBottom:"solid",borderColor:"#3E92CC",borderWidth:"thick"}}>Sign up as Org</p></a>
          </div>
        </nav>
  
       
        <div className="how position-relative d-md-flex flex-md-row flex-md-wrap justify-content-md-around my-5 py-5"style={{alignContent:"center"}}>
       
         

          <div className="outer  p-2" style={{backgroundColor:"#16324F",width:"40%",maxHeight:"40%",borderRadius:"20px", borderStyle:"solid",borderColor:"white",borderWidth:"medium"}}>
             <div className="inner position-relative d-flex d-flex-column justify-content-center pt-3 pb-3 align-items-center d-flex" style={{backgroundColor:"white",width:"100%",height:"100%",borderRadius:"20px"}}>
            
             <div className="id position-relative px-3" style={{width:"60%"}}>
             <p className="id" style={{fontWeight:"bolder", fontSize:"2.0rem"}}>Name:</p>
                <input className="form-control px-2 py-3 " id="name" style={{width:"100%"}} type="text" placeholder="Name" aria-label="default input example"></input>
                <p className="id" style={{fontWeight:"bolder", fontSize:"2.0rem"}}>Email Id:</p>
                <input className="form-control px-2 py-3 " id="email" style={{width:"100%"}} type="email" placeholder="Email" aria-label="default input example"></input>
                <p className="id" style={{fontWeight:"bolder", fontSize:"2.0rem"}}>Password:</p>
                <input className="form-control px-2 py-3 " id="password" style={{width:"100%"}} type="password" placeholder="Password" aria-label="default input example"></input>

                <div className="btn btn-md signup mt-3 text-white" onClick={Submit} style={{borderRadius:"30px",fontSize:"1.5rem"}}>Sign Up</div>
                <p className="id py-2" style={{fontWeight:"bolder",color:"red", fontSize:"1.5rem"}}>{message}</p>
  
                

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
              <div className="btn position-absolute signin text-white" onClick={Home} style={{borderRadius:"30px",fontSize:"1.5rem",left:"3%"}}>Home</div>
                <a className="navbar-brand" href="#"><p className="head" style={{fontWeight:"bolder",fontSize:"1.4rem",borderBottom:"solid",borderColor:"#3E92CC",borderWidth:"thick"}}>Sign Up as Org</p></a>
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
         <div className="sidebar position-absolute" id="sidebar" style={{backgroundColor:"#2A628F",borderRadius:"10px",zIndex:"100", visibility:"hidden",right:"0%",height:"100vh",width:"40%"}}>
       <div className="btn btn-close position-absolute text-white" onClick={Toggle} style={{left:"3%",top:"1%", backgroundColor:"#3E92CC"}}></div>
       <div className="btn position-absolute text-white" onClick={Home} style={{left:"15%",top:"8%", backgroundColor:"#3E92CC",width:"70%"}}>Home</div>
     

            </div>
        <nav className="navbar navbar-dark"style={{backgroundColor:"#16324F"}}>
          <div className="container-fluid justify-content-center position-relative">
            <a className="navbar-brand" href="#"><p className="head" style={{fontWeight:"bolder",fontSize:"1.4rem",borderBottom:"solid",borderColor:"#3E92CC",borderWidth:"thick"}}>Sign up as org</p></a>
            <div className="btn position-absolute" onClick={Toggle} style={{right:"3%",top:"10%"}}><span class="navbar-toggler-icon"></span></div>
          </div>
        </nav>
  
       
        <div className="how position-relative d-flex flex-colunm justify-content-center align-items-center my-3 py-5"style={{alignContent:"center"}}>

        <div className="outer p-2" style={{backgroundColor:"#16324F",width:"70%",maxHeight:"20%",borderRadius:"20px", borderStyle:"solid",borderColor:"white",borderWidth:"medium"}}>
        <div className="inner position-relative flex-column pb-3 pt-3 align-items-center d-flex" style={{backgroundColor:"white",maxWidth:"100%",maxHeight:"100%",borderRadius:"20px"}}>
          
          <div className="id position-relative px-3">
          <p className="id" style={{fontWeight:"bolder", fontSize:"1.3rem"}}>Name:</p>
            <input className="form-control px-2 py-3 " id="name" style={{width:"100%"}} type="text" placeholder="Name" aria-label="default input example"></input>
            <p className="id" style={{fontWeight:"bolder", fontSize:"1.3rem"}}>Email Id:</p>
            <input className="form-control px-2 py-3 " id="email" style={{width:"100%"}} type="email" placeholder="Email" aria-label="default input example"></input>
            <p className="id" style={{fontWeight:"bolder", fontSize:"1.3rem"}}>Password:</p>
            <input className="form-control px-2 py-3 " id="password" style={{width:"100%"}} type="password" placeholder="Password" aria-label="default input example"></input>
           

           <div className="btn btn-md mt-3 signup text-white" onClick={Submit} style={{borderRadius:"30px",fontSize:"1.3rem"}}>Sign Up</div>

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
             <div className="sidebar position-absolute" id="sidebar" style={{backgroundColor:"#2A628F",borderRadius:"10px",zIndex:"100", visibility:"hidden",right:"0%",height:"100vh",width:"40%"}}>
       <div className="btn btn-close position-absolute text-white" onClick={Toggle} style={{left:"3%",top:"1%", backgroundColor:"#3E92CC"}}></div>
       <div className="btn position-absolute text-white" onClick={Home} style={{left:"15%",top:"8%", backgroundColor:"#3E92CC",width:"70%"}}>Home</div>
      

            </div>
            <nav className="navbar navbar-dark"style={{backgroundColor:"#16324F"}}>
              <div className="container-fluid justify-content-center position-relative">
                <a className="navbar-brand" href="#"><p className="head" style={{fontWeight:"bolder",fontSize:"2.0rem",borderBottom:"solid",borderColor:"#3E92CC",borderWidth:"thick"}}>Sign Up as Org</p></a>
                <div className="btn position-absolute" onClick={Toggle} style={{right:"3%",top:"10%"}}><span class="navbar-toggler-icon"></span></div>
              </div>
            </nav>
      
           
            <div className="how position-relative d-flex flex-colunm justify-content-center align-items-center my-5 py-5"style={{alignContent:"center"}}>
           
             
             
      
           
              <div className="details py-2 " style={{maxWidth:"80%"}}>
                <p className="work text-white text-wrap" style={{fontSize:"2.5rem"}}>
               Sorry, Please log out to Sign Up!
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


      
export default UserSignUp;
