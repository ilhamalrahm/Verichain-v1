import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { useContext } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import axios from 'axios';
import Mail from "./Images/Mail.svg"
import Upload from "./Images/Upload.svg";
import File from "./Images/File.svg";



const Userpage =()=> {

    const {user,setUser}=useContext(UserContext);
    const navigate=useNavigate();
    const [tog,setTog]=useState(false);
    const [message,setMessage]=useState("");

    const vari=user;
    


    const setUserContext=()=>{
        axios.get("/api/users_stud").then((res)=>{
            setUser(res.data.currentuser);
            console.log("current user set");
            
        });
    }
    const Navigate=()=>{
        navigate("/signup_stud");
    }
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

    const Login=async()=>{
        const emails=document.getElementById("email").value;
        const passwords=document.getElementById("password").value
        console.log(emails +" "+ passwords+ "  see");
        console.log("where is login")
        

        axios.post("/api/auth/signin_stud",{
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
        axios.get("/api/auth/signout").then(async(res)=>{
            setMessage(res.data.data);
            await setUserContext();
            
        })
    }
   

    useEffect(()=>{
        console.log("useffect runningpp");
        console.log(user);
        
        try{
            axios.post("/api/pdf_stud",{
                owner:user.email
            }).then((res)=>{
                setPdf(res.data);
            }).catch((err)=>{
                console.log("error occured in useffect");
                console.log(err);
                
            })

        }catch(e)
        {
            console.log("unable to fetch" +e)
        }
            
        }
        
    ,[user]);

    
    const isDesktopOrLaptop = useMediaQuery({
      query: '(min-width: 768px)'
    });
    console.log(pdf);

  if(isDesktopOrLaptop)
  {
      if(user){
  
    return (
      <section className="main" style={{backgroundColor:"#16324F", height:"100%"}}>
        <nav className="navbar navbar-dark"style={{backgroundColor:"#16324F"}}>
          <div className="container-fluid justify-content-center position-relative">
          <div className="btn position-absolute signin text-white" onClick={Home} style={{borderRadius:"30px",fontSize:"1.5rem",left:"3%"}}>Home</div>
            <a className="navbar-brand" href="#"><p className="head" style={{fontWeight:"bolder",fontSize:"2.0rem",borderBottom:"solid",borderColor:"#3E92CC",borderWidth:"thick"}}>Student</p></a>
            <div className="btn position-absolute signin text-white" onClick={Signout} style={{borderRadius:"30px",fontSize:"1.5rem",right:"3%"}}>Logout</div>
          </div>
        </nav>
  
       
        <div className="how position-relative d-md-flex flex-md-row flex-md-wrap justify-content-md-around my-5 py-5"style={{alignContent:"center"}}>
       
         
         
  
       
          <div className="details py-2 " style={{maxWidth:"60%"}}>
            <p className="work text-white text-wrap" style={{fontSize:"1.9rem"}}>
            Verichain acts as a  safe keeper of all of your certificates. As soon as the organization uploads your certificate, they are added here. You can find all of your certificates listed below! Just click on them to download them.
            </p>
          </div>
  
         
  
       
         
  
        </div>
  
       
  
  
        <div className="files py-5 text-start d-flex justify-content-start">
          <p className="prev uploads px-5 py-3 text-start text-white align-self-start" style={{fontSize:"2.2rem"}}>Files linked to <b className="bold">{user.name}'s </b> Learner Id:</p>
        </div>
  
        <div className="filelist d-flex flex-wrap flex-row align-items-center justify-content-around py-3">  
  
    
         {pdf.map((element)=>(

            <Card href={element.pdflink} name={element.filename} org={element.org_email} hash={element.hash} style={{backgroundColor:"#2A628F", width:"20%",height:"20%",borderRadius:"10px",boxShadow:"4px 3px 4px"}}/>


        ))}
        
  
  
  
  
        </div>
  
       
  
    
  
  
  
      </section>
      
     
    );
         }
         else{
             return(
               
        <section className="main position-absolute" style={{backgroundColor:"#16324F",width:"100%", height:"100vh", overflowY:"scroll"}}>
        <nav className="navbar navbar-dark"style={{backgroundColor:"#16324F"}}>
          <div className="container-fluid justify-content-center position-relative">
          <div className="btn position-absolute signin text-white" onClick={Home} style={{borderRadius:"30px",fontSize:"1.5rem",left:"3%"}}>Home</div>
            <a className="navbar-brand" href="#"><p className="head" style={{fontWeight:"bolder",fontSize:"2.0rem",borderBottom:"solid",borderColor:"#3E92CC",borderWidth:"thick"}}>Sign in as Student</p></a>
            <div className="btn position-absolute signin text-white" onClick={Navigate} style={{borderRadius:"30px",fontSize:"1.5rem",right:"3%"}}>Sign Up</div>
          </div>
        </nav>
  
       
        <div className="how position-relative d-md-flex flex-md-row flex-md-wrap justify-content-md-around my-5 py-5"style={{alignContent:"center"}}>
       
         

          <div className="outer  p-2" style={{backgroundColor:"#16324F",width:"40%",maxHeight:"40%",borderRadius:"20px", borderStyle:"solid",borderColor:"white",borderWidth:"medium"}}>
             <div className="inner position-relative d-flex d-flex-column justify-content-center pt-3 pb-3 align-items-center d-flex" style={{backgroundColor:"white",width:"100%",height:"100%",borderRadius:"20px"}}>
            
             <div className="id position-relative px-3" style={{width:"60%"}}>
                <p className="id" style={{fontWeight:"bolder", fontSize:"2.0rem"}}>Email Id:</p>
                <input className="form-control px-2 py-3 " id="email" style={{width:"100%"}} type="text" placeholder="Email ID" aria-label="default input example"></input>
                <p className="id" style={{fontWeight:"bolder", fontSize:"2.0rem"}}>Password:</p>
                <input className="form-control px-2 py-3 " id="password" style={{width:"100%"}} type="password" placeholder="Password" aria-label="default input example"></input>

                <div className="btn signin btn-md mt-3 text-white" onClick={Login} style={{borderRadius:"30px",fontSize:"1.5rem"}}>Sign In</div>
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
      if(user){

      
    return (
      <section className="main" id="main" style={{backgroundColor:"#16324F", height:"100vh",width:"100%",overflowY:"scroll"}}>
       <div className="sidebar position-absolute" id="sidebar" style={{backgroundColor:"#2A628F",borderRadius:"10px",zIndex:"100", visibility:"hidden",right:"0%",height:"100vh",width:"40%"}}>
       <div className="btn btn-close position-absolute text-white" onClick={Toggle} style={{left:"3%",top:"1%", backgroundColor:"#3E92CC"}}></div>
       <div className="btn position-absolute text-white" onClick={Home} style={{left:"15%",top:"8%", backgroundColor:"#3E92CC",width:"70%"}}>Home</div>
       <div className="btn position-absolute text-white" onClick={Signout} style={{left:"15%",top:"14%", backgroundColor:"#3E92CC",width:"70%"}}>Logout</div>

            </div>
        <nav className="navbar navbar-dark"style={{backgroundColor:"#16324F"}}>
          <div className="container-fluid justify-content-center position-relative">
            <a className="navbar-brand" href="#"><p className="head" style={{fontWeight:"bolder",fontSize:"1.5rem",borderBottom:"solid",borderColor:"#3E92CC",borderWidth:"thick"}}>Student</p></a>
            {/* <div className="btn position-absolute signin text-white" style={{borderRadius:"30px",height:"55%",width:"20%",fontSize:"1.2rem",right:"3%"}}><p className="text-white text-wrap" style={{fontSize:"1rem"}}>Logout</p></div> */}

            <div className="btn position-absolute" onClick={Toggle} style={{right:"3%",top:"10%"}}><span class="navbar-toggler-icon"></span></div>
           
    
          </div>
        </nav>
       
  
       
        <div className="how position-relative d-flex flex-colunm justify-content-center align-items-center my-5 py-5"style={{alignContent:"center"}}>
       
         
         
  
       
          <div className="details py-2 " style={{maxWidth:"80%"}}>
            <p className="work text-white text-wrap" style={{fontSize:"1.5rem",fontStyle:"oblique"}}>
            Verichain acts as a  safe keeper of all of your certificates. As soon as the organization uploads your certificate, they are added here. You can find all of your certificates listed below! Just click on them to download them.
            </p>
          </div>
  
         
  
       
         
  
        </div>
  
        
  
  
        <div className="files py-5 text-start d-flex justify-content-start">
          <p className="prev uploads px-5 py-3 text-start text-white align-self-start" style={{fontSize:"2.2rem"}}>Files linked to <b className="bold">{user.name}'s </b> Learner Id:</p>
        </div>
  
        <div className="filelist d-flex flex-wrap position-relative flex-column align-items-center justify-content-around py-3">  

        {pdf.map((element)=>(
            <Card href={element.pdflink} name={element.filename} org={element.org} ids={element._id} hash={element.hash}  style={{backgroundColor:"#2A628F", width:"50%",height:"50%",borderRadius:"10px",boxShadow:"4px 3px 4px"}}/>

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
            <a className="navbar-brand" href="#"><p className="head" style={{fontWeight:"bolder",fontSize:"2.0rem",borderBottom:"solid",borderColor:"#3E92CC",borderWidth:"thick"}}>Sign in as Student</p></a>
            <div className="btn position-absolute" onClick={Toggle} style={{right:"3%",top:"10%"}}><span class="navbar-toggler-icon"></span></div>
          </div>
        </nav>
  
       
        <div className="how position-relative d-flex flex-colunm justify-content-center align-items-center my-5 py-5"style={{alignContent:"center"}}>

        <div className="outer p-2" style={{backgroundColor:"#16324F",maxWidth:"70%",maxHeight:"20%",borderRadius:"20px", borderStyle:"solid",borderColor:"white",borderWidth:"medium"}}>
        <div className="inner position-relative flex-column pb-3 pt-3 align-items-center d-flex" style={{backgroundColor:"white",maxWidth:"100%",maxHeight:"100%",borderRadius:"20px"}}>
          
          <div className="id position-relative px-3">
            <p className="id" style={{fontWeight:"bolder", fontSize:"2.0rem"}}>Email Id:</p>
            <input className="form-control px-2 py-3 " id="email" style={{width:"100%"}} type="text" placeholder="Email ID" aria-label="default input example"></input>
            <p className="id" style={{fontWeight:"bolder", fontSize:"2.0rem"}}>Password:</p>
            <input className="form-control px-2 py-3 " id="password" style={{width:"100%"}} type="password" placeholder="Password" aria-label="default input example"></input>
            <div className="btn signin btn-md mt-3 text-white" onClick={Login} style={{borderRadius:"30px",fontSize:"1.5rem"}}>Sign in</div>
           


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
  };
  
  
  const Card=(props)=>{
      console.log(props);
      const {name,href,hash,org}=props;
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
  
      <div className="filecard p-3 mx-2 my-3 position-relative d-flex flex-column text-wrap justify-content-center align-items-center" style={props.style}>
     
      <a href={href} className="pdfname text-white" target="_blank" style={{fontSize:"1.7rem",textDecoration:"none",fontWeight:"bolder"}}>
      <img src={File} className="position-relative p-0" alt="" style={{height:"50%",width:"50%"}} /> <br/>
      {name}</a>
      <p className="pdfname text-white" style={{fontSize:"1.3rem"}}>{org}</p>
      <div className="btn show signin text-white" onClick={Show} style={{borderRadius:"30px",fontSize:"1.0rem",backgroundColor:"black"}}>Show code</div>
      <p className="pdfname hashcode text-white text-break py-2" name="hashcode" id={hash} style={{fontSize:"0.0rem" ,visibility:"visible",transition:"0.5s"}}>{hash}</p>
     
      

  
       
     </div>
    );
  }
  
  export default Userpage;

// const Userpage=()=>{
//     const {user,setUser}=useContext(UserContext);
//     const navigate=useNavigate();

//     const vari=user;
//     console.log(user);


//     const setUserContext=()=>{
//         axios.get("/users").then((res)=>{
//             setUser(res.data.currentuser);
//             console.log("current user set");
//             navigate("/signin");
//         });
//     }
    

//     const [pdf,setPdf]=useState([]);

//     const Signout=()=>{
//         axios.get("/auth/signout").then(async(res)=>{
//             await setUserContext();
//         })
//     }
   

//     useEffect(()=>{
//         console.log("useffect running");
       
//             axios.post("/pdf",{
//                 owner:vari
//             }).then((res)=>{
//                 console.log(res.data[0].url);
//                 setPdf(res.data);
//             }).catch((err)=>{
//                 console.log("error occured in useffect");
//                 console.log(err);
                
//             })
//         }
        
//     ,[user]);

//     if(user)
//     {
//     return(
//         {pdf.map((element)=>(

//             <PdfComponent href={element.url}/>


//         ))}

       

//     );
//     }

//     else{
//         return(
//             <section className="main position-absolute h-100 w-100" style={{ backgroundColor:"#2E2B2B"}}>
          
                
//             <div class="container position-relative" style={{backgroundColor:"#161212", minWidth:"100vw" ,minHeight:"10vh"}}>
//                 <b className="navname text-white position-relative py-2" style={{fontSize:"2rem",left:"0%"}}>VERICHAIN</b>
//             </div>

//             <div className="welcom py-3 position-relative">
//               <p className="welcom text-white" style={{fontSize:"3rem"}}>Private Route! Please Sign in!</p>  
//             </div>

            

           
        
    
// </section>

//         );
//     }
// }

const PdfComponent=(props)=>{
    return(

        <div className="pdfcontainer position-relative text-start py-2 my-3 px-2" style={{width:"60%",height:"10%",borderRadius:"20px",backgroundColor:"#676363"}}>
            <a href={props.href} className="pdftag text-start p-0 m-0" style={{color:"white", textDecoration:"none"}}> My first document</a>
        </div>

    );
}

// export default Userpage;