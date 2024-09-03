import './App.css';
import  React  from 'react';
import Routing from './Routing';
import { Grid } from '@mui/material';

function App() {

 
  return (
    <>
    <Grid container
  direction="Column"
  justifyContent="space-around"
  alignItems="stretch"
  >
      <h1> Tu znajduje się miejsce na twoje logo </h1>
     <Routing/>
    </Grid>

   </>
  );
}

export default App;
