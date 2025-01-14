import { Route } from "react-router-dom";
import {React, useState,  useEffect} from "react";
import { useParams } from "react-router-dom";
import Projfull from "./openProject";
import Axios from "axios";
import { useContext } from "react";
import { adressContext } from "../Routing";
import { Navigate, Outlet, useLocation, useNavigate} from  'react-router-dom';
import Wait from "./waitPage";
export default function CheckOpenProject(props){
   const [isloading,setLoading]=useState(true)
   const navigate=useNavigate();
   const adress=useContext(adressContext)

   const [reload, setReload]=useState(true);
   let {projecttoOpen}  = useParams();
const handlereload=()=>{
    setReload(!reload)
}
   const[Project, SetProject]=useState({})
   function  LoadProject(project){
    var data= adress+"/php_rest_api/APIS/workersinfo.php?task=projectData&Project="+project
    Axios.get(data,  {headers:{Authorization: props.user.tempToken+":"+props.user.userId }}).then(
        function (response) {
        if(response.data!='no'){
            const temp={
                project:response.data.project,
                creatorCheck: response.data.creatorCheck , 
                objects: response.data.objects,
                workers: response.data.workers,
                user: props.user
            }
            SetProject(temp)
            console.log(temp)
        }
            else{
                alert('wystąpił błąd przy pobieraniu danych1')
                console.log(response)
                navigate('/loged')
            }
        }).catch(function (error) {
            alert('wystąpił błąd przy pobieraniu danych')
            console.log(error)
            navigate('/loged')
                })
               }
useEffect(()=>{
    if(props.user.isAuthenticated){
        const fields = projecttoOpen.split('$');
            if(/^\d+$/.test(fields[0])&&fields[1]=="saved"){
             LoadProject(fields[0]);  
            }else if(fields[0].length>0&&fields[1]=="unsaved"){
            SetProject({
                project: {
                    ID_PROJECTS: null,
                    EX_NAME: fields[0],
                    ID_PICTURE: 0,
                    LINK: "",
                    ALT: "",
                    PICTURE_NOTE: "",
                    Owner: "",
                    ID_DESC: 0,
                    LNG1: "",
                    LNG2: "",
                     LNG3: "",
                      },
                creatorCheck: true,
                objects: [],
                workers: [] 
        })

            }else{
                alert('wystąpił błąd przy pobieraniu danych')
                navigate('/loged')

            }
        
    }
},[projecttoOpen, reload]);
useEffect(()=>{
    if('workers' in Project)     setLoading(false);   


},[Project])
const location = useLocation();
  const del=(id,type)=>{
let data={
    "user":props.user.userId,
    "token":props.user.tempToken,
    "task":"delete_item_or_project",
    "id":id,
    "type":type

}
Axios.delete(adress+'/php_rest_api/APIS/workersRemove.php', {data}).then(
    function (response) {
        if(response.data=="done"){
            handlereload();
        }else{
            alert("nie udało się usunąć obiektu z projektu")
        }
    }
).catch(
    (function (error) {
        alert('nie udało się usunąć obiektu z projektu')
            }) 
)
  }
const delUser=(id)=>{
    let data={
        "user":props.user.userId,
        "token":props.user.tempToken,
        "task":"deleteWorker",
        "project":Project.project.ID_PROJECTS,
        "idu":id
    }
    Axios.delete(adress+'/php_rest_api/APIS/workersRemove.php', {data}).then(
        function (response) {
            if(response.data=="done"){
                handlereload();
            }else{
                alert("nie udało się usunąć użytkownika z projektu")
            }
        }
    ).catch(
        (function (error) {
            alert('nie udało się usunąć użytkownika z projektu')
           
                }) 
    )
    
  }
    return(
        <>
{props.user.isAuthenticated? isloading? <Wait/>:<Projfull del={del} delUser={delUser} reloader={handlereload} project={Project} user={props.user} />:<Navigate to="/" replace  state={{from: location}}/> }
</>
    )
}