import React, { Component, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { Grid, TextField, Button, Fab } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {passwordResset, UpUser, DwUser} from './axiosPut'
import InputAdornment from '@mui/material/InputAdornment';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SearchIcon from '@mui/icons-material/Search';
import { suspUser } from './axiosPut';
import { unSuspUser } from './axiosPut';
import { backGround, odnowaPanel } from '../styles';
export default function Reset(props){
const[stateUpadter, setStateUpdater]=useState(true)
const[filter, setFilter]=useState("");
    return(
<>
<Grid  container    justifyContent="flex-start"
  direction="column"

 alignItems="flex-start"

   sx={ backGround} >
    <Grid Item   alignItems="center" sx={    {      marginLeft:40}
}   justifyContent="center"
>
 <TextField
      value={filter}
      onChange = {(e) => {
        setFilter(e.target.value)
      }}  
      inputProps={{style: {  textAlign: 'center', alignItems:'center', color:'#FAF9F6'}}}
        label="wyszukaj użytkownika"
        InputProps={
          {
          
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
</Grid>
<Grid item  sx={    {      marginLeft:20}
} alignItems="flex-start"
>
    <List  alignItems="flex-start">
         {props.users.map((value)=>(
value.userNam.toLowerCase().includes(filter.toLowerCase())?
<ListItem
            key={value.userNam}
           
          >
                         <Paper  elevation={3} sx={ {
  textAlign: 'center',
  border: value.Suspended ? 2 : 0,
  borderColor: 'error.main',
  display: 'flex',
  background: '#56aed2',
  color: '#FAF9F6',
  flexWrap: 'wrap',
  '& > :not(style)': {
    m: 3,
    width: 270,
    height: 70,
  },
}} >
            <ListItemText  primaryTypographyProps={{fontSize:'110%'}} primary={`${value.NAM} ${value.SURNAME} ${value.userNam}`} />

        </Paper>
        <Paper  elevation={3}
        onClick={()=>{
           
        }

        }
         sx={odnowaPanel} >
       {value.ISACTIVE==0?<DeleteIcon color="disabled" onClick={()=>{unSuspUser(props.user, value.ID_WORKERS, props.flicker)}}/>: <DeleteIcon sx={{color:'#FAF9F6'}}  onClick={()=>{suspUser(props.user, value.ID_WORKERS, props.flicker)}}/>}   
        </Paper>
        {value.ISACTIVE==3?
        <Paper  elevation={3}    
         sx={odnowaPanel} >
       <RestartAltIcon color="disabled"/>
        </Paper>
        : 
          <Paper  elevation={3}
          
    onClick={()=>{
      passwordResset(props.user, value.ID_WORKERS, props.flicker)
      }
      } 
                 sx={odnowaPanel} >
       
         <RestartAltIcon  sx={{color:'#FAF9F6'}}   /></Paper>}   
        <Paper  elevation={3}
    
    onClick={()=>{
   }
    } 
        
         sx={odnowaPanel} >
       {value.Privlage?<PersonAddIcon color="disabled" onClick={()=>{UpUser(props.user, value.ID_WORKERS, props.flicker)}} />: <PersonAddIcon onClick={()=>{DwUser(props.user, value.ID_WORKERS, props.flicker)}} sx={{color:'#FAF9F6'}}   />}   
        </Paper>
       </ListItem>:null

         

        ) )}
    </List>
    </Grid>
    </Grid>

</>
    )
}