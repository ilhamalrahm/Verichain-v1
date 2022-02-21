import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import axios from 'axios';


const Userpage=()=>{
    const {user,setUser}=useContext(UserContext);
    const navigate=useNavigate();

    const vari=user;
    console.log(user);


    const setUserContext=()=>{
        axios.get("/users").then((res)=>{
            setUser(res.data.currentuser);
            console.log("current user set");
            navigate("/signin");
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
       
            axios.post("/pdf",{
                owner:vari
            }).then((res)=>{
                console.log(res.data[0].url);
                setPdf(res.data);
            }).catch((err)=>{
                console.log("error occured in useffext");
                console.log(err);
                
            })
        }
        
    ,[user]);

    if(user)
    {
    return(

        <section className="main position-absolute h-100 w-100" style={{ backgroundColor:"#2E2B2B"}}>
          
                
                    <div class="container position-relative" style={{backgroundColor:"#161212", minWidth:"100vw" ,minHeight:"10vh"}}>
                        <b className="navname text-white position-relative py-2" style={{fontSize:"2rem",left:"0%"}}>VERICHAIN</b>
                    </div>

                    <div className="welcom py-3 position-relative">
                      <p className="welcom text-white" style={{fontSize:"3rem"}}>Welcome {user}</p> 
                      <div className="signout btn  position-absolute" style={{left:"92%",top:"25%",borderRadius:"20px",color:"white",backgroundColor:"black"}} onClick={Signout}>Signout</div> 
                    </div>

                    <div className="list position-relative w-100 px-0 mx-0">
                        <p className="list text-white" style={{fontSize:"1.5rem"}}>
                            List of Certificates :
                        </p>
                    </div>

                    <div className="container position-relative" style={{ backgroundColor:"#161212", width:"70%",height:"60%",borderRadius:"20px",overflowY:"scroll"}}>
                        {pdf.map((element)=>(

                            <PdfComponent href={element.url}/>


                        ))}
                    
                       
                   
                    

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
              <p className="welcom text-white" style={{fontSize:"3rem"}}>Private Route! Please Sign in!</p>  
            </div>

            

           
        
    
</section>

        );
    }
}

const PdfComponent=(props)=>{
    return(

        <div className="pdfcontainer position-relative text-start py-2 my-3 px-2" style={{width:"60%",height:"10%",borderRadius:"20px",backgroundColor:"#676363"}}>
            <a href={props.href} className="pdftag text-start p-0 m-0" style={{color:"white", textDecoration:"none"}}> My first document</a>
        </div>

    );
}

export default Userpage;