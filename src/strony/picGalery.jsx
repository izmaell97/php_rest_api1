import { useState } from 'react'
import Paper from '@mui/material/Paper';
import { adressContext } from '../Routing';
import { useContext } from "react";

import Grid from '@mui/material/Grid';
export default function GaleryModal(props){
  const adress=useContext(adressContext)

return(
<Grid 
  container
  direction="row"
  justifyContent="flex-start"
  alignItems="flex-start"
>

    {props.galery.map((value)=>(

<Grid item>
<Paper elevation={3} sx={{ margin:2}} onClick={()=>{
  props.handler( adress+value.LINK)
  props.exit()
}}>
<img src={adress+value.LINK}  style={{ objectFit: 'contain', maxHeight:160}}></img>

</Paper>

</Grid>

    )
    )}
</Grid>)

}
