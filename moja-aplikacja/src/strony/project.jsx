import React, { Component, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import { Grid, TextField, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@mui/material/Modal';
import RestorePageIcon from '@mui/icons-material/RestorePage';
import { useNavigate } from 'react-router-dom';
import { backGround, odnowaPanel, choseProjPaper, choseProjPaper2, buttonPanel2 } from '../styles';
export default function Project(props){
const navigate=useNavigate();
    const del=props.delete;
    const refresh=props.refresh;
    const [open, setOpen] = useState(false);
const [newProj, setNewProj]=useState("")
const handleClose = () => setOpen(false);
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100vh',
  border: '2px solid #000',
  boxShadow: 24,
  p: 3,
  color:'#1976d2'
};
    return(
        <>
        <Grid  container    justifyContent="space-around"    alignItems="flex-start"

   sx={ backGround}>
<Grid item>
        <List sx={{ width: '100%', maxWidth: 1000  }}>


        <ListItem
            key={"create"}
       
          >     
            <Paper elevation={3} onClick={()=>setOpen(true)}  sx={choseProjPaper} 
      >
      
            <ListItemText  primaryTypographyProps={{fontSize:'170%', color:'#FAF9F6'}} primary={`utwórz wystawę`} />
        
   </Paper>
          </ListItem>


        {props.list.map((value) => (
          
   
          <ListItem
            key={value.ID_PROJECTS}
           
          >
                         <Paper  elevation={3} sx={odnowaPanel} >
<h1 style={{color:'#FAF9F6'}}>{props.list.indexOf(value)+1}
</h1>
        </Paper>
       
            
            <Paper elevation={3}   sx={choseProjPaper2} 
        >
      
            <ListItemText primaryTypographyProps={{fontSize:'170%', color:'#FAF9F6'}} primary={`${value.EX_NAME}`} />
         </Paper>
  
         <Paper elevation={3}  onClick={()=>{
navigate("/Loged/Wystawa/"+ value.ID_PROJECTS+"$saved");
         }}
          sx={buttonPanel2} 
      >
        <EditIcon sx={{color:'#FAF9F6'}}></EditIcon>
         </Paper>
         {((value.STANOWISKO=="kurator"|| props.user.isadmin)&&(value.CURRENT))?
         <Paper elevation={3}   sx={buttonPanel2} 
        onClick={()=>{
       del(value.ID_PROJECTS)
        }}
      >
           
  <DeleteIcon sx={{color:'#FAF9F6'}}></DeleteIcon></Paper>:
   <Paper elevation={3}   sx={buttonPanel2} 
      >
           
  <DeleteIcon color='disabled'></DeleteIcon></Paper>}
       {props.user.isadmin? value.CURRENT?
       
        <Paper elevation={3}   sx={buttonPanel2} 
      >  <RestorePageIcon color='disabled'></RestorePageIcon> 
        
         </Paper>:<Paper elevation={3}   sx={buttonPanel2} 
        onClick={()=>{
refresh(value.ID_PROJECTS)
        }}
      >
        <RestorePageIcon sx={{color:'#FAF9F6'}}></RestorePageIcon>
      </Paper>:null}
          </ListItem>
        ))}
      </List>
      </Grid>
   </Grid>
   


   
   <Modal
        open={open}
        onClose={handleClose}
      >
        <Paper sx={style} >
<div style={{padding: "20px"}}>Podaj tytuł nowej wystawy:
</div>
      <TextField sx={{ width:'80vh'}} 
      inputProps={{style: {  alignItems:'center', color:'#1976d2'}}}
 
       value={newProj} onChange = {(e) => {
      setNewProj(e.target.value)}}/>
      <Button 
      variant="contained" color="primary"
       onClick={()=>{
        navigate("/Loged/Wystawa/"+ newProj+"$unsaved");
      }} >Zapisz zmiany</Button>
        </Paper>
      </Modal>
          </>
    )
}