import { Grid } from '@mui/material';
import React, { useState } from 'react';
import {useNavigate, Navigate, useLocation, Outlet, Route, Routes, useActionData } from 'react-router-dom';
import { backGround } from '../styles';
export default function AdminChosePage(props){
const location = useLocation();
const navigate1 = useNavigate();
const handleUsers=()=>{
  navigate1("/Loged/Administrator/Users")
}
const handleAdd=()=>{
  navigate1("/Loged/Administrator/Add")
}
const handleArchiv=()=>{
  navigate1("/Loged/Administrator/Archiv")
}


//nie ma state bo po wybraniu przenosisz się na routa przez navigate
    return( 
      <>
 <Grid
  container
  direction="row"
  justifyContent="space-around"
  alignItems="center"
    sx={backGround}
>
<Grid item >
<Grid
  container
  direction="column"
  justifyContent="center"
  alignItems="center">
    <Grid item>
      <img
        src={"/" + "Users.png"}
        alt="Wystawa"
        onClick={handleUsers}
        style={{ objectFit: 'contain',  maxWidth:400 }}
      />
      </Grid>
      <Grid item fontSize={19} color="white">

        Zarządzanie Kontami
      </Grid>
      </Grid>
      </Grid>
      <Grid item >
      <Grid
  container
  direction="column"
  justifyContent="center"
  alignItems="center">
    <Grid item>
      <img
        src={"/" + "Folders.png"}  
              alt="Ustawienia"
        onClick={handleArchiv}
        style={{ objectFit: 'contain',  maxWidth:400 }}

      />
       </Grid>
      <Grid item fontSize={19} color="white">
        Zarządzanie Archiwum
      </Grid>
      </Grid>
      </Grid>
      <Grid item >
      <Grid
  container
  direction="column"
  justifyContent="center"
  alignItems="center">
    <Grid item>
      <img
        src={"/" + "addUser.png"}  
              alt="Ustawienia"
        onClick={handleAdd}
        style={{ objectFit: 'contain', maxWidth:400 }}

      />
       </Grid>
      <Grid item fontSize={19} color="white">
Dodaj Użytkownika
      </Grid>
      </Grid>

      </Grid>
      
      </Grid> 
 </>
   )
}