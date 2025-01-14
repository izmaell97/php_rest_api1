import { useState } from 'react'
import { Button, Grid, TextField  } from '@mui/material';
import Modal from '@mui/material/Modal';
import GaleryModal from './picGalery'
import Paper from '@mui/material/Paper';
import Axios from "axios";
import ReactLoading from "react-loading";
import { adressContext } from '../Routing';
import { Navigate, Outlet, useLocation, useNavigate} from  'react-router-dom';
import { useContext } from "react";
import { descModal } from '../styles';

export default function GaleryModalGet(props){
  const navigate=useNavigate();
  const adress=useContext(adressContext)

  const[galery, setGalery]=useState(null)
  const handleClose = () => {
    setOpen(false);
setGalery(null)
  }
  function loadResources(){
    setTimeout(() => {
      var data= adress+"/php_rest_api/APIS/workersinfo.php?task=getPhotos"
      Axios.get(data,  {headers:{Authorization: props.user.tempToken+":"+props.user.userId }}).then(

      function (response) {
        if(response.data!='error'){  
          console.log(response.data)
          setGalery(response.data)


        }else{
          handleClose()
          alert('wystąpił błąd przy pobieraniu danych')
        }
  
      }).catch(function (error) {
        handleClose()
        alert('wystąpił błąd przy pobieraniu danych')
        navigate('/loged/Wystawa')
            })
        
    },500)
  }
  const handleOpen = () => {
     setOpen(true); 
     loadResources()
     

  }
    const [open, setOpen]=useState(false);

return(
    <>
    <Paper elevation={1}>
      <Button variant="text" color="primary" onClick={()=>handleOpen()}>Wybierz zdjęcie z galerii</Button>

    </Paper>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper sx = {descModal}>
        <Grid  container
         direction="row"
  justifyContent="flex-start"
  alignItems="center"
  sx={{ color:'#1976d2'}}>

{galery==null?<ReactLoading
          type={"spinningBubbles"}
          color={"radial-gradient(circle, rgba(18,6,183,1) 6%, rgba(46,194,255,0.8856792717086834) 89%)"}
          height={180}
          width={180}
        />:<GaleryModal galery={galery} handler={props.handler} exit={handleClose}/>}



    </Grid>
    </Paper>
    </Modal>
    </>
)



}
