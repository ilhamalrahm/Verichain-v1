import axios from "axios"
import { useEffect, useState } from "react"



export const useCheckOrg=()=>{

    const [org,setOrg]=useState({});
    useEffect(()=>{
        const checkUser=async()=>{
            axios.get("/users_org").then((res)=>{
                setOrg(res.data.currentuser);

            }).catch(err=>{
                console.log("error occured " +err);
            });
        }
        checkUser();
    },[]);

    return {
        org,
        setOrg
    }
    
}