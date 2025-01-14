import React, { Component, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { Grid, TextField, Button, Fab } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@mui/material/Modal';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { backGround, odnowaPanel, panelForToDelete } from '../styles';
export default function Remove(props){
    const[ObjectList, setObjectList]= useState(props.objects.map(obj=>({...obj, isDeleted:false})))
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
        label="wyszukaj element"
        InputProps={{
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
         {UserList.map((value)=>(
value.login.toLowerCase().includes(filter.toLowerCase())?
<ListItem
            key={value.login}
           
          >
                         <Paper  elevation={3} sx={panelForToDelete} >
            <ListItemText  primaryTypographyProps={{fontSize:'110%'}} primary={`${value.nam} ${value.first_nam} ${value.login}`} />

        </Paper>
        <Paper  elevation={3}
        onClick={()=>{
            const list=UserList
            console.log(list[list.indexOf(value)].login)
            list[list.indexOf(value)].isDeleted=true
            setUserList(list)
            setStateUpdater(!stateUpadter)
        }

        }
         sx={odnowaPanel} >
       {value.isDeleted?<DeleteIcon color="disabled"/>: <DeleteIcon />}   
        </Paper>

        <Paper  elevation={3}
    
    onClick={()=>{
        const list=UserList
        list[list.indexOf(value)].reseted=true
        setUserList(list)
        setStateUpdater(!stateUpadter)
   }
    } 
        
         sx={odnowaPanel} >
       {value.reseted?<RestartAltIcon color="disabled"/>: <RestartAltIcon     />}   
        </Paper>
       </ListItem>:null






         
         
         
         

        ) )}
    </List>
    </Grid>
    </Grid>

</>
    )
}