import React, {  useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Grid, Tooltip } from '@mui/material';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@mui/material/Modal';
import PicModal from './pic2';
import GetQr from './qrCodeGenerator';
import AddWorkers from './addWorkerToProject';
import Fade from '@mui/material/Fade';
import Items from './item';
import DescModal from './descSearch.jsx';
import NotInterestedOutlinedIcon from '@mui/icons-material/NotInterestedOutlined';
import {PostProject} from './axiosPost.jsx'
import { useNavigate } from 'react-router-dom';
import { updateProject } from './axiosPut.jsx';
import { addworkerPlate, backGround, blueplate, buttonPanel, modalPaper, openPanel2, openPaper, projPanel } from '../styles.jsx';
export default function Projfull(props){
    const [Title, setTitile]=useState(props.project.project.EX_NAME)
    const [edit, setEdit]=useState({title:false, desc:false, pic:false})
    const [PhotoParams, setPhotoParams]=useState({LINK: props.project.project.LINK,  ALT: props.project.project.ALT, ID_PICTURE:props.project.project.ID_PICTURE, PICTURE_NOTE: props.project.project.PICTURE_NOTE, Owner:props.project.project.Owner, Downloaded: false})
    const [file, setFile] = useState(null);
    const [Desc, setDesc]=useState({ID_DESC:props.project.project.ID_DESC, LNG1:props.project.project.LNG1,LNG2: props.project.project.LNG2, LNG3:props.project.project.LNG3,})
    const [open, setOpen] = useState(false);
    const navigate=useNavigate();
    const[openItem, setOpenItem]=useState({iopen:false, ielement:null});
    const editing=(name)=>{
      setEdit((prevState)=>({
        ...prevState,
[name]:true
}))
    }
    const reset=()=>{
      setEdit({title:false, desc:false, pic:false})
    }
    const hanOpen=(elementid, elementType)=>{ 
setOpenItem({iopen:true, ielement:[elementid,elementType]})
    }
    const handleFileChange = (e) => {
        setFile(e);
      
    };
    const handleDowloadDesc = (text) => {
      editing("desc")

setDesc((prevState)=>({
  ...prevState,
LNG1:text.LNG1,
LNG2:text.LNG2,
LNG3:text.LNG3
}))
    }


    const handleIClose=()=>{
     setOpenItem({
      // Spread the previous state
      iopen: false, // Toggle the iopen property
      ielement: [null, null]
    });
    }

    const [edited, setEdited]=useState({dataedit:0, numberedit:0});
    
    const handleOpen=(data, number)=>{ 
        setEdited({dataedit:data, numberedit:number});
        setOpen(true) 
    } ;
    const setDescriptions=()=>{
      editing("desc")
      setDesc((prevState)=>({
        ...prevState, 
[edited.numberedit]: edited.dataedit
      }))
        setOpen(false)
    }
    const updateProperty = (propertyName, newValue) => {
      editing("pic")
      setPhotoParams((prevState) => ({
        ...prevState, 
        [propertyName]: newValue, 
      }));
    };
    const dowloadphotoProperty = (  link) => {
      editing("pic")
      setPhotoParams((prevState) => ({
        ...prevState, 
        
        LINK: link, 
        Downloaded:true
      }));
      console.log(link)
    };
    const handleClose = () => setOpen(false);
   

    return (
        <>
        <Box  width={'100%'} sx={backGround}>
 <Grid  container alignItems="flex-end" direction="column" height={'100%'} sx={{background:backGround.background}}>
     <Grid item  sx={{ width:'100%'}}  > 
     <Paper    square={false} border={7} sx={openPanel2}> 

        <Grid container   alignItems="center"  sx={{ width:'100%'}}   justifyContent="space-between"  direction="row" >

          <Grid item >
            <PicModal photo={file}  setPhoto={handleFileChange} photoParams={PhotoParams} handler={updateProperty} handlerGalery={dowloadphotoProperty} user={props.user}/>
          </Grid>

            <Grid item sx={{ width:'40%'}}>
                    <TextField sx={{background:'#56aed2' ,width:480}}  inputProps={{style: {fontSize: "200%",  alignItems:'center', color:'white'}}} value={Title} onChange = {(e) => { editing("title")
                        setTitile(e.target.value)
                      }}            helperText="Tytuł"
                      />
               
            </Grid>

            <Grid item sx={{ width:'30%'}} >
        <Grid container justifyContent="space-between"  direction="column" >
            <Grid item sx={{color:'white'}}>
                      {Desc.LNG1? Desc.LNG1.slice(0, 50):""}
                      ...

                      <Button onClick={()=>handleOpen(Desc.LNG1,"LNG1")}>Więcej</Button>
            </Grid>
            <Grid item sx={{color:'white'}}>
            {Desc.LNG2? Desc.LNG2.slice(0, 50):""}
            ...
                      <Button  onClick={()=>handleOpen(Desc.LNG2,"LNG2")}>Więcej</Button>
                </Grid>
                <Grid item sx={{color:'white'}}>
                {Desc.LNG3? Desc.LNG3.slice(0, 50):""}
                ...

                      <Button  onClick={()=>handleOpen(Desc.LNG3,"LNG3")}>Więcej</Button>
                </Grid>
                <Grid item >
                  <DescModal  handler={handleDowloadDesc} user={props.user}></DescModal>
                </Grid>

        </Grid>
                      
               
            </Grid>

        </Grid>
        </Paper>    
        </Grid>
                      <Grid item>
<GetQr name={props.project.project.ID_DESC} colors={false} />
{props.project.project.ID_PROJECTS==null?
                        <Button variant="contained" color="primary" onClick={()=>{PostProject( props.user, file, Title,Desc, PhotoParams, navigate )}}>Zapisz Projekt</Button>:
                        <Button variant="contained" color="primary" onClick={()=>{updateProject( props.user, file, Title,Desc, PhotoParams, props.project.project.ID_PROJECTS, props.reloader, edit, reset)}}>Zatwiedź zmiany</Button>
}
                      </Grid>
                      <Grid item sx={{ width:'100%'}} >
                      <Paper    square={false} border={7} sx={projPanel}> 

<Grid container direction="row"   
  justifyContent="center"

  >
    <Grid item xs={6} sx={{  borderRight: '3px solid', borderLeft:'3px solid' }} >
<Paper elevation={3} sx={openPaper}>
Obiekty:
</Paper>

    <List >
     {!!props.project.project.ID_PROJECTS?
    <ListItem
            key='add'
           
          >
            
            <Paper elevation={3}   sx={blueplate} 
        >
      
            <ListItemText primaryTypographyProps={{ color:'#FAF9F6'}} primary={'Dodaj nowy element'} />
         </Paper>
  
         <Paper elevation={3}   sx={buttonPanel} 
      >
        <AddIcon   onClick={()=>{
          hanOpen(null, null);

        }} sx={{color:'#FAF9F6'}}></AddIcon>
         </Paper>
          </ListItem>
          :null}

{props.project.objects.map((value) => (
          
          <ListItem
            key={value.nazwa}
           
          >
            <Tooltip TransitionComponent={Fade}
  TransitionProps={{ timeout: 600 }}
 title={ value.tab=="room"?"sala":"eksponat"}>
            <Paper elevation={3}   sx={blueplate} 
      >
      
            <ListItemText primaryTypographyProps={{ color:'#FAF9F6'}} primary={`${value.nazwa}`} />
          
             
           
         </Paper>
         </Tooltip>
         {value.WORKED_ON? 
         <Paper elevation={3}   sx={addworkerPlate} 
      >
     
       <EditIcon   onClick={()=>{
          hanOpen(value.ID, value.tab)
          console.log(value)

        }}  sx={{color:'#FAF9F6'}}></EditIcon>
     
        <DeleteIcon  sx={{color:'#FAF9F6'}} onClick={()=>{props.del(value.ID,value.tab)}}></DeleteIcon>
        <GetQr name={value.ID} color='true'/>
         </Paper>:
                  <Paper elevation={3}   sx={addworkerPlate}  ><NotInterestedOutlinedIcon fontSize="large" color="disabled"></NotInterestedOutlinedIcon></Paper>}

          </ListItem>
        ))}
</List>

    </Grid>
    <Grid item xs={6}>
    <Paper elevation={3} sx={openPaper}>
Pracownicy:
</Paper>
    <List >

{(props.project.creatorCheck||props.user.isadmin)&&!!props.project.project.ID_PROJECTS?
<ListItem
            key='add1'
           
          >
            
            <Paper elevation={3}     sx={blueplate} 
        >
      
            <ListItemText primaryTypographyProps={{ color:'#FAF9F6'}} primary={'Dodaj nowy element'} />
            </Paper>
            <AddWorkers project={props.project.project.ID_PROJECTS} flicker= {props.reloader} user={props.user}/>
          </ListItem>:null}

{props.project.workers.map((value) => (
          
          <ListItem
            key={value.NAM}
           
          >
            
            <Paper elevation={3}    sx={blueplate} 
        >
      
            <ListItemText primaryTypographyProps={{ color:'#FAF9F6'}} primary={`${value.NAM } ${value.SURNAME}`} />
         </Paper>
         {(props.project.creatorCheck||props.user.isadmin)?
         <Paper elevation={3}    sx={addworkerPlate} 
        onClick={()=>{props.delUser(value.ID_WORKERS)}}
      >
        
        <DeleteIcon  sx={{color:'#FAF9F6'}} ></DeleteIcon>
         </Paper>:null}
          </ListItem>
        ))}
</List>
    </Grid>
</Grid>
</Paper>
                      </Grid>

        </Grid>
        </Box>

        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper  sx={modalPaper} >
            wprowadź opis
      <TextField sx={{ width:'80vh'}}  multiline
      inputProps={{style: {  alignItems:'center', color:'#1976d2'}}}
          rows={10} value={edited.dataedit} onChange = {(e) => {
        const tempstat={dataedit:e.target.value, numberedit:edited.numberedit}
        setEdited(tempstat)}}/>
      <Button  onClick={()=>setDescriptions()} >Zapisz zmiany</Button>
        </Paper>
      </Modal>
      <Items item={openItem} user={props.user} flicker= {props.reloader} handler={handleIClose}/>

      
      
        </>
    );
}
