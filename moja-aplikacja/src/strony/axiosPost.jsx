import Axios from "axios";
import React from 'react';
import { Navigate, Outlet, useLocation, useNavigate} from  'react-router-dom';

export async function getAdres(){
    return new Promise((resolve, reject)=>{

    fetch(`${process.env.PUBLIC_URL}/config.json`).then(response => response.json())
    .then(data =>{
        resolve (data.apiUrl)}
    )
    .catch(error =>   reject(null));

 })
}
export async function PostPhoto(user,   photo){
    let adress

try{
     adress= await getAdres()
}catch(error){
    return
}
    return new Promise((resolve, reject)=>{
        
if(photo!=null){
    const formData = new FormData();
formData.append('nazwa',photo)
    Axios.post(adress+"php_rest_api/APIS/SendPhoto.php" ,formData, {
        headers: {
            'Content-Type': 'multipart/form-data', // Important for file uploads
            Authorization:  user.tempToken+":"+user.userId 
        },
    }).then(
        function (response) {
if(response.data.startsWith("/pictures/")){
    resolve (response.data)
}else{
    reject(null)
}} ).catch(function (error) {
        reject(null)
    })}})}

export  async function PostProject(user, photo, project, desc, photoInfo, navigate){
    let adress

try{
     adress= await getAdres()
}catch(error){
    return
}
    if(photo!=null){
 PostPhoto(user, photo).then((result) => {
    console.log(result)
    const data={
        "user": user.userId,
        "token": user.tempToken,
        "type": "post_project",
        "name": project,
        "description":{
            "lng1":desc.LNG1,
            "lng2":desc.LNG2,
            "lng3":desc.LNG3,
        },
        "photo":{
            "link": result,
            "textalt":photoInfo.ALT,
            "notes": photoInfo.PICTURE_NOTE,
            "creator": photoInfo.Owner
        }
    }
 Axios.post(adress+"php_rest_api/APIS/workersCreate.php",data).then(
        function (response) {
    if (/^\d+$/.test(response.data) || response.data === parseInt(response.data, 10)) {
navigate("/Loged/Wystawa/"+ response.data+"$saved")
    }else{
        alert("nie udało się przesłać projektu")
    }
        }
    ).catch(function (error) {
        alert("nie udało się przesłać projektu")
     }) 
}).catch(function (error) {
    alert("nie udało się przesłać zdjęcia, sprawdź czy nie występuje  już w galerii")
})
}else{
    const data={
        "user": user.userId,
        "token": user.tempToken,
        "type": "post_project",
        "name": project,
        "description":{
            "lng1":desc.LNG1,
            "lng2":desc.LNG2,
            "lng3":desc.LNG3,
        },
        "photo":{
            "link": photoInfo.LINK,
            "textalt":photoInfo.ALT,
            "notes": photoInfo.PICTURE_NOTE,
            "creator": photoInfo.Owner        }
    }
        Axios.post(adress+"php_rest_api/APIS/workersCreate.php",data).then(
            function (response) {
                if (/^\d+$/.test(response.data) || response.data === parseInt(response.data, 10)) {
                    navigate("/Loged/Wystawa/"+ response.data+"$saved")

                }else{
                    alert("nie udało się przesłać projektu")

                }

            }).catch(function (error) {
                alert("nie udało się przesłać projektu")
        
             }) 

    
   
  }

}
export  async function PostObjectOrRoom(user, photo, name, desc, note, type, photoInfo, projectId, flicker){

    let adress

try{
     adress= await getAdres()
}catch(error){
    return
}

    if(photo!=null){


 PostPhoto(user, photo).then((result) => {
    const data={
      "user":user.userId,
 "token":user.tempToken,
  "type":"post_object_room",
  "typeof": type,
  "title":name,
  "note":note,
  "projid":projectId,
  "description":{
   "lng1":desc.LNG1,
            "lng2":desc.LNG2,
            "lng3":desc.LNG3
        },
      "photo":{
        "link": result,
        "textalt":photoInfo.ALT,
        "notes": photoInfo.PICTURE_NOTE,
        "creator": photoInfo.Owner
          }

    }
 Axios.post(adress+"php_rest_api/APIS/workersCreate.php",data).then(
        function (response) {

    if (response.data=="done") {
        flicker();
    }else{
        console.log(response.data)
        alert("nie udało się przesłać projektu")

    }

        }
    ).catch(function (error) {
        console.log(error)
        alert("nie udało się przesłać projektu")

     })  
    
    
}).catch(function (error) {
    alert("nie udało się przesłać zdjęcia, sprawdź czy nie występuje  już w galerii")
})
}else{
    const data={
        "user":user.userId,
        "token":user.tempToken,
         "type":"post_object_room",
         "typeof": type,
         "title":name,
         "note":note,
         "projid":projectId,
         "description":{
          "lng1":desc.LNG1,
            "lng2":desc.LNG2,
            "lng3":desc.LNG3,
               },
        "photo":{
"link": photoInfo.LINK,
            "textalt":photoInfo.ALT,
            "notes": photoInfo.PICTURE_NOTE,
            "creator": photoInfo.Owner  
                }
    }
        Axios.post(adress+"php_rest_api/APIS/workersCreate.php",data).then(
            function (response) {
                if (response.data=="done") {
                    flicker();

                }else{
                    console.log(response.data)

                    alert("nie udało się przesłać projektu")

                }

            }).catch(function (error) { 

            })

    
   
  }

}
export async function PostUser(user, ID_WORKERS, ID_PROJECTS, flicker ){
    let adress

try{
     adress= await getAdres()
}catch(error){
    return
}
    const data={
        "user":user.userId,
        "token":user.tempToken,
        "type":'post_user',
        "newUser": ID_WORKERS,
        "project": ID_PROJECTS,
    }
    Axios.post(adress+"php_rest_api/APIS/workersCreate.php",data).then(
        function (response) {
if(response.data="done"){
    flicker();
}else{
    alert("nie udało się przesłać użytkownika")
}}).catch(function (error) {  console.log(error)
      alert("nie udało się przesłać użytkownika")
})
}
export async function CreateUsers(user, creatinngData){
    let adress

try{
     adress= await getAdres()
}catch(error){
    return
}
    return new Promise((resolve, reject)=>{

    let data={
        "admlogin":user.userId,
        "token":user.tempToken,
        "task":"create_user",
        "login": creatinngData.userNam ,
        "nam":creatinngData.nam,
        "surnam":creatinngData.surname,
        "isAdmin":creatinngData.userNam
    }
    Axios.post(adress+"php_rest_api/APIS/adminCreate.php",data).then(
        function (response) {
            if(response.data=="done"){
            alert("utworzono użytkownika: "+ creatinngData.userNam)
            resolve(true)


        }else{
            alert("nie udało się przesłać użytkownika")
            resolve(false)
        }}).catch(function (error) {  console.log(error)
              alert("nie udało się przesłać użytkownika")
              resolve(false)

        })

    })

}