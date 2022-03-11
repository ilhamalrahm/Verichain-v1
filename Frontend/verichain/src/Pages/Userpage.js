import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { useContext } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import axios from 'axios';
import Mail from "./Images/Mail.svg"
const Upload=require('./Images/Upload.svg')



const Userpage =()=> {

    const {user,setUser}=useContext(UserContext);
    const navigate=useNavigate();
    const [tog,setTog]=useState(false);

    const vari=user;
    


    const setUserContext=()=>{
        axios.get("/users_stud").then((res)=>{
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
        

        axios.post("/auth/signin_stud",{
            email:emails,
            password:passwords,
        }).then(async(res)=>{
            console.log(res);
           await setUserContext();
        });   
        
    }
    

    const [pdf,setPdf]=useState([]);

    const Signout=()=>{
        axios.get("/auth/signout").then(async(res)=>{
            await setUserContext();
        })
    }
   

    useEffect(()=>{
        console.log("useffect running");
        
        try{
            axios.post("/pdf_stud",{
                owner:user.email
            }).then((res)=>{
                setPdf(res.data);
            }).catch((err)=>{
                console.log("error occured in useffect");
                console.log(err);
                
            })

        }catch(e)
        {
            console.log("unable to fetch")
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
       
         
         
  
       
          <div className="details py-2 " style={{maxWidth:"80%"}}>
            <p className="work text-white text-wrap" style={{fontSize:"1.5rem"}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Faucibus facilisis feugiat quisque sagittis quis eget pharetra volutpat. Id ante erat sit velit rutrum. Erat scelerisque mi a ornare amet cras. Egestas pellentesque viverra sociis viverra interdum vitae quam sit elit. Tortor, pretium vitae etiam placerat ut volutpat pharetra ultricies. Augue nulla iaculis purus sit venenatis. Fusce vitae ut morbi volutpat neque lorem imperdiet.
            </p>
          </div>
  
         
  
       
         
  
        </div>
  
       
  
  
        <div className="files py-5 text-start d-flex justify-content-start">
          <p className="prev uploads px-5 py-3 text-start text-white align-self-start" style={{fontSize:"2.5rem"}}>Files linked to your Learner Id:</p>
        </div>
  
        <div className="filelist d-flex flex-wrap flex-row align-items-center justify-content-around py-3">  
  
    
         {pdf.map((element)=>(

            <Card href={element.pdflink} name={element.org} style={{backgroundColor:"#2A628F", width:"20%",height:"20%",borderRadius:"10px",boxShadow:"4px 3px 4px"}}/>


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
            <a className="navbar-brand" href="#"><p className="head" style={{fontWeight:"bolder",fontSize:"2.0rem",borderBottom:"solid",borderColor:"#3E92CC",borderWidth:"thick"}}>Signin</p></a>
            <div className="btn position-absolute signin text-white" onClick={Navigate} style={{borderRadius:"30px",fontSize:"1.5rem",right:"3%"}}>Sign Up</div>
          </div>
        </nav>
  
       
        <div className="how position-relative d-md-flex flex-md-row flex-md-wrap justify-content-md-around my-5 py-5"style={{alignContent:"center"}}>
       
         

          <div className="outer  p-2" style={{backgroundColor:"#16324F",width:"40%",maxHeight:"40%",borderRadius:"20px", borderStyle:"solid",borderColor:"white",borderWidth:"medium"}}>
             <div className="inner position-relative d-flex d-flex-column justify-content-center pt-3 pb-3 align-items-center d-flex" style={{backgroundColor:"white",width:"100%",height:"100%",borderRadius:"20px"}}>
            
             <div className="id position-relative px-3" style={{width:"60%"}}>
                <p className="id" style={{fontWeight:"bolder", fontSize:"2.0rem"}}>Email Id:</p>
                <input className="form-control px-2 py-3 " id="email" style={{width:"100%"}} type="text" placeholder="Unique ID" aria-label="default input example"></input>
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
            <p className="work text-white text-wrap" style={{fontSize:"1.5rem"}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Faucibus facilisis feugiat quisque sagittis quis eget pharetra volutpat. Id ante erat sit velit rutrum. Erat scelerisque mi a ornare amet cras. Egestas pellentesque viverra sociis viverra interdum vitae quam sit elit. Tortor, pretium vitae etiam placerat ut volutpat pharetra ultricies. Augue nulla iaculis purus sit venenatis. Fusce vitae ut morbi volutpat neque lorem imperdiet.
            </p>
          </div>
  
         
  
       
         
  
        </div>
  
        
  
  
        <div className="files py-5 text-start d-flex justify-content-start">
          <p className="prev uploads px-5 py-3 text-start text-white align-self-start" style={{fontSize:"2.5rem"}}>Files linked to your Learner Id:</p>
        </div>
  
        <div className="filelist d-flex flex-wrap position-relative flex-column align-items-center justify-content-around py-3">  

        {pdf.map((element)=>(
            <Card href={element.pdflink} name={element.org}  style={{backgroundColor:"#2A628F", width:"50%",height:"50%",borderRadius:"10px",boxShadow:"4px 3px 4px"}}/>

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
            <a className="navbar-brand" href="#"><p className="head" style={{fontWeight:"bolder",fontSize:"2.0rem",borderBottom:"solid",borderColor:"#3E92CC",borderWidth:"thick"}}>Sign in</p></a>
            <div className="btn position-absolute" onClick={Toggle} style={{right:"3%",top:"10%"}}><span class="navbar-toggler-icon"></span></div>
          </div>
        </nav>
  
       
        <div className="how position-relative d-flex flex-colunm justify-content-center align-items-center my-5 py-5"style={{alignContent:"center"}}>

        <div className="outer p-2" style={{backgroundColor:"#16324F",maxWidth:"70%",maxHeight:"20%",borderRadius:"20px", borderStyle:"solid",borderColor:"white",borderWidth:"medium"}}>
        <div className="inner position-relative flex-column pb-3 pt-3 align-items-center d-flex" style={{backgroundColor:"white",maxWidth:"100%",maxHeight:"100%",borderRadius:"20px"}}>
          
          <div className="id position-relative px-3">
            <p className="id" style={{fontWeight:"bolder", fontSize:"2.0rem"}}>Email Id:</p>
            <input className="form-control px-2 py-3 " id="email" style={{width:"100%"}} type="text" placeholder="Unique ID" aria-label="default input example"></input>
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
  }
  };
  
  
  const Card=(props)=>{
      console.log(props);
      const {name,href}=props;
      console.log(name);
    return(
  
      <div className="filecard p-3 mx-2 my-3 position-relative d-flex flex-column justify-content-center align-items-center" style={props.style}>
      <img src={Mail} className="position-relative p-0" alt="" style={{height:"40%",width:"40%"}} />
      <a href={href} className="pdfname text-white" style={{fontSize:"1.7rem",textDecoration:"none"}}>{name}</a>
      <p className="pdfname text-white" style={{fontSize:"1.3rem"}}>org name</p>
     
      

  
       
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