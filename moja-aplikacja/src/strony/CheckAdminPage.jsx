import { Route } from "react-router-dom";
import {React, useState,  useEffect} from "react";
import { useParams } from "react-router-dom";
import { Navigate,useNavigate, Outlet, useLocation} from  'react-router-dom';
import Wait from "./waitPage";
import AdminChosePage from "./AdminChosePage";
export default function CheckAdmin(props){
   const [isloading,setLoading]=useState(true)
   const navigate = useNavigate();

useEffect(()=>{
    
        setTimeout(() => {
            if(props.user.isadmin){
            setLoading(false);
            }else{
                setLoading(false);
                navigate("/Loged");

            }
          }, 1000);
    
},[]
)
const location = useLocation();
  

    return(
        <>
{props.user.isAuthenticated? isloading? <Wait/>:<AdminChosePage user={props.user}/>:<Navigate to="/" replace  state={{from: location}}/> }
</>
    )
}