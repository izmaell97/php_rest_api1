import React from "react";
import ReactLoading from "react-loading";
import { Box, Grid } from "@mui/material";
import { backGround } from "../styles";
export default function Wait(){
    return(
        <Box   sx={backGround} >
        <Grid container justifyContent="center" display='flex' alignItems="center" >
          <Grid item sx={{marginTop:'10%'}}>
        <ReactLoading
          type={"spinningBubbles"}
          color={"radial-gradient(circle, rgba(18,6,183,1) 6%, rgba(46,194,255,0.8856792717086834) 89%)"}
          height={180}
          width={180}
        />
</Grid>
</Grid>
        </Box>
    )
}