import { Route } from "react-router-dom";
import {React, useState,  useEffect} from "react";
import ChosePage from "./chosePage";
import { Navigate, Outlet, useNavigate, useLocation} from  'react-router-dom';
import Wait from "../waitPage";
export default function CheckLoginChose(props){
   const [isloading,setLoading]=useState(true)
   const navigate = useNavigate();

useEffect(()=>{
    setTimeout(() => {
        if(props.user.isAuthenticated){
        setLoading(false);
        }else{
            navigate("/");
        }
      }, 1000);

},[]
)
const location = useLocation();
  

    return(
        <>
{props.user.isAuthenticated? isloading? <Wait/>:<ChosePage user={props.user}/>:<Navigate to="/" replace  state={{from: location}}/> }
</>
    )
}