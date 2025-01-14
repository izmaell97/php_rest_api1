import { Grid } from '@mui/material';
import React, { useState } from 'react';
import {useNavigate, Navigate, useLocation, Outlet, Route, Routes, useActionData } from 'react-router-dom';
import { backGround } from '../../styles';

export default function ChosePage(props){
const navigate1 = useNavigate();
const handleWystawa=()=>{
  navigate1("/Loged/Wystawa")
}
const handleUstawienia=()=>{
  navigate1("/Loged/Settings")
}
const handleAdmin=()=>{
 
    if(props.user.isadmin){
      navigate1("/Loged/Administrator")
    }
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
        src={"./" + "Nowy projekt (2).jpg"}
        alt="Wystawa"
        onClick={handleWystawa}
        style={{ objectFit: 'contain',  height:500 }}
      />
      </Grid>
      <Grid item fontSize={19} color="white">

        Wystawy
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
        src={"./" + "Nowy projekt.png"}  
              alt="Ustawienia"
        onClick={handleUstawienia}
        style={{ objectFit: 'contain',  height:500 }}

      />
       </Grid>
      <Grid item fontSize={19} color="white">
        Ustawienia
      </Grid>
      </Grid>
      </Grid>
      {props.user.isadmin?

      <Grid item >
   <Grid
  container
  direction="column"
  justifyContent="center"
  alignItems="center">
    <Grid item>
      <img
        src={"./" + "obraz2.png"}  
        alt="admin"
        onClick={handleAdmin}
        style={{ objectFit: 'contain',  height:500 }}

      />
      </Grid>
      <Grid item fontSize={19} color="white">
        Funkcje administratora
      </Grid>
      </Grid>
      </Grid>:null}
      </Grid> 
 </>
   )
}