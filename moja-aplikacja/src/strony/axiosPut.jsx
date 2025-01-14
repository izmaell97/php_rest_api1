import Axios from "axios";
import React from 'react';
import { Navigate, Outlet, useLocation, useNavigate} from  'react-router-dom';
import { PostPhoto } from "./axiosPost";
 export async function getAdres(){
    return new Promise((resolve, reject)=>{

    fetch(`${process.env.PUBLIC_URL}/config.json`).then(response => response.json())
    .then(data =>{
        resolve (data.apiUrl)}
    )
    .catch(error =>   reject(null));

 })
}
export async function passwordResset(user, ResetID, flicker){
const data={
    "admlogin": user.userId,
    "token":user.tempToken,
    "task":"reset_password",
    "login":ResetID
}
let adress

try{
     adress= await getAdres()
}catch(error){
    return
}

Axios.put(adress+"php_rest_api/APIS/adminChange.php",data).then(
    function (response) {
        if (response.data=="done") {
            flicker();
        }else{
            alert("nie powiódł się reset hasła")
    
        }
    
            }
        ).catch(function (error) {
            alert("nie powiódł się reset hasła")
    
         })  

}

export async function UpUser(user, ResetID, flicker){
    const data={
        "admlogin": user.userId,
        "token":user.tempToken,
        "task":"upg_user",
        "login":ResetID
    }
    let adress
    try{
         adress= await getAdres()
    }catch(error){
        return
    }
    
    Axios.put(adress+"/php_rest_api/APIS/adminChange.php",data).then(
        function (response) {
            if (response.data=="done") {
                flicker();
            }else{
                alert("zmiana nie powiodła się")
        
            }
        
                }
            ).catch(function (error) {
                alert("nie powiódł się reset hasła")
        
             })  
    
    }
    
