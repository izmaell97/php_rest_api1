import { Route } from "react-router-dom";
import {React, useState,  useEffect} from "react";
import { useParams } from "react-router-dom";
import ChangeData from "./editUserPage";
import Axios from "axios";
import { adressContext } from "../Routing";
import { Navigate, Outlet, useLocation, useNavigate} from  'react-router-dom';
import Wait from "./waitPage";
import { useContext } from "react";
export default function CheckEditData(props){
   const [isloading,setLoading]=useState(true)
   const navigate=useNavigate();
   const[DataForUser, SetData]=useState({
     id: props.user.userId ,
        nam:"",
        surname: "" , 
        userNam: props.user.user,
        password: "password",
        isAdmin: false
})
const adress=useContext(adressContext)

   function  LoadUser(login){
    var data= adress+"/php_rest_api/APIS/workersinfo.php?task=infoupdate"
    Axios.get(data,  {headers:{Authorization: props.user.tempToken+":"+props.user.userId }}).then(
        function (response) {
console.log(response)
        if(response.data!='no'){
            const temp={
                id: props.user.userId ,
                nam: response.data.Name,
                surname: response.data.Surname  , 
                userNam: response.data.login,
                password: "password",
                isAdmin: !Boolean(response.data.privilege)
            }
            SetData(temp)
            setLoading(false);
        }
            else{
                alert('wystąpił błąd przy pobieraniu danych')
                navigate('/loged')
            }
        }).catch(function (error) {
            alert('wystąpił błąd przy pobieraniu danych')
            navigate('/loged')
                })
               }
useEffect(()=>{
    if(props.user.isAuthenticated){
        setTimeout(() => {
            LoadUser(props.user.userId)
          }, 2000);
    }
},[]
)
const location = useLocation();
  

    return(
        <>
{props.user.isAuthenticated? isloading? <Wait/>:<ChangeData userdata={DataForUser} user={props.user} doesCreate={false}/>:<Navigate to="/" replace  state={{from: location}}/> }
</>
    )
}