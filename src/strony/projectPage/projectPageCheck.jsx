import { Route, useNavigate } from "react-router-dom";
import {React, useState,  useEffect} from "react";
import { useParams } from "react-router-dom";
import Project from "../project";
import { Navigate, Outlet, useLocation} from  'react-router-dom';
import Wait from "../waitPage";
import { useContext } from "react";
import { adressContext } from "../../Routing";
import Axios from "axios";
export default function ProjectPageCheck(props){
   const [isloading,setLoading]=useState(true)
   const navigate=useNavigate();
   const location = useLocation();
   const adres=useContext(adressContext);

   const[Projects, setProjects]=useState([])
   function  LoadProjects(){
    var data=adres+'/php_rest_api/APIS/workersinfo.php?task=getProjects'; 
    Axios.get(data, {headers:{Authorization: props.user.tempToken+":"+props.user.userId }} ).then(
        function (response) {
          console.log(response)  
        if(!(response.data==='no')){
            setLoading(false)
               setProjects(response.data)
        }else{
            setLoading(false)
            navigate('/loged')
        }
        }
    ).catch(function (error) {
alert('wystąpił błąd przy pobieraniu danych')
navigate('/loged')
    })
   }
useEffect(()=>{
    if(props.user.isAuthenticated){
        setTimeout(() => {


LoadProjects()
           
          }, 2000);
    }
},[]
)
  
function del(element){
let dataTemp={
    "user":props.user.userId,
    "token":props.user.tempToken,
    "task": "deleteProject",
    "project": element
}
Axios.put(adres+'/php_rest_api/APIS/workersChange.php', dataTemp).then(
    (function (response) {
        console.log(response)
   if(response.data=="worked"){
    LoadProjects();
   }else{
    alert('wystąpił błąd przy usuwaniu')

   }
        

       }
    )
) 
}
function refresh(element){
    let dataTemp={
        "user":props.user.userId,
        "token":props.user.tempToken,
        "task": "undelProject",
        "project": element
    }
    Axios.put(adres+'/php_rest_api/APIS/workersChange.php' , dataTemp).then(
        (function (response) {
            console.log(response)
       if(response.data=="worked"){
        LoadProjects();
       }else{
        alert('wystąpił błąd przy przywracaniu')
    
       }
            
    
           }
        )
    ) 
    }
    return(
        <>
{props.user.isAuthenticated? isloading? <Wait/>:<Project list={Projects} refresh={refresh} delete={del} user={props.user} />:<Navigate to="/" replace  state={{from: location}}/> }
</>
    )
}