export async function DwUser(user, ResetID, flicker){
    const data={
        "admlogin": user.userId,
        "token":user.tempToken,
        "task":"dwn_user",
        "login":ResetID
    }
    let address
    try{
         address= await getAdres()
    }catch(error){
        return
    }
    
    Axios.put(address+"/php_rest_api/APIS/adminChange.php",data).then(
        function (response) {
            if (response.data=="done") {
                flicker();
            }else{
                alert("zmiana nie powiodła się")
        
            }
        
                }
            ).catch(function (error) {
                alert("nie powiódł się reset hasła")
        
             })  
    
    }
    export async function updateObjectOrRoom(user, photo, project, desc, photoInfo, id, flicker, note, type, edit, refresher){
          let adress

            try{
                 adress= await  getAdres()
            }catch(error){
                return
            }       
        if(photo!=null){
          
 PostPhoto(user, photo).then((result) => {
        
const databasic={
    "user":user.userId,
    "token":user.tempToken,
    "task":"update_object_or_room",
    "edit":edit
}
let data=databasic
if(edit.title){
    let temp= {
        "TITLE":project, 
        "NOTE": note,
        "type":type,
        "ID":id
    }
data={
...databasic,
project:temp
}
}

if(edit.desc){
    data.desc=desc
}
if(edit.pic){
   data.pic=photoInfo 
}


Axios.put(adress+'/php_rest_api/APIS/workersChange.php', data).then(
    function (response) {
 
if (response.data=="done") {
    alert("element zapisany")
    refresher()
    flicker();
}else{
    console.log(response.data)
    alert("nie udało się przesłać projektu")

}

    }
).catch(function (error) {
    alert("nie udało się przesłać projektu")

 })  


}).catch(function (error) {
alert("nie udało się przesłać zdjęcia, sprawdź czy nie występuje  już w galerii")
})}else{

      
           
const databasic={
    "user":user.userId,
    "token":user.tempToken,
    "task":"update_object_or_room",
    "edit":edit
}
let data=databasic
if(edit.title){
    let temp= {
        "TITLE":project, 
        "NOTE": note,
        "type":type,
        "ID":id
    }
data={
...databasic,
project:temp
}

    }
    if(edit.desc){
        data.desc=desc
    }
    if(edit.pic){
       data.pic=photoInfo 
    }
    console.log(data)
    Axios.put(adress+'php_rest_api/APIS/workersChange.php', data).then(
        function (response) {
     
    if (response.data=="done") {
        alert("element zapisany")
    refresher()
        flicker();
    }else{
        alert(response)
        console.log(response)
    
    }
    
        }
    ).catch(function (error) {
        alert("nie udało się przesłać projektu")
    
     })  
}
    }
    

    export async function updateProject(user, photo, project, desc, photoInfo, id, flicker, edit, reset){
        console.log(desc)
        let adress

        try{
             adress= await  getAdres()
        }catch(error){
            return
        }
        if(photo!=null){
            
 PostPhoto(user, photo).then((result) => {
        
let databasic={
    "user":user.userId,
    "token":user.tempToken,
    "task":"update_project",
    "edit":edit
}
let data=databasic
if(edit.title){
    let temp= {
        "title": project,
        "id":id
    }
data={
...databasic,
project:temp
}
}
if(edit.desc){
    data.desc=desc
}
if(edit.pic){
   data.pic=photoInfo 
}


Axios.put(adress+'/php_rest_api/APIS/workersChange.php', data).then(
    function (response) {
 
if (response.data=="done") {
    reset()
    flicker();
}else{
    alert("nie udało się przesłać projektu")

}

    }
).catch(function (error) {
    alert("nie udało się przesłać projektu")

 })  


}).catch(function (error) {
alert("nie udało się przesłać zdjęcia, sprawdź czy nie występuje  już w galerii")
})}else{

    
    let databasic={
        "user":user.userId,
        "token":user.tempToken,
        "task":"update_project",
        "edit":edit
    }
    let data=databasic
    if(edit.title){
        let temp= {
            "title": project,
            "id":id
        }
 data={
    ...databasic,

project:temp
 }
    }
    if(edit.desc){
        data.desc=desc
    }
    if(edit.pic){
       data.pic=photoInfo 
    }
    console.log(data)
    Axios.put(adress+'/php_rest_api/APIS/workersChange.php', data).then(
        function (response) {
     
    if (response.data=="done") {
        reset()
        flicker();
    }else{
        console.log(response)
        alert("nie udało się przesłać projektu")
    
    }
    
        }
    ).catch(function (error) {
        console.log(error)

        alert("nie udało się przesłać projektu")
    
     })  
    

}
    }
    export async function updateUser(user, userdata, edit){
        let adress

        try{
             adress= await  getAdres()
        }catch(error){
            return
        }
        const data = {
            user: user.userId,
            token: user.tempToken,
            task:"update_user_data",
            nam: edit.nam ? userdata.nam:"" ,
            surname: edit.surname ?userdata.surname:"" ,
            usernam: edit.userNam ? userdata.userNam:"" ,
            psswd: edit.password ? userdata.password:"" ,
          };
   Axios.put(adress+"/php_rest_api/APIS/workersChange.php",data).then(
        function (response) {
            if (response.data=="done") {
                alert("zmiana powiodła się")

            }else{
                alert("zmiana nie powiodła się")
        
            }
        
                }
            ).catch(function (error) {
                alert("nie powiódł się reset hasła")
        
             }) 


    }
    export async function suspUser(user, suspID, flicker){
        let adress

        try{
             adress= await  getAdres()
        }catch(error){
            return
        }
        const data={
            "admlogin": user.userId,
            "token":user.tempToken,
            "task":"susp_user",
            "login":suspID
        }
        Axios.put(adress+"/php_rest_api/APIS/adminChange.php",data).then(
            function (response) {
                if (response.data=="done") {
                    flicker();
                }else{
                    alert("zmiana nie powiodła się")
            
                }
            
                    }
                ).catch(function (error) {
                    alert("zmiana nie powiodła się")
            
                 })  
    }
    export async function unSuspUser(user, suspID, flicker){
        let adress

        try{
             adress= await  getAdres()
        }catch(error){
            return
        }
        const data={
            "admlogin": user.userId,
            "token":user.tempToken,
            "task":"un_susp_user",
            "login":suspID
        }
        Axios.put(adress+"php_rest_api/APIS/adminChange.php",data).then(
            function (response) {
                if (response.data=="done") {
                    flicker();
                }else{
                    alert("zmiana nie powiodła się")
            
                }
            
                    }
                ).catch(function (error) {
                    alert("zmiana nie powiodła się")
            
                 })  
    }