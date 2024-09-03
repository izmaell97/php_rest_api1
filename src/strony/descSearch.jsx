import React, {  useState } from 'react';
import { Button, Grid, TextField  } from '@mui/material';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import { Navigate, Outlet, useLocation, useNavigate} from  'react-router-dom';
import { adressContext } from '../Routing.jsx';
import InputAdornment from '@mui/material/InputAdornment';
import Axios from "axios";
import { useContext } from "react";
import DescList from "./DescChoser.jsx"
import { boxShadows, descModal } from '../styles.jsx';
export default function DescModal(props){
const[DescGeted, SetDescGeted]= useState(null);
const navigate=useNavigate();
const adress=useContext(adressContext)

    const[open, SetOpen] =useState(false)
    const[filter, setFilter] =useState({text:"", searchInArc:false})
    const updateProperty = (propertyName, newValue) => {
        setFilter((prevState) => ({
          ...prevState, 
          [propertyName]: newValue, 
        }));
      };
  
      const handleClose = ()=> SetOpen(false);
      const handleOpen = ()=>  SetOpen(true);

    function loading(){
   
var data= adress+"/php_rest_api/APIS/workersinfo.php?task=searchDesc&ifArc="+filter.searchInArc+"&element="+filter.text

Axios.get(data,  {headers:{Authorization: props.user.tempToken+":"+props.user.userId }}).then(

    function (response) {
      if(response.data!='error'){  
        console.log(response.data)
        SetDescGeted(response.data)
      }else{
        alert('wystąpił błąd przy pobieraniu danych')
        handleClose()
      }

    }).catch(function (error) {
      alert('wystąpił błąd przy pobieraniu danych')
      navigate('/loged/Wystawa')
          }
  )
    } 
      const handler2=(value)=>{
        props.handler(value)
        handleClose()
      }
return(
    <>
<IconButton color="primary"
onClick={()=>handleOpen()}>
    <SearchIcon></SearchIcon>
</IconButton>


<Modal
open={open}
onClose={handleClose}
aria-labelledby="modal-modal-title"
aria-describedby="modal-modal-description"
>
<Paper sx={descModal}>
<TextField
      value={filter.text}
      onChange = {(e) => {
updateProperty("text",  e.target.value)
    }}  
    sx={   boxShadows }  inputProps={{style: {  textAlign: 'center', alignItems:'center', color:'#1976d2'}}}

        label="wyszukaj opis"
        InputProps={{
          startAdornment: (
            <InputAdornment color="primary" position="start">
              <SearchIcon  />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
        Archiwum:
<Checkbox value={filter.searchInArc} onChange={()=>{updateProperty("searchInArc", !filter.searchInArc)}}></Checkbox>
<Button color="primary" onClick={()=>{loading()}}>przeszukaj</Button>
<div><hr/> </div>
{DescGeted&& <DescList descList={DescGeted} handler={handler2}/>}
</Paper>


    </Modal>
    </>
)


}