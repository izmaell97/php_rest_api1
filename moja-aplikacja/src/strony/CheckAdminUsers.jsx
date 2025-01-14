import { Route, useNavigate } from "react-router-dom";
import {React, useState,  useEffect, useContext} from "react";
import { useParams } from "react-router-dom";
import { adressContext } from "../Routing";
import { Navigate, Outlet, useLocation} from  'react-router-dom';
import Wait from "./waitPage";
import Axios from "axios";
import Reset from "./Odnowahasel";
export default function CheckAdminUsers(props){
   const [isloading,setLoading]=useState(true)
   const navigate=useNavigate();
   const [flicker,setFlicker]=useState(true)

   const[Users, setUsers]=useState([])
   const handler=()=> {
    setFlicker(!flicker)
   }
   const adress=useContext(adressContext)
   function  LoadUsers(){
    var data=adress+'/php_rest_api/APIS/AdminInfo.php?task=get_users'
    Axios.get(data, {headers:{Authorization: props.user.tempToken+":"+props.user.userId }}).then(
        function (response) {

        if(response.data!="no"){
            
               setUsers(response.data)
                setLoading(false);
        }else{
            console.log(response.data)
            
            setLoading(false)
            alert('wystąpił błąd przy pobieraniu danych')

            navigate('/loged')

        }
        }
    ).catch(function (error) {
alert('wystąpił błąd przy pobieraniu danych')
setLoading(false)

navigate('/loged')
    })
   }
useEffect(()=>{
    if(props.user.isAuthenticated &&props.user.isadmin){
        setTimeout(() => {


LoadUsers()
           
          }, 200);
    }
},[flicker]
)
const location = useLocation();
  

    return(
        <>
{props.user.isAuthenticated? isloading? <Wait/>:<Reset users={Users} flicker={handler} user={props.user}/>:<Navigate to="/" replace  state={{from: location}}/> }
</>
    )
}