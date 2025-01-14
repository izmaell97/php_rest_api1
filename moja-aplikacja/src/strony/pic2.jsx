import { useState, useContext} from 'react'
import { Button, Grid, TextField  } from '@mui/material';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import { adressContext } from '../Routing';

import GaleryModalGet from './GaleryGet'
import { boxShadows, picmod } from '../styles';
 function PicModal(props){
  const adress=useContext(adressContext)

    const [open, setOpen]=useState(false)

    const handleFileChange = (e) => {
      if (e.target.files) {
        props.handler("Downloaded", true);
        console.log(props.photoParams.Downloaded)
        props.setPhoto(e.target.files[0]);
      }
    };
  
    const handleClose = () => setOpen(false);
    const handleOpen = () => {      setOpen(true);
    }
    return(
        <>
        <div>
                 {props.photo? <img src={URL.createObjectURL(props.photo)} onClick={()=>handleOpen()} alt="Image Preview" style={{ objectFit: 'contain', maxHeight:430, maxwidth:350 }}/> : <img src={props.photoParams.LINK} onClick={()=>handleOpen()} alt={props.photoParams.LINK} style={{ objectFit: 'contain', maxHeight:430, maxwidth:350 }} />}
                 </div>
<Button variant='contained' color="primary" onClick={()=>handleOpen()}>Zmień zdjęcie</Button>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper sx = {picmod}>
        <Grid  container
         direction="column"
  justifyContent="flex-start"
  alignItems="center"
  sx={{ color:'#1976d2'}}>
<Grid item sx={{padding:3}}>
<GaleryModalGet user={props.user} handler={props.handlerGalery}></GaleryModalGet>
</Grid>
    <Grid item  sx={{padding:3}}>
    <label for="formId"
      onChange={handleFileChange}
       style={{display: 'block',   boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1), 0px 3px 6px rgba(0, 0, 0, 0.08)',
            background:'#FAF9F6', color:'#1976d2', padding: '10px', cursor: 'pointer'}} >
    <input type="file"         accept=".jpg, .jpeg, .png"
        hidden
        id="formId"
     />
    KLIKNIJ TU BY DODAĆ PLIK </label>


          </Grid> 
        <Grid item sx={{padding:3}}>
          Notatka:
    <TextField value={props.photoParams.PICTURE_NOTE}
                     onChange = {(e) => {props.handler('PICTURE_NOTE', e.target.value)}}

        sx={  boxShadows}  inputProps={{style: {  textAlign: 'center', alignItems:'center', color:'#1976d2'}}}
>

</TextField>
    </Grid>

    <Grid item  sx={{padding:3}}>
      Tekst alternatyny:
    < TextField value={props.photoParams.ALT}
                 onChange = {(e) => {props.handler('ALT', e.target.value)}}

        sx={   boxShadows}  inputProps={{style: {  textAlign: 'center', alignItems:'center', color:'#1976d2'}}}
>

</TextField>
    </Grid>

   
    <Grid item  sx={{padding:3}}>
Imię i nazwisko autora zdjęcia:
    <TextField value={props.photoParams.Owner}
             onChange = {(e) => {props.handler('Owner', e.target.value)}}

        sx={   boxShadows }  inputProps={{style: {  textAlign: 'center', alignItems:'center', color:'#1976d2'}}}
>

</TextField>
    </Grid>

          </Grid> 
          </Paper>
          </Modal>  
    </>
    )
}
export default PicModal