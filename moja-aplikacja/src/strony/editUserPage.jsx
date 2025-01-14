import React, { Component, useState } from 'react';
import Paper from '@mui/material/Paper';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import {  Box, Button, Grid, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 
import {CreateUsers} from './axiosPost'
import { updateUser } from './axiosPut';
import { backGround } from '../styles';
export default function ChangeData(props){
    const navigate=useNavigate();
    const [userData, setUserData] = useState(
        props.userdata
      );
      const [edited, setEdited ]=useState({nam:false, surname:false,userNam:false,password:false, isAdmin:false})
      const edit=(name, value)=>{
        setUserData((prevState)=>({
          ...prevState,
  [name]:value
  }))
  setEdited((prevState)=>({
    ...prevState,
[name]:true
}))
      }
   
    const [Error, setError]=useState(false)
return(
    <>
    <Box  sx={backGround} >
        <Grid container justifyContent="center" display='flex' alignItems="center" >
          <Grid item sx={{marginTop:'10%'}}>
          <Paper elevation={3} sx={{background:'#56aed2',height:410, width:500}}>
          <Grid container justifyContent="space-between"   alignItems="center"  direction="column">
<Grid item sx={{marginTop:'5%', color:'#FAF9F6'}}>
  {props.doesCreate?   "Utwórz użytkownika":"Dane użytkownika:" }
</Grid>
<Grid item sx={{marginTop:'3%'}}>
<TextField value={userData.nam}
InputLabelProps={{
    style: { color: '#FAF9F6' },
  }}
inputProps={{style: {  alignItems:'center', color:'#FAF9F6'}}}
 onChange = {(e) => {edit("nam", e.target.value)
 }}
 label="imię" variant="standard" />
</Grid>
<Grid item sx={{marginTop:'3%'}} >
<TextField 
InputLabelProps={{
    style: { color:'#FAF9F6' },
  }}
  sx={{ color:'white'}} inputProps={{style: {  alignItems:'center', color:'#FAF9F6'}}} value={userData.surname} onChange = {(e) => {
edit("surname", e.target.value)
    
}}  label="nazwisko" variant="standard" />
</Grid>
<Grid item sx={{marginTop:'3%'}}>
<TextField 
inputProps={{style: {  alignItems:'center', color:'#FAF9F6'}}}
InputLabelProps={{
    style: { color: '#FAF9F6' },
  }}
  value={userData.userNam} onChange = {(e) => {
   edit("userNam", e.target.value)
}}
label="login" variant="standard" />
</Grid>
<Grid item sx={{marginTop:'3%'}}>
<TextField
InputLabelProps={{
    style: { color: '#FAF9F6' },
  }}
inputProps={{style: {  alignItems:'center', color:'#FAF9F6'}}}
 disabled={props.doesCreate}  error={Error}  helperText={Error? 'błąd, twoje hasło nie spełnia założeń':""} value={userData.password}onChange = {(e) => {edit("password", e.target.value)
 }}
        type="password" label="hasło" variant="standard" />
</Grid>
{ props.doesCreate? 
<Grid item sx={{marginTop:'3%', color:'#FAF9F6'}}>
   
 Konto Administratora: <Checkbox checked={userData.isAdmin} disabled={!(userData.isAdmin||props.doesCreate)} onChange = {(e) => {edit("isAdmin", e.target.value)
 }}/>
</Grid>: ""}
<Grid item sx={{marginLeft:'60%', marginTop:'3%'}}>
 {props.doesCreate? 
    <Button variant="contained" onClick={()=>{
        if(edited.password){
            var regularExpression = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

            if(userData.password.match(regularExpression)){
              CreateUsers(props.user, userData).then(
                navigate("/Loged/Administrator")                                
              )
            }else{
                setError(true)
            }
        }else{
          CreateUsers(props.user, userData).then(
  navigate("/Loged/Administrator")
          )
        }



        
       
       }}> utwórz
       </Button>   : 
    <Button variant="contained" onClick={()=>{
        if(edited.password){
            var regularExpression = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

            if(userData.password.match(regularExpression)){
                setError(false) 
                if(userData.login!=""){
                    updateUser(props.user,userData,edited).then(
                  navigate("/Loged")
                    )
                }
              

                
              }else{
                  setError(true)
              }
          }else{
            if(userData.login!=""){
              updateUser(props.user,userData,edited).then(
            navigate("/Loged")
              )
          }
          }
    }}>zapisz zmiany</Button>
                 }
       
       
    </Grid>
    </Grid>

            </Paper>
            </Grid>  
            
            
             </Grid>
    </Box>
    
    </>
)
}
