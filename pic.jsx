import { useState, useContext } from 'react'
import { Button, Grid, TextField  } from '@mui/material';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import { adressContext } from '../Routing';
import { boxShadows, descModal } from '../styles';
function FileUploadApp(props) {
const [open, setOpen]=useState(false)
const [photo1, setPhoto1]=useState(null)
  const [isUploadAction, setUploadAction] = useState(false);
const [temppic, setTemppic]=useState(true)
  const setFileProperty = (file, fileType, fileName) => {
    props.setFileProperties({ file, fileType, fileName });
  };
  const adress=useContext(adressContext)

  const clearFileProperty = () => {
    props.setFileProperties({ file: null, fileType: null, fileName: null });
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFileProperty(selectedFile, selectedFile.type, selectedFile.name);
    } else {
      clearFileProperty();
    }
  };

  const handleUpload = (event) => {
    event.preventDefault();
    setUploadAction(true);
    loadImagePreview(props.fileProperties.file, props.fileProperties.fileName);
  };
  const loadImagePreview=(file, fileName)=> {
    const imageElement = document.createElement('img');
    imageElement.src = URL.createObjectURL(file);
    imageElement.style.width = '300px';
    imageElement.style.maxHeight='300px'
    imageElement.style.objectFit='contain'
    linkFile(file, fileName, imageElement);
  }
  function linkFile(file, fileName, fileElement) {
    const fileLink = document.createElement('a');
    fileLink.href = URL.createObjectURL(file);
    fileLink.download = fileName;
    fileLink.appendChild(fileElement);
    setPhoto1(fileLink)
  }

  const handleClose = () => setOpen(false);
  const handleOpen = () => {
    console.log(props.photoParams)
    setOpen(true);
  }

  return (
    <>
    <div>
      
      {temppic?  <img  onClick={()=>handleOpen()} style={{ objectFit: 'contain', maxHeight:500, maxwidth:400 }} alt={props.photoParams.ALT} src={adress+"/pictures/" + props.photoParams.LINK}/>: <img src={photo1.href}/>     }
      </div>
    
<Button variant='contained' color="primary" onClick={()=>handleOpen()}>Zmień zdjęcie</Button>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper sx = {descModal}>
        <Grid  container
         direction="column"
  justifyContent="flex-start"
  alignItems="center"
  sx={{ color:'#1976d2'}}>

        <Grid item sx={{padding:3}}>
          Notatka:
    <TextField value={props.photoParams.PICTURE_NOTE}
                     onChange = {(e) => {props.handler('PICTURE_NOTE', e.target.value)}}

        sx={   boxShadows }  inputProps={{style: {  textAlign: 'center', alignItems:'center', color:'#1976d2'}}}
>

</TextField>
    </Grid>

    <Grid item  sx={{padding:3}}>
      Tekst alternatyny:
    < TextField value={props.photoParams.ALT}
                 onChange = {(e) => {props.handler('ALT', e.target.value)}}

        sx={  boxShadows }  inputProps={{style: {  textAlign: 'center', alignItems:'center', color:'#1976d2'}}}
>

</TextField>
    </Grid>

   
    <Grid item  sx={{padding:3}}>
Imię i nazwisko autora zdjęcia:
    <TextField value={props.photoParams.Owner}
             onChange = {(e) => {props.handler('Owner', e.target.value)}}

        sx={  boxShadows }  inputProps={{style: {  textAlign: 'center', alignItems:'center', color:'#1976d2'}}}
>

</TextField>
    </Grid>

    <Grid item  sx={{padding:3}}>

      <form onSubmit={handleUpload}         
>
            <div id="error-message"></div>
            <input
              id="file-upload" 
            name='załaduj plik'
              type="file"
              accept=".png, .jpg, .jpeg, .gif"
              onChange={handleFileChange}
              style={{display: 'none'}}
              required
            />   <label for="file-upload" style={{display: 'block',   boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1), 0px 3px 6px rgba(0, 0, 0, 0.08)',
            background:'#FAF9F6', color:'#1976d2', padding: '10px', cursor: 'pointer'}}>Kliknij tu by dodać plik. </label>
            <button type="submit" style={{ marginTop: '20px',color: '#1976d2', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1), 0px 3px 6px rgba(0, 0, 0, 0.08)',   border:0 ,background: '#FAF9F6', marginLeft: 30}}>Zapisz zmiany</button>          </form> 
          </Grid> 
          </Grid> 
          </Paper>
          </Modal>  
    </>
  )
}

export default FileUploadApp