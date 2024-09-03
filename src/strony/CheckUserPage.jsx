import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import { useParams, Route, useNavigate } from 'react-router-dom';
import Wait from "./waitPage";
import { adressContext } from "../Routing";
import UserPage from "./userPage";
export default function UserLoader(props){
    const [state, setState]=useState({data:[],lodader:true})
    let {ObjecNumber}  = useParams();
    const navigate=useNavigate();
    const adress=useContext(adressContext)

    function  LoadElement(){
     var datat=  adress+'/php_rest_api/APIS/GuestIo.php?Object='+ObjecNumber
        Axios.get(datat).then(
            function (response) {
    
            if(response.data!='no'){

                let temp=response.data[0];
           
                setState((prevState)=>({
                    data:response.data[0],
                lodader:false})) 
              
         
              
          
            }
                else{
                    alert('wystąpił błąd przy pobieraniu danych1')
                    navigate('/404')
                }
            }).catch(function (error) {
                alert(error)
                navigate('/404')
                    })
                   }
    useEffect(()=>{
        document.title=ObjecNumber
        let regex = /\D/;
        let check = regex.test(ObjecNumber);
if(check){
alert("błąd w podanym adresie")
navigate('/404')

}else{
    setTimeout(() => {
    LoadElement(ObjecNumber)},500)
}

    },[])
return(
    <>
 {state.lodader?<Wait/>:<UserPage data={state.data}/>}
 </>
)
}