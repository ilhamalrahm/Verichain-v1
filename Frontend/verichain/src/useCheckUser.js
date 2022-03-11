import axios from "axios"
import { useEffect, useState } from "react"



export const useCheckUser=()=>{

    const [user,setUser]=useState({});
    useEffect(()=>{
        const checkUser=async()=>{
            axios.get("/users_stud").then((res)=>{
                console.log(res.data.currentuser);
                console.log("usecheck")
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


