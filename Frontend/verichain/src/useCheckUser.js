import axios from "axios"
import { useEffect, useState } from "react"



export const useCheckUser=()=>{

    const [user,setUser]=useState(null);
    useEffect(()=>{
        const checkUser=async()=>{
            axios.get("/users").then((res)=>{
                setUser(res.data.currentuser);

            }).catch(err=>{
                console.log("error occured " +err);
            });
        }
        checkUser();
    },[]);

    return {
        user,
        setUser
    }
    
}


