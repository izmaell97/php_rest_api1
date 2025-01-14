import React, { Component, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import { Grid, TextField, Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import { useEffect } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import {PostUser} from './axiosPost.jsx'
import { boxShadows, userPaper } from '../styles.jsx';
export default function Lists(props){
    const[filter, setFilter]=useState("");

    const[UserList, setUserList]=useState(props.lista)
    return(
        <Grid  container    justifyContent="center"
  direction="column"

 alignItems="center"
>
    
<Grid Item   alignItems="center" sx={    {      marginLeft:8}
}   justifyContent="center"
>

<TextField
      value={filter}
      onChange = {(e) => {
        setFilter(e.target.value)
      }}  
        label="wyszukaj opis"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        variant="standard"
        sx={   boxShadows }  inputProps={{style: {  textAlign: 'center', alignItems:'center', color:'#1976d2'}}}

      />

<List  alignItems="center">
         {UserList.map((value)=>(
            value.NAM.concat(value.SURNAME).toLowerCase().includes(filter.toLowerCase())?
<ListItem
            key={value.login}
           
          >
                         <Paper  elevation={3} sx={userPaper} 
        onClick={()=>{PostUser(props.user, value.ID_WORKERS, props.project, props.flicker)}}>
            <ListItemText  primaryTypographyProps={{fontSize:'110%'}} primary={`${value.NAM} ${value.SURNAME} `} />

        </Paper>
        </ListItem>:null   

) )}
</List>
    </Grid>
    </Grid>

    )
}