import { Route } from "react-router-dom";
import React, { useEffect } from "react";
import TextField from '@mui/material/TextField'; 
import { useState } from "react";
import { Box, Grid, Paper, Button} from "@mui/material";
import { backGround, textfild } from "../styles";
export default function Login(props){
  const tempfunc=props.loging
  const [text, setText] = useState({password:"", login:""});
  
const logout=props.logout
function logingin(){

tempfunc(text.login, text.password)
}
useEffect(()=>{
logout()
},[]
)
    return (
<>
<Box   sx={backGround} >
        <Grid container justifyContent="center" display='flex' alignItems="center" >
          <Grid item sx={{marginTop:'8%'}}>
          <Paper elevation={3} sx={{background:'#56aed2',height:400, width:500}}>
          <Grid container justifyContent="space-between"   alignItems="center"  direction="column">
<Grid item sx={{marginTop:'8%', color:'#FAF9F6'}}>
Zaloguj się:
</Grid>
<Grid item sx={{marginTop:'7%'}}>
<TextField 
InputLabelProps={{
  style: { color: '#FAF9F6' },
}}
inputProps={{style: {  alignItems:'center', color:'#FAF9F6'}}}
sx={textfild} id="login"   error={props.Error}  value={text.login}  onChange = {(e) => {
               setText({login:e.target.value,password:text.password});
            }} label="login" variant="standard" />
            </Grid>
            <Grid item sx={{marginTop:'3%'}}>
<TextField 
InputLabelProps={{
  style: { color: '#FAF9F6' },
}}
inputProps={{style: {  alignItems:'center', color:'#FAF9F6'}}}
sx={textfild}id="password" value={text.password} onChange = {(e) => {
               setText({password:e.target.value,login:text.login} ); 
            } } 
  type="password" label="hasło" variant="standard"
  error={props.Error}  helperText={props.Error? 'Niepoprawne dane logoawnia':""} />
</Grid>
<Grid item sx={{marginTop:'9%'}}>
    <Button variant="contained"onClick={logingin} >login
  </Button>

</Grid></Grid>

            </Paper>
            </Grid>  
            
            
             </Grid>
    </Box>
    </>
    )
}
 