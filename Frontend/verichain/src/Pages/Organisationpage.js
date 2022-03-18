import React, { useEffect, useState } from "react";
import { UserContext } from '../UserContext';
import "bootstrap/dist/css/bootstrap.css";


import { useContext } from 'react';
import { Link, useNavigate, Redirect } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';
import Try from "./Images/Try.svg";
import Chain from "./Images/chain.svg";
import Mail from "./Images/Mail.svg";
import File from "./Images/File.svg";
import Uploads from  "./Images/Upload.svg";
import axios from "axios";
import { useCheckOrg } from "../useCheckOrg";
import Signin_org from "./OrgSignin";

// import { sha256 } from "js-sha256";

const Orgpage = () => {
  

   const {org,setOrg}=useContext(UserContext);
    const navigate=useNavigate();

    const [tog,setTog]=useState(false);
    const [refresh,setRefresh]=useState(false);
    const [message,setMessage]=useState("");
    const [docstatus,setDocstatus]=useState("");

  

    const setUserContext=()=>{
        axios.get("/users_org").then((res)=>{
            setOrg(res.data.currentuser);
            console.log("current user set");
            
        });
    }

    const Login=async()=>{
      const emails=document.getElementById("email").value;
      const passwords=document.getElementById("password").value
      

      axios.post("/auth/signin_org",{
          email:emails,
          password:passwords,
      }).then(async(res)=>{
        console.log(res.data.data);
        setMessage(res.data.data);
        console.log("error data");
         await setUserContext();
      });   
      
  }
    

    const [pdf,setPdf]=useState([]);

    const Signout=()=>{
        axios.get("/auth/signout").then(async(res)=>{
          setMessage(res.data.data);
            await setUserContext();
        })
    }
    const Navigate=()=>{
      navigate('/signup_org');
    }

    const Upload=async(val)=>{
      
      const stud_emails=document.getElementById('stud_email').value;
      console.log(stud_emails);
      const pdflinks=document.getElementById('pdflink').value;
      const filenames=document.getElementById("filename").value;
      console.log("in upload")
      setDocstatus("Uploading...")
      
      await axios.post("/upload/hashing",{
          org_email:val.email,
          org:val.name,
          filename:filenames,
          stud_email:stud_emails,
          pdflink:pdflinks

      }).then((res)=>{
        if(res.data.success==true)
        {
          document.getElementById("docstatus").style.color="green";
          setDocstatus(res.data.data);
        }
        else{
          document.getElementById("docstatus").style.color="red";
          setDocstatus(res.data.data);
        }
      });
      setRefresh(!refresh);
    }
   

    useEffect(()=>{
        console.log("useffect running");
       

          try{
       
            axios.post("/pdf_org",{
                owner:org.email
            }).then((res)=>{
                // console.log(res.data[0].url);
                // console.log(res.data);
                setPdf(res.data);
            }).catch((err)=>{
                console.log("error occured in useffect");
                console.log(err);
                
            })
        }
      catch(er)
      {
        console.log("unable to fetch");
      }
    }
        
    ,[org,refresh]);

    


  

    
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 768px)'
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
 



  const change_Sigin = () =>{ 
    let path = `/signin`; 
    navigate(path);
 
  }

  let navigate1 = useNavigate();

  const change_Sigup = () =>{ 
    let path = `/signup`; 
    navigate(path);
 
  }
  console.log(pdf)



