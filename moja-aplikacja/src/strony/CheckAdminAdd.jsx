import { Route, useNavigate } from "react-router-dom";
import {React, useState,  useEffect} from "react";
import { useParams } from "react-router-dom";

import { Navigate, Outlet, useLocation} from  'react-router-dom';
import Wait from "./waitPage";
import ChangeData from "./editUserPage";
export default function CheckAdminAddUsers(props){
   const [isloading,setLoading]=useState(true)
  const data={
    id: null ,
       nam:"",
       surname: "" , 
       userNam: "",
       password: "password",
       isAdmin: false
}
useEffect(()=>{
        setTimeout(() => {   
                 
            setLoading(false)   
          }, 2000);
    
},[]
)
const location = useLocation();
  

    return(
        <>
{props.user.isAuthenticated&&props.user.isadmin? isloading? <Wait/>:<ChangeData userdata={data} doesCreate={true} user={props.user}/>:<Navigate to="/" replace  state={{from: location}}/> }
</>
    )
}