import React, { useState } from "react";
import { Grid } from "@mui/material";
import Paper from '@mui/material/Paper';
import CountryFlag from 'react-country-flag';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import { textUserPanel, titleUserPanel } from "../styles";
export default function TextUser(props){
    const [stat, setStat]=useState(false)
    const handleClick=()=>{
        setStat(!stat)
    }
return(
<Grid container  direction="column"
  justifyContent="space-evenly"
  alignItems="stretch"
  >
<Grid item xs={12} >
<Paper elevation={3}  sx={titleUserPanel}>
<CountryFlag countryCode={props.lngCode} svg  style={{ width: '50px', height: 'auto' }}/>
{props.jezyk}
<ExpandMoreIcon sx={{fontSize:70,color:'#FAF9F6'}} onClick={()=>handleClick()}/>
</Paper>

</Grid>   
<Grid item xs={12}>
    {stat?(
    <Paper elevation={3} sx={textUserPanel}>
        <Typography align='justify' sx={{whiteSpace:'pre-line'}}>
        {props.text}
        </Typography>
        </Paper>):null}
</Grid>
</Grid>
)}