if(isDesktopOrLaptop)
{
  if(org){

  return (
    <section className="main" style={{backgroundColor:"#16324F", height:"100%"}}>
      <nav className="navbar navbar-dark"style={{backgroundColor:"#16324F"}}>
        <div className="container-fluid justify-content-center position-relative">
        <div className="btn position-absolute signin text-white" onClick={Home} style={{borderRadius:"30px",fontSize:"1.5rem",left:"3%"}}>Home</div>
          <a className="navbar-brand" href="#"><p className="head" style={{fontWeight:"bolder",fontSize:"2.0rem",borderBottom:"solid",borderColor:"#3E92CC",borderWidth:"thick"}}>Organisation</p></a>
          <div className="btn position-absolute signin text-white" onClick={Signout} style={{borderRadius:"30px",fontSize:"1.5rem",right:"3%"}}>Logout</div>
          
        </div>
      </nav>

     
      <div className="how position-relative d-md-flex flex-md-row flex-md-wrap justify-content-md-around my-5 py-5"style={{alignContent:"center"}}>

     
        <div className="details py-2 " style={{maxWidth:"80%"}}>
          <p className="work text-white text-wrap" style={{fontSize:"1.5rem"}}>
          Handling certificates after any event can be a real headache, and we make it a piece of cake.
You have to upload the certificate below and add the email id linked with the certificate. The certificates will show up in their account whenever the user logs in using the same email id. This provides you with a hassle-free way of distributing certificates provides you with a token of authenticity, and ensures that no one can forfeit your certificates.
          </p>
        </div>

 
      </div>

      <div className="buttons position-relative flex-wrap d-flex justify-content-around my-2 py-2">

        <div className="inner position-relative pt-3  pb-3 align-items-center d-md-flex" style={{maxWidth:"100%",maxHeight:"100%",borderRadius:"20px"}}>
          <img src={Uploads} className="position-relative p-0" alt="" style={{height:"60%",width:"60%"}} />
          <div className="id position-relative px-2">
            <p className="id text-white"  style={{fontWeight:"bolder", fontSize:"2.0rem"}}>File link:</p>
            <input className="form-control px-3 py-2" id="pdflink" style={{width:"100%", backgroundColor:"#94C8EC"}} type="text" placeholder="File Link" aria-label="default input example"></input>


          </div>
        </div>
        <div className="inner position-relative pt-3  pb-3 align-items-center d-flex" style={{maxWidth:"100%",maxHeight:"100%",borderRadius:"20px"}}>
          <img src={Chain} className="position-relative p-0" alt="" style={{height:"60%",width:"60%"}} />
          <div className="id position-relative px-2">
            <p className="id text-white text-nowrap"  style={{fontWeight:"bolder", fontSize:"2.0rem"}}>File name:</p>
            <input className="form-control px-3 py-2 " id="filename" style={{width:"100%",backgroundColor:"#94C8EC",}} type="text" placeholder="File Name" aria-label="default input example"></input>

          

          </div>
        </div>
        <div className="inner position-relative pt-3  pb-3 align-items-center d-flex" style={{maxWidth:"100%",maxHeight:"100%",borderRadius:"20px"}}>
          <img src={Mail} className="position-relative p-0" alt="" style={{height:"60%",width:"60%"}} />
          <div className="id position-relative px-2">
            <p className="id text-white text-nowrap"  style={{fontWeight:"bolder", fontSize:"2.0rem"}}>Linked Email:</p>
            <input className="form-control px-3 py-2 " id="stud_email" style={{width:"100%",backgroundColor:"#94C8EC",}} type="text" placeholder="Email" aria-label="default input example"></input>

          

          </div>
        </div>
       
      </div>

      <div className="btn btn-md mt-3 text-white" onClick={()=>Upload(org)} style={{backgroundColor:"#2A628F",borderRadius:"30px",width:"15%",fontSize:"1.5rem", boxShadow: "0px 2px 2px black"}}>Upload</div>
      <p className="id docstatus py-2" id="docstatus" style={{fontWeight:"bolder",color:"red", fontSize:"1.5rem"}}>{docstatus}</p>


      <div className="files py-5 text-start d-flex justify-content-start">
        <p className="prev uploads px-5 py-3 text-start text-white align-self-start" style={{fontSize:"2.5rem"}}>Your previous uploads:</p>
      </div>

      <div className="filelist d-flex flex-wrap flex-row align-items-center justify-content-around py-3">  

      {pdf.map((element)=>(
            <Card hash={element.hash} href={element.pdflink} name={element.filename} email={element.stud_email} style={{backgroundColor:"#2A628F", width:"20%",height:"20%",borderRadius:"10px",boxShadow:"4px 3px 4px"}}/>

        ))}


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
          <section className="main position-absolute" style={{backgroundColor:"#16324F",width:"100%", height:"100vh", overflowY:"scroll"}}>
          <nav className="navbar navbar-dark"style={{backgroundColor:"#16324F"}}>
            <div className="container-fluid justify-content-center position-relative">
            <div className="btn position-absolute signin text-white" onClick={Home} style={{borderRadius:"30px",fontSize:"1.5rem",left:"3%"}}>Home</div>
              <a className="navbar-brand" href="#"><p className="head" style={{fontWeight:"bolder",fontSize:"2.0rem",borderBottom:"solid",borderColor:"#3E92CC",borderWidth:"thick"}}>Sign in as Org</p></a>
              <div className="btn position-absolute signin text-white" onClick={Navigate} style={{borderRadius:"30px",fontSize:"1.5rem",right:"3%"}}>Sign up</div>
            </div>
          </nav>
    
         
          <div className="how position-relative d-md-flex flex-md-row flex-md-wrap justify-content-md-around my-5 py-5"style={{alignContent:"center"}}>
         
           
  
            <div className="outer  p-2" style={{backgroundColor:"#16324F",width:"40%",maxHeight:"40%",borderRadius:"20px", borderStyle:"solid",borderColor:"white",borderWidth:"medium"}}>
               <div className="inner position-relative d-flex d-flex-column justify-content-center pt-3 pb-3 align-items-center d-flex" style={{backgroundColor:"white",width:"100%",height:"100%",borderRadius:"20px"}}>
              
               <div className="id position-relative px-3" style={{width:"60%"}}>
                  <p className="id" style={{fontWeight:"bolder", fontSize:"2.0rem"}}>Email Id:</p>
                  <input className="form-control px-2 py-3 " id="email" style={{width:"100%"}} type="text" placeholder="Email Id" aria-label="default input example"></input>
                  <p className="id" style={{fontWeight:"bolder", fontSize:"2.0rem"}}>Password:</p>
                  <input className="form-control px-2 py-3 " id="password" style={{width:"100%"}} type="password" placeholder="Password" aria-label="default input example"></input>
  
                  <div className="btn btn-md signin mt-3 text-white" onClick={Login} style={{borderRadius:"30px",fontSize:"1.5rem"}}>Sign In</div>
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
}

else{
  if(org){
  
  return (
    <section className="main" style={{backgroundColor:"#16324F", height:"100%"}}>
    <div className="sidebar position-absolute" id="sidebar" style={{backgroundColor:"#2A628F",borderRadius:"10px",zIndex:"100", visibility:"hidden",right:"0%",height:"100vh",width:"40%"}}>
       <div className="btn btn-close position-absolute text-white" onClick={Toggle} style={{left:"3%",top:"1%", backgroundColor:"#3E92CC"}}></div>
       <div className="btn position-absolute text-white" onClick={Home} style={{left:"15%",top:"8%", backgroundColor:"#3E92CC",width:"70%"}}>Home</div>
       <div className="btn position-absolute text-white" onClick={Signout} style={{left:"15%",top:"14%", backgroundColor:"#3E92CC",width:"70%"}}>Logout</div>

            </div>
      <nav className="navbar navbar-dark"style={{backgroundColor:"#16324F"}}>
        <div className="container-fluid justify-content-center position-relative">
          <a className="navbar-brand" href="#"><p className="head" style={{fontWeight:"bolder",fontSize:"2.0rem",borderBottom:"solid",borderColor:"#3E92CC",borderWidth:"thick"}}>Organisation</p></a>
          <div className="btn position-absolute" onClick={Toggle} style={{right:"3%",top:"10%"}}><span class="navbar-toggler-icon"></span></div>
        </div>
      </nav>

     
      <div className="how position-relative d-flex flex-colunm justify-content-center align-items-center my-5 py-5"style={{alignContent:"center"}}>
     
       
       

     
        <div className="details py-2 " style={{maxWidth:"80%"}}>
          <p className="work text-white text-wrap" style={{fontSize:"1.5rem"}}>
          Handling certificates after any event can be a real headache, and we make it a piece of cake.
You have to upload the certificate below and add the email id linked with the certificate. The certificates will show up in their account whenever the user logs in using the same email id. This provides you with a hassle-free way of distributing certificates provides you with a token of authenticity, and ensures that no one can forfeit your certificates.
          </p>
        </div>

       

     
       

      </div>

      <div className="buttons position-relative wrap d-flex flex-column justify-content-center align-items-center my-2 py-2">
        <div className="inner position-relative pt-3  pb-3 align-items-center d-flex" style={{maxWidth:"100%",maxHeight:"100%",borderRadius:"20px"}}>
          <img src={Uploads} className="position-relative p-0" alt="" style={{height:"30%",width:"30%"}} />
          <div className="id position-relative px-2">
            <p className="id text-white" style={{fontWeight:"bolder", fontSize:"1.7rem"}}>File link:</p>
            <input class="form-control px-3 py-2 " id="pdflink" style={{width:"100%", backgroundColor:"#94C8EC"}} type="text" placeholder="File Link" aria-label="default input example"></input>

          

          </div>
        </div>
        <div className="inner position-relative pt-3 my-5  pb-3 align-items-center d-flex" style={{maxWidth:"100%",maxHeight:"100%",borderRadius:"20px"}}>
          <img src={Mail} className="position-relative p-0" alt="" style={{height:"30%",width:"30%"}} />
          <div className="id position-relative px-2">
            <p className="id text-white text-nowrap" style={{fontWeight:"bolder", fontSize:"1.7rem"}}>File Name:</p>
            <input className="form-control px-3 py-2" id="filename" style={{width:"100%",backgroundColor:"#94C8EC",}} type="text" placeholder="File name" aria-label="default input example"></input>

          

          </div>
        </div>
        <div className="inner position-relative pt-3 my-2  pb-3 align-items-center d-flex" style={{maxWidth:"100%",maxHeight:"100%",borderRadius:"20px"}}>
          <img src={Mail} className="position-relative p-0" alt="" style={{height:"30%",width:"30%"}} />
          <div className="id position-relative px-2">
            <p className="id text-white text-nowrap" style={{fontWeight:"bolder", fontSize:"1.7rem"}}>Linked Email:</p>
            <input className="form-control px-3 py-2 " id="stud_email" style={{width:"100%",backgroundColor:"#94C8EC",}} type="text" placeholder="Email" aria-label="default input example"></input>

          

          </div>
        </div>
       
      </div>

      <div className="btn btn-md mt-3 text-white" onClick={()=>Upload(org)} style={{backgroundColor:"#2A628F",borderRadius:"30px",width:"30%",fontSize:"1.3rem", boxShadow: "0px 2px 2px black"}}>Upload</div>


      <div className="files py-5 text-start d-flex justify-content-start">
        <p className="prev uploads px-5 py-3 text-start text-white align-self-start" style={{fontSize:"2.5rem"}}>Your previous uploads:</p>
      </div>

      <div className="filelist d-flex flex-wrap position-relative flex-column align-items-center justify-content-around py-3">  

      {pdf.map((element)=>(
        
       
        <Card hash={element.hash} href={element.pdflink} email={element.stud_email} name={element.filename} style={{backgroundColor:"#2A628F", width:"50%",height:"50%",borderRadius:"10px",boxShadow:"4px 3px 4px"}} />

           

        ))}


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
          <section className="main" style={{backgroundColor:"#16324F", height:"100vh",width:"100%",overflowY:"scroll"}}>
           <div className="sidebar position-absolute" id="sidebar" style={{backgroundColor:"#2A628F",borderRadius:"10px",zIndex:"100", visibility:"hidden",right:"0%",height:"100vh",width:"40%"}}>
       <div className="btn btn-close position-absolute text-white" onClick={Toggle} style={{left:"3%",top:"1%", backgroundColor:"#3E92CC"}}></div>
       <div className="btn position-absolute text-white" onClick={Home} style={{left:"15%",top:"8%", backgroundColor:"#3E92CC",width:"70%"}}>Home</div>
       <div className="btn position-absolute text-white" onClick={Navigate} style={{left:"15%",top:"14%", backgroundColor:"#3E92CC",width:"70%"}}>Sign Up</div>

            </div>
          <nav className="navbar navbar-dark"style={{backgroundColor:"#16324F"}}>
            <div className="container-fluid justify-content-center position-relative">
              <a className="navbar-brand" href="#"><p className="head" style={{fontWeight:"bolder",fontSize:"2.0rem",borderBottom:"solid",borderColor:"#3E92CC",borderWidth:"thick"}}>Sign in as Org</p></a>
              <div className="btn position-absolute" onClick={Toggle} style={{right:"3%",top:"10%"}}><span class="navbar-toggler-icon"></span></div>
            </div>
          </nav>
    
         
          <div className="how position-relative d-flex flex-colunm justify-content-center align-items-center my-5 py-5"style={{alignContent:"center"}}>
  
          <div className="outer p-2" style={{backgroundColor:"#16324F",maxWidth:"70%",maxHeight:"20%",borderRadius:"20px", borderStyle:"solid",borderColor:"white",borderWidth:"medium"}}>
          <div className="inner position-relative flex-column pb-3 pt-3 align-items-center d-flex" style={{backgroundColor:"white",maxWidth:"100%",maxHeight:"100%",borderRadius:"20px"}}>
            
            <div className="id position-relative px-3">
              <p className="id" style={{fontWeight:"bolder", fontSize:"2.0rem"}}>Email Id:</p>
              <input className="form-control px-2 py-3 " id="email" style={{width:"100%"}} type="text" placeholder="Email Id" aria-label="default input example"></input>
              <p className="id" style={{fontWeight:"bolder", fontSize:"2.0rem"}}>Password:</p>
              <input className="form-control px-2 py-3 " id="password" style={{width:"100%"}} type="password" placeholder="Password" aria-label="default input example"></input>
             
  
             <div className="btn btn-md signin mt-3 text-white" onClick={Login} style={{borderRadius:"30px",fontSize:"1.5rem"}}>Sign in</div>
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
};

};
const Card=(props)=>{
  
  const {name,href,hash,email}=props;
 
  const [show,setShow]=useState(true);

  const Show=()=>{
    setShow(!show);
    if(show==true)
    {
      document.getElementById(hash).style.fontSize="1.0rem";
    }
    else{
      document.getElementById(hash).style.fontSize="0.0rem";
    }

  }
return(

  <div className="filecard p-3 mx-2 my-3 text-wrap position-relative d-flex flex-column justify-content-center align-items-center" style={props.style}>
  
  <a href={href} className="pdfname text-white" target="_blank" style={{fontSize:"1.7rem",textDecoration:"none",fontWeight:"bolder"}}>
  <img src={File} className="position-relative p-0" alt="" style={{height:"50%",width:"50%"}} /> <br/>
  {name}</a>
  <p className="pdfname text-white" style={{fontSize:"1.3rem"}}>{email}</p>
      <div className="btn show signin text-white" onClick={Show} style={{borderRadius:"30px",fontSize:"1.0rem",backgroundColor:"black"}}>Show code</div>
      <p className="pdfname hashcode text-white text-break py-2" name="hashcode" id={hash} style={{fontSize:"0.0rem" ,visibility:"visible",transition:"0.5s"}}>{hash}</p>


   
 </div>
);
}



// const Card=(props)=>{
//   return(

//     <div className="filecard p-3 mx-2 my-3 position-relative d-flex flex-column justify-content-center align-items-center" style={props.style}>
//     <img src={Mail} className="position-relative p-0" alt="" style={{height:"40%",width:"40%"}} />
//     <p className="pdfname text-white" style={{fontSize:"1.7rem"}}>LOREM IPSUM</p>
//     <p className="pdfname text-white" style={{fontSize:"1.3rem"}}>Org name</p>

     
//    </div>
//   );
// }

export default Orgpage;