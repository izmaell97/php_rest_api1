import React from "react";
import { useContext } from "react";
import { Grid } from "@mui/material";
import Paper from '@mui/material/Paper';
import CountryFlag from 'react-country-flag';
import { adressContext } from "../Routing";
import Typography from '@mui/material/Typography';
import TextUser from "./userText";
export default function UserPage(props){
    const adress=useContext(adressContext)

return(
    <>
    <Grid container direction="column"   minWidth='100%'   sx={ { minHeight:'88vh',background:' radial-gradient(circle, rgba(107,112,112,1) 29%, rgba(93,107,137,1) 77%)'
}}>
        <Grid item>
        <Paper elevation={3}   sx={ { minHeight:10, marginBottom: 3, padding: 10, background:'linear-gradient(135deg, rgba(199,215,223,0.2) 29%, rgba(151,163,188,0.2) 77%);'}}>

<Grid container direction="row"      justifyContent="space-around"

  alignItems="center">

<Grid item>
<img  style={{ objectFit: 'contain', maxHeight:500, maxwidth:400 }} alt={props.data.ALT} src={adress+ props.data.LINK}/>
</Grid>

<Grid item sx={{color:'#FAF9F6',textAlign:"center",  textShadow:'1px 0 5px black', fontSize:'200%'}}>
{props.data.nazwa}
</Grid>

</Grid>
</Paper>
        </Grid>
        <Grid item xs={12}>
            <TextUser jezyk="Opis Po Polsku" lngCode="PL" text={props.data.jezyk1}></TextUser>
        </Grid>
        <Grid item xs={12}>
            <TextUser jezyk="Description In English" lngCode="GB" text={props.data.jezyk2}></TextUser>
        </Grid>
        <Grid item xs={12}>
            <TextUser jezyk="Deutsche Beschreibung" lngCode="DE" text={props.data.jezyk3}></TextUser>
        </Grid>


     
       

    </Grid>
    </>
)
}