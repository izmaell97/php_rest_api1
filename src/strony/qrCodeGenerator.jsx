import React, { Component, useState } from 'react';
import Paper from '@mui/material/Paper';
import Modal from '@mui/material/Modal';
import QRCode from "qrcode.react";
import { useContext } from "react";
import { adressContext } from '../Routing';
import QrCodeIcon from '@mui/icons-material/QrCode';
import { Box, Button, Grid } from '@mui/material';
import { modalPaper } from '../styles';

export default function GetQr(props){
    const [openQr, setOpenQr] = useState(false);
const [Qr, setQr] = useState("")
const adress=useContext(adressContext)

const style = modalPaper
const handleOpenQr=(value)=>{
    const temp=adress+'/Zwiedzajacy/'+value
    
  
   setQr(temp)
   setOpenQr(true)
   }
   const handleCloseQr = () =>  setOpenQr(false);
   return(
    <>
    {props.colors?  <Button  sx={{color:"black"}} onClick={()=>handleOpenQr(props.name)}><QrCodeIcon fontSize="large"/></Button> : <Button  onClick={()=>handleOpenQr(props.name)}><QrCodeIcon fontSize="large"/></Button>

 }
                          <Modal
        open={openQr}
        onClose={handleCloseQr}
       
      >
        <Paper  sx={style} >
        <QRCode
    id={Qr}
    value={Qr}
    size={290}
    level={"H"}
    includeMargin={true}
  />,
        </Paper>
      </Modal>
</>
   )
   
}
