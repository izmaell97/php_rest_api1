import React, { createContext } from 'react';
import { useState,  useEffect} from 'react';
import Login from './strony/login';
import Axios from 'axios';
import {useNavigate, Route, Routes } from 'react-router-dom';
import CheckLoginChose from './strony/chosePage/CheckChosePage';
import ProjectPageCheck from './strony/projectPage/projectPageCheck';
import CheckEditData from './strony/checkEditPage';
import CheckOpenProject from './strony/CheckOpenProject';
import CheckAdmin from './strony/CheckAdminPage';
import CheckAdminUsers from './strony/CheckAdminUsers';
import CheckAdminAddUsers from './strony/CheckAdminAdd';
import CheckAdminArchiv from './strony/CheckArchivAdmin';
import UserLoader from './strony/CheckUserPage';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import IconButton from '@mui/material/IconButton';
import Wait from './strony/waitPage';
import { useContext} from 'react';
import { logoutStyle } from './styles';
export const adressContext =createContext();
function Routing() {
  const navigate = useNavigate();
  const [user, setUser]=useState({user: "",userId:"", isAuthenticated: false, didTried: false, isadmin:false, tempToken:""}) 
  const [apiUrl, setApiUrl] = useState(null);
 
function logout(){ 

    if(user.didTried){
     let   newstate={user:"",userId:"",isAuthenticated:false, didTried:true, isadmin:false, tempToken:""}
     if(user.tempToken.length>1){
      var element={
        "login":user.userId,
        "token":user.tempToken
      }
      Axios.delete(apiUrl+'php_rest_api/APIS/logout.php', {data: element}).then(
        (function (response) {
setUser(newstate) 
        })) }else{
      setUser(newstate) 
     }}else{
      let data = sessionStorage.getItem("data1");
      if(data){
        let tempUser= JSON.parse(data);
         var element={
           "login":tempUser.userId,
           "token":tempUser.tempToken
         }
         console.log(data)
         Axios.delete(apiUrl+'php_rest_api/APIS/logout.php', {data: element}).then(
           (function (response) {
            sessionStorage.clear();
           }))}}}

  function  LoginChange(login1, password1){ 
    var data={
      login: login1,
      psswd: password1
    }
    let loged=4;
    var newstate
Axios.post(apiUrl+'php_rest_api/APIS/loging.php',data
 ).then((function (response) {
   loged=response.data.privilege
if(loged=="0"){
newstate={user:login1,userId:response.data.Id, isAuthenticated :true, didTried:true, isadmin:true, tempToken:response.data.token}
sessionStorage.setItem("data1", JSON.stringify(newstate));
setUser(newstate)
if(response.data.forerror==3){
  alert("zmień domyślnie ustawione hasło")

navigate("/Loged/Settings");
}else{
  navigate("/Loged");
}
}else if(loged=="1"){
newstate={user:login1,userId:response.data.Id, isAuthenticated :true, didTried:true, isadmin:false, tempToken:response.data.token}
sessionStorage.setItem("data1", JSON.stringify(newstate));
setUser(newstate)
if(response.data.forerror==3){
  alert("zmień domyślnie ustawione hasło")

  navigate("/Loged/Settings");
  }else{
    navigate("/Loged");
  }
}
else{
newstate={user:"",isAuthenticated:false, didTried:true, isadmin:false,tempToken:"" }
 setUser(newstate)
 navigate("/Loged");
}
 }) ).catch(function (error) {
newstate={user:"",isAuthenticated:false, didTried:true, isadmin:false, tempToken:""}
setUser(error)
navigate("/Loged");
 })
  }
  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/config.json`).then(response => response.json())
    .then(data => setApiUrl(data.apiUrl))
    .catch(error => console.error('Error fetching config:', error));

  }, []);

  
  return (
    <>
 <adressContext.Provider value={apiUrl}>
    <Routes>
    <Route path='/' element={apiUrl?<Login loging={LoginChange} logout={logout} Error={user.didTried}/>:<Wait/>}/> // definiuje stronę logowania
    <Route path='/Loged' element={<CheckLoginChose user={user} />}/>
   <Route path='/Loged/Wystawa' element={<ProjectPageCheck user={user} />}/>
   <Route path='/Loged/Settings' element={<CheckEditData user={user}/>}/>
   <Route path='/Loged/Administrator' element={<CheckAdmin user={user}/>}/>
   <Route path='/Loged/Administrator/Users' element={<CheckAdminUsers user={user}/>}/>
   <Route path='/Loged/Administrator/Add' element={<CheckAdminAddUsers user={user}/>}/>
   <Route path='/Loged/Administrator/Archiv' element={<CheckAdminArchiv user={user}/>}/>
   <Route path={"/Loged/Wystawa/:projecttoOpen"} element={<CheckOpenProject user={user}  />} />
   <Route path="/Zwiedzajacy/:ObjecNumber" element={apiUrl?<UserLoader />:<Wait/>} />
   <Route path="/*" element={<h1>error 404</h1>}/>
   </Routes>
   </adressContext.Provider>
  {user.isAuthenticated?<div  style={{background: '#FAF9F6',
  position: 'absolute', /* or 'fixed' */
  top: '20px',
  right: 0,
  zIndex: 1 }}>{user.user} <IconButton onClick={()=>logout()}>      <PowerSettingsNewIcon sx={logoutStyle}/></IconButton> </div>:null} 

   </>
  );
}

export default Routing;
