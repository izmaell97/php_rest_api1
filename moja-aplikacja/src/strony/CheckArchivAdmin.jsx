import { Route, useNavigate } from "react-router-dom";
import {React, useState,  useEffect, useContext} from "react";
import { useParams } from "react-router-dom";
import { Navigate, Outlet, useLocation} from  'react-router-dom';
import Wait from "./waitPage";
import { adressContext } from "../Routing";
import Axios from "axios";
import ArchivAdmin from "./archivAdmin";
export default function CheckAdminArchiv(props){
   const [isloading,setLoading]=useState(true)
   const navigate=useNavigate();
   const adress=useContext(adressContext);
   const[Desc, setDesc]=useState([])
   const [flip, setFlip]=useState(false)
   const refresher=()=>{
    setFlip(!flip);
   }
   function  DowloadDesc(){
    var data= adress+"/php_rest_api/APIS/AdminInfo.php?task=getDescryptions"
    Axios.get(data,  {headers:{Authorization: props.user.tempToken+":"+props.user.userId }}).then(
        function (response) {
console.log(response)
        if(response.data!="no"){
            
               setDesc(response.data)
                setLoading(false);
        }else{
            setLoading(false)
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


            DowloadDesc()
           
          }, 2000);
    }
},[]
)

const del=(id)=>{
    const data={
        "admlogin":props.user.userId,
        "token":props.user.tempToken,
        "id":id
    }
    Axios.delete(adress+'/php_rest_api/APIS/admindel.php', {data}).then(
        function (response) {
            console.log(response)
            if(response.data!="no"){
                DowloadDesc();
            }else{
                alert("nie udało się usunąć opisu")
            }
        }
    ).catch(
        (function (error) {
            alert('nie udało się usunąć opisu')
           
                }) 
    )

}
const location = useLocation();
  

    return(
        <>
{props.user.isAuthenticated? isloading? <Wait/>:<ArchivAdmin desc={Desc} del={del}/>:<Navigate to="/" replace  state={{from: location}}/> }
</>
    )
}