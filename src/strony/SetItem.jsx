import React, { Component, useState } from 'react';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { Grid, TextField, Button, Fab } from '@mui/material';
import {PostObjectOrRoom} from './axiosPost'

import PicModal from './pic2'
import DescModal from './descSearch';
import { updateObjectOrRoom } from './axiosPut';
import { boxshadow2, boxShadows } from '../styles';
export default function ItemModal(props){
const[obiect, setObiect]=useState(props.obiekt)
const [edit, setEdit]=useState({title:false, desc:false, pic:false})
const editing=(name)=>{
  setEdit((prevState)=>({
    ...prevState,
[name]:true
}))
}
const[photo, setPhoto]=useState(null)
const dowloadphotoProperty = ( link) => {
  setObiect((prevState) => ({
    ...prevState, 
    PICTURE:{
      ...prevState.PICTURE,
      LINK:link
    }
  }));
  editing("pic")
};
const refresher=()=>{
  setEdit({title:false, desc:false, pic:false})
}
const updateProperty = (propertyName, newValue) => {
    setObiect((prevState) => ({
      ...prevState, 
      [propertyName]: newValue, 
    }));
    editing("title")

  };
  const updatePhotoProperty = (propertyName, newValue) => {
    setObiect((prevState) => ({
      ...prevState, 
      PICTURE:{
        ...prevState.PICTURE,
        [propertyName]: newValue, 
      }
    }));
    editing("pic")

  };
  const updateDescProperty = (propertyName, newValue) => {
    setObiect((prevState) => ({
      ...prevState, 
      DESC:{
        ...prevState.DESC,
        [propertyName]: newValue, 
      }
    }));
    console.log(obiect)
    editing("desc")

  };
  const handleDowloadDesc = (text) => {
    setObiect((prevState) => ({
      ...prevState, 
      DESC:{
        ...prevState.DESC,
        LNG1:text.LNG1,
        LNG2:text.LNG2,
        LNG3:text.LNG3
      }
      
    }));     
    editing("desc")
   };
    
return(
<Grid container direction="column"
  justifyContent="flex-start"
  alignItems="center"
  sx={{ color:'#1976d2'}}
 >
        <Grid item xs={12} sx={{padding:3}}>

                <PicModal  user={props.user} photo={photo} setPhoto={setPhoto} photoParams ={obiect.PICTURE}  handler={updatePhotoProperty} handlerGalery={dowloadphotoProperty}/>
</Grid>
<Grid item xs={12} >
tytuł
</Grid>
    <Grid item xs={12} sx={{padding:3}}>

        <TextField  
         onChange = {(e) => {updateProperty('TITLE', e.target.value)}}
          sx={  boxShadows}  inputProps={{style: {  textAlign: 'center', alignItems:'center', color:'#1976d2'}}}
value={obiect.TITLE}></TextField>

    </Grid>
    <Grid item xs={12}  sx={{padding:3}}>
    <FormControl fullWidth  sx={   boxShadows} >
    <InputLabel  sx={{ color:'#1976d2'}}variant="standard" htmlFor="uncontrolled-native">
          Typ:
        </InputLabel>
        <NativeSelect
          value={obiect.TYPE}
          inputProps={{
            name: 'Type',
            id: 'select-label',
            color:'#1976d2'
        }}
        onChange = {(e) => {updateProperty('TYPE', e.target.value)}}

        style={{ color:'#1976d2'}}
        >
          <option style={{ color:'#1976d2'}} value={null}> Wybierz Typ</option>
          <option style={{ color:'#1976d2'}} value={"room"}>sala</option>
          <option style={{ color:'#1976d2'}} value={"object"}>Eksponat</option>
        </NativeSelect>
      </FormControl>
      </Grid>
      <DescModal user={props.user} handler={handleDowloadDesc} />
      <Grid item  sx={{padding:3}}>
        Opis, Język 1
      <TextField  multiline
       onChange = {(e) => {updateDescProperty('LNG1', e.target.value)}}
      sx={boxshadow2}
      inputProps={{style: {  alignItems:'center', color:'#1976d2'}}}
          rows={20}
          value={obiect.DESC.LNG1&& obiect.DESC.LNG1}
          />
    </Grid>
    <Grid item  sx={{padding:3}}>
    Opis, Język 2

      <TextField  multiline
        onChange = {(e) => {updateDescProperty('LNG2', e.target.value)}}
      sx={boxshadow2}
      inputProps={{style: {  alignItems:'center', color:'#1976d2'}}}
          rows={20}
          value={obiect.DESC.LNG2}
          />
    </Grid>
    <Grid item  sx={{padding:3}}>
    Opis, Język 3
      <TextField  multiline
              onChange = {(e) => {updateDescProperty('LNG3', e.target.value)}}

      sx={boxshadow2}
      inputProps={{style: {  alignItems:'center', color:'#1976d2'}}}
          rows={20}
          value={obiect.DESC.LNG3}
          />
    </Grid>

    <Grid item  sx={{padding:3}}>
    <div>notatka: 
    </div>
      <TextField  multiline
              onChange = {(e) => {updateProperty('NOTE', e.target.value)}}

      sx={boxshadow2}
      inputProps={{style: {  alignItems:'center', color:'#1976d2'}}}
          rows={10}
          value={obiect.NOTE}
          />
    </Grid>
    <Grid item>
      {props.obiekt.ID?
      <Button onClick={()=>{
        updateObjectOrRoom(props.user, photo, obiect.TITLE, obiect.DESC, obiect.PICTURE,  obiect.ID, props.flicker, obiect.NOTE, obiect.TYPE, edit, refresher )

      }} >Zaktualizuj</Button>:

      
      <Button onClick={()=>{
        PostObjectOrRoom(props.user, photo, obiect.TITLE, obiect.DESC, obiect.NOTE, obiect.TYPE, obiect.PICTURE, obiect.PROJ_ID, props.flicker)

      }} >Prześlij</Button>
    }
    </Grid>



</Grid>


)

}
