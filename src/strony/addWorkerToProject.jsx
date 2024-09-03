import { useEffect, useState } from 'react'
import { Button, Grid  } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Axios from "axios";
import { Navigate, Outlet, useLocation, useNavigate} from  'react-router-dom';
import Lists from './userList';
import ReactLoading from "react-loading";
import { adressContext } from '../Routing';
import { useContext } from "react";
import { addworkerPlate, modalPaper } from '../styles';
export default function AddWorkers(props){
    const [open, setOpen] = useState(false);
    const navigate=useNavigate();
    const adress=useContext(adressContext)

const [userList,SetUserList]= useState(null)
const[loaded, SetLoaded] =useState(true)
const loadUsers=(project)=>{

var data= adress+"php_rest_api/APIS/workersinfo.php?task=getNonWorkers&Project="+props.project

Axios.get(data,  {headers:{Authorization: props.user.tempToken+":"+props.user.userId }}).then(
  function (response) {
        setTimeout(() => {
          if(response.data!="no"){
                        SetUserList(response.data)
          }else{
            alert('wystąpił błąd przy pobieraniu danych');
            handleClose();
          }
        },500)
    }

).catch(
    function (error) {
        alert('wystąpił błąd przy pobieraniu danych')
        navigate('/loged')
            }   

)
}
useEffect(()=>{if(userList!=null){
  

    SetLoaded(false)
}},[userList])  
    const handleOpen=()=>{
loadUsers(props.project)
        setOpen(true)
    }
    const handleClose=()=>{
        setOpen(false)
    }
   
      
return(

    <>
   
         <Paper elevation={3}    sx={addworkerPlate} 


      >
        <AddIcon  sx={{color:'#FAF9F6'}} onClick={()=>handleOpen()}></AddIcon>
         </Paper>



         <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper  sx={modalPaper} >
        <Grid container justifyContent="center" display='flex' alignItems="center" >
          <Grid item sx={{marginTop:'10%'}}>
       {loaded? <ReactLoading
          type={"spinningBubbles"}
          color={"radial-gradient(circle, rgba(18,6,183,1) 6%, rgba(46,194,255,0.8856792717086834) 89%)"}
          height={180}
          width={180}
        />:<Lists lista={userList} user={props.user} project={props.project} flicker={props.flicker}/>}
</Grid>
</Grid> 
        </Paper>
      </Modal>
    </>
)
}