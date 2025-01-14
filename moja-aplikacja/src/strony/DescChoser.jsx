import React, {  useState } from 'react';
import { Button, Grid  } from '@mui/material';
import Paper from '@mui/material/Paper';
import { descPaper } from '../styles';
export default function DescList(props){


    return(
<>
        {props.descList.map((value)=>(
<Paper onClick={()=>{props.handler(value)}}  sx={descPaper} >
{value.LNG1.slice(0, 110)}
</Paper>
        )

        )}
        </>
    )
}
