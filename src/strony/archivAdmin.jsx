import React, { Component, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import { Grid, TextField, Button } from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Typography from '@mui/material/Typography';
import Tooltip  from '@mui/material/Tooltip';
import { backGround, boxShadows, archivPlate, archivPlateV2} from '../styles';
export default function ArchivAdmin(props){
  const[filter, setFilter]=useState("");

    return(
<>
<Grid  
container    direction="column"
justifyContent="space-around"
alignItems="flex-start"
   sx={ backGround} >
   <Grid item>
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
        sx={  boxShadows }  inputProps={{style: {  textAlign: 'center', alignItems:'center', color:'#1976d2'}}}

      />

   </Grid>
{props.desc.map((value)=>(
              value.LNG1.toLowerCase().includes(filter.toLowerCase())?

<Grid item >
  <Grid container direction="row">
    {(value.tab=="desc")?
<Paper elevation={3} sx={archivPlate}>  <Typography align='justify' sx={{whiteSpace:'pre-line'}}>
{value.ID}, {' '}
{value.LNG1}
</Typography>
</Paper>: <Tooltip title="Opis Archiwalny" placement="right-start"><Paper  elevation={3} sx={archivPlateV2}>   <Typography align='justify' sx={{whiteSpace:'pre-line'}}>
{value.ID}, {' '}
{value.LNG1}
</Typography>
</Paper>
</Tooltip>

    }

<Paper elevation={3}   sx={archivPlateV2} 
        onClick={()=>{
          props.del(value.ID)
        }}
      >
           
  <DeleteIcon sx={{color:'#FAF9F6'}}></DeleteIcon></Paper>

</Grid>
</Grid>:null
))}

    </Grid>
    </>
    )
}
