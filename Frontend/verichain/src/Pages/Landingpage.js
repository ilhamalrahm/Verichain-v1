import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Link,useNavigate,Redirect   } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';
import Mail from './Images/Mail.svg';
import Try from "./Images/Try.svg";
import File from "./Images/File.svg";
import Chain from "./Images/chain.svg";
import axios from "axios";



const Landing = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 840px)'
  });
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  const [tog,setTog]=useState(false);
  const [pdf,setPdf]=useState({});
 var card=null;


  let navigate = useNavigate(); 

  const fetchPdf=()=>{
    try{
    const hashes=document.getElementById("hash").value;
    
    
    console.log(hashes)
    axios.post("/api/upload/verify",{
      hash:hashes
    }).then((res)=>{
      console.log(res.data.success)
      if(res.data.success==true){
     const data=res.data.data;
     setPdf(data);
     document.getElementById("card").style.visibility="visible";

     console.log(pdf);
      }
      else{
      setPdf({pdflink:"",org:"Sorry, Document not found"})
      document.getElementById("card").style.visibility="visible";
      }
    })
  }
  catch(e)
  {
    console.log("error occured while fetching pdf")
    console.log(e);
  }
  }

  const Student = () =>{ 
    let path = `/user`; 
    navigate(path);
 
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

  let navigate1 = useNavigate();

  const Company = () =>{ 
    let path = `/company`; 
    navigate(path);
 
  }



if(isDesktopOrLaptop)
{

  return (
    <section className="main" style={{backgroundColor:"#16324F", height:"100%"}}>
      <nav className="navbar navbar-dark"style={{backgroundColor:"#16324F"}}>
        <div className="container-fluid justify-content-center position-relative">
          <a className="navbar-brand" href="#"><p className="head" style={{fontWeight:"bolder",fontSize:"2.0rem",borderBottom:"solid",borderColor:"#3E92CC",borderWidth:"thick"}}>Home</p></a>
        </div>
      </nav>


<div className="container position-relative pt-5" style={{marginBottom:"20%",marginTop:"5%"}}>
<b className="Head position-absolute text-white" style={{top:"0%",left:"20%"}}>Verichain</b>
</div>

     

     
      <div className="how position-relative d-md-flex flex-md-row flex-md-wrap justify-content-md-around my-5 py-5"style={{alignContent:"center"}}>
     
        <div className="work py-5 " style={{maxWidth:"20%"}}>
          <p className="work text-white text-wrap" style={{fontSize:"3.5rem", fontWeight:"bold",fontFamily:"Monaco"}}>
            How does it work?
          </p>
        </div>
       

     
        <div className="details py-5 " style={{maxWidth:"40%"}}>


        <b className="text-white" style={{fontSize:"2.5rem",fontFamily:"Monaco"}}>
         Welcome to Verichain! <br/>
         </b> <br/>

          <p className="work text-white text-start text-wrap" style={{fontSize:"1.5rem",fontFamily:"Monaco"}}>
        
         <ul className="list">

       <li className="listelem">A certificate storage and authentication portal.<br/></li>  


<li className="listelem">We aim to bring more value to all certificates issued!!</li>
<li className="listelem">
Sign -up as a Student to access all your certificates linked to your email!<br/>
</li>
<li className="listelem">Provide the unique id wherever needed to prove the authenticity of your certificates!<br/></li>
<li className="listelem">We only allow valid organizations to upload certificates.</li>


         </ul>






          </p>
        </div>

        

       

     
       

      </div>

      <div className="buttons position-relative wrap d-md-flex justify-content-around my-2 py-3">
        <div className="btn signup btn-md text-white" onClick={Company} style={{borderRadius:"15px",fontSize:"1.5rem"}}>Organisation</div>
        <div className="btn signin text-white" onClick={Student} style={{borderRadius:"15px",fontSize:"1.5rem"}}>Student</div>
      </div>

      <img src={Try} alt="" style={{width:"400px",height:"500px"}} />

      <div className="outer  p-2" style={{backgroundColor:"#16324F",maxWidth:"40%",maxHeight:"20%",marginLeft:"30%",borderRadius:"20px", borderStyle:"solid",borderColor:"white",borderWidth:"medium"}}>
        <div className="inner position-relative pt-3 pb-3 align-items-center d-flex" style={{backgroundColor:"white",maxWidth:"100%",maxHeight:"100%",borderRadius:"20px"}}>
          <img src={Chain} className="position-relative p-2" alt="" style={{height:"30%",width:"30%"}} />
          <div className="id position-relative px-5">
            <p className="id" style={{fontWeight:"bolder", fontSize:"2.0rem"}}>Unique Id:</p>
            <input className="form-control px-2 py-3 " id="hash" style={{width:"100%"}} type="text" placeholder="Unique ID" aria-label="default input example"></input>

           <div className="btn signin btn-md mt-3 text-white" onClick={fetchPdf} style={{borderRadius:"15px",fontSize:"1.5rem"}}>Search</div>

          </div>
        </div>
      </div>

      <div className="filelist d-flex flex-wrap position-relative flex-column my-5 align-items-center justify-content-around py-3">  


        
      <Card href={pdf.pdflink}  org={pdf.org} stud={pdf.stud_email} hash={pdf.hash} name={pdf.filename} style={{backgroundColor:"#2A628F",visibility:"hidden", width:"30%",height:"50%",borderRadius:"10px",boxShadow:"4px 3px 4px",visibility:"hidden"}}/>
        
        
  
  
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
    <section className="main" style={{backgroundColor:"#16324F", height:"100%",width:"100vw"}}>
    <div className="sidebar position-absolute" id="sidebar" style={{backgroundColor:"#2A628F",borderRadius:"10px",zIndex:"100", visibility:"hidden",right:"0%",height:"100vh",width:"40%"}}>
       <div className="btn btn-close position-absolute text-white" onClick={Toggle} style={{left:"3%",top:"1%", backgroundColor:"#3E92CC"}}></div>
       <div className="btn position-absolute text-white" onClick={Student} style={{left:"15%",top:"8%", backgroundColor:"#3E92CC",width:"80%"}}> <b className="student" style={{fontSize:"0.8rem"}}>Student</b></div>
       <div className="btn position-absolute text-white" onClick={Company} style={{left:"15%",top:"14%", backgroundColor:"#3E92CC",width:"80%"}}> <b className="org" style={{fontSize:"0.8rem"}}>Organisation</b></div>

            </div>
      <nav className="navbar navbar-dark d-flex flex-row"style={{backgroundColor:"#16324F"}}>
        <div className="container-fluid justify-content-center flex-row position-relative">
          <a className="navbar-brand" href="#"><p className="head m-0 p-0" style={{fontWeight:"bolder",fontSize:"1.5rem",borderBottom:"solid",borderColor:"#3E92CC",borderWidth:"thick"}}>Home</p></a>

          <div className="btn position-absolute" onClick={Toggle} style={{right:"3%",top:"10%"}}><span class="navbar-toggler-icon"></span></div>
         
          
        </div>

        
          

      
      </nav>

      <div className="container d-flex justify-content-center position-relative align-items-center" style={{marginBottom:"9%",marginTop:"19%"}}>
<b className="Head text-white" style={{fontSize:"2.4rem",top:"0%",left:"0%"}}>Verichain</b>
</div>

      <div className="container written d-flex flex-column justify-content-center align-items-center position-relative p-5">

        {/* <div className="work py-3  " style={{maxWidth:"90%"}}>
            <p className="work text-white text-wrap" style={{fontSize:"1.3rem", fontWeight:"bold"}}>
              How does it work?
            </p>
          </div> */}
        

      

          <div className="details py-2 " style={{maxWidth:"95%"}}>
          <b  className="text-white" style={{fontSize:"1.2rem"}}>
         Welcome to Verichain! <br/>
         </b> <br/>
            <p className="work text-white text-start text-wrap" style={{fontSize:"1.0rem"}}>
            {/* <b style={{fontSize:"1.9rem"}}>Welcome to Verichain!</b> <br/><br/> */}
          
            <ul className="list">

<li className="listelem">A certificate storage and authentication portal.<br/></li>  


<li className="listelem">We aim to bring more value to all certificates issued!!</li>
<li className="listelem">
Sign -up as a Student to access all your certificates linked to your email!<br/>
</li>
<li className="listelem">Provide the unique id wherever needed to prove the authenticity of your certificates!<br/></li>
<li className="listelem">We only allow valid organizations to upload certificates.</li>


  </ul>
            </p>
         </div>

         


      </div>

      <div className="container code d-flex flex-column justify-content-center align-items-center">
      <div className="outer p-2" style={{backgroundColor:"#16324F",maxWidth:"70%",maxHeight:"20%",borderRadius:"20px", borderStyle:"solid",borderColor:"white",borderWidth:"medium"}}>
        <div className="inner position-relative flex-column pb-3 pt-3 align-items-center d-flex" style={{backgroundColor:"white",maxWidth:"100%",maxHeight:"100%",borderRadius:"20px"}}>
          <img src={Chain} className="position-relative p-2" alt="" style={{height:"30%",width:"30%"}} />
          <div className="id position-relative px-3">
            <p className="id" style={{fontWeight:"bolder", fontSize:"1.4rem"}}>Unique Id:</p>
            <input className="form-control px-2 py-3 " style={{width:"100%"}} id="hash" type="text" placeholder="Unique ID" aria-label="default input example"></input>

           <div className="btn btn-md mt-3 text-white" onClick={fetchPdf} style={{backgroundColor:"#2A628F",borderRadius:"30px",fontSize:"1.5rem"}}>Search</div>

          </div>
        </div>
      </div>
      <div className="filelist d-flex flex-wrap position-relative flex-column my-5 align-items-center justify-content-around py-3">  


        
      <Card href={pdf.pdflink}  org={pdf.org} stud={pdf.stud_email} hash={pdf.hash} name={pdf.filename} style={{backgroundColor:"#2A628F",visibility:"hidden", width:"70%",height:"40%",borderRadius:"10px",boxShadow:"4px 3px 4px"}}/>
        
        
  
  
  
  
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

const Card=(props)=>{
  console.log(props);
  const {name,href,org,hash,stud}=props;
  console.log(name);
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

  
  <div className="filecard p-2 mx-2 my-3 position-relative d-flex flex-column text-wrap justify-content-center align-items-center" id="card" style={props.style}>
     
      <a href={href} className="pdfname text-white mx-5" target="_blank" style={{fontSize:"1.5rem",textDecoration:"none",fontWeight:"bolder"}}>
      <img src={File} className="position-relative p-0" alt="" style={{height:"50%",width:"50%"}} /> <br/>
      {name}</a>
      <p className="pdfname text-break text-white" style={{fontSize:"1.0rem"}}>{org}</p>
      <p className="pdfname text-break text-white" style={{fontSize:"1.0rem"}}>{stud}</p>
      <div className="btn show signin text-white" onClick={Show} style={{borderRadius:"30px",fontSize:"1.0rem",backgroundColor:"black"}}>Show code</div>
      <p className="pdfname hashcode text-white text-break py-2" name="hashcode" id={hash} style={{fontSize:"0.0rem" ,visibility:"visible",transition:"0.5s"}}>{hash}</p>
  
 
  


   
 </div>
);
}

export default Landing;
