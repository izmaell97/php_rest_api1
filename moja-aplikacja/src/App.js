import './App.css';
import  React  from 'react';
import Routing from './Routing';
import { Grid } from '@mui/material';

function App() {

  /*const [stan,SetStan]=useState(['elem', 'el2', 'el', 'prwa', 'gołomp', 'element', 'element2', 'element3', 'element4', 'element5'])
  const [userlist,SetUserlist]=useState([{nam:'jan', first_nam: 'banach', login: 'jBanach' },{nam:'adam', first_nam:'nowak', login:'aNowak'},{nam: 'elżebieta', first_nam: 'kowalska',login: 'eKowalska'},{nam:'jakub', first_nam: 'kowalczyk', login: 'jKowalczyk'},{nam:'dominik', first_nam: 'element', login:'dElement'}, {nam: 'kondrad', first_nam:'walenrod', login:'kWalenrod'}])
  
  const [objlist,SetObjlist]=useState(['obiekt1', 'obiekt2', 'obiekt3', 'sala1', 'sala2', 'element', 'element2', 'element3', 'element4', 'element5'])
const tytul="tytul"
const desc= { desc1:'aaaaaaa \n \ nowa linia tekstu \n \ tak działa mafia',
desc2:'aaaaaaa \n \ new line of text \n \ this is how the mafia works',
desc3: 'aaaaaaa \n \ neue Textzeile \n \ so funktioniert die Mafia'

}
const user= {
  id: '1',
  nam:'banach',
  first_nam: 'adam',
  userNam: 'username',
  password: 'password'
}
const usertoCreate= {
  id: '',
  nam:'',
  first_nam: '',
  userNam: '',
  password: 'haslo'
}
const [doesCreate, setDoesCreate]= useState(true)
<Route path='/' element={<Project list={stan}/>}/>
   <Route path='/cos' element={<Projfull tytul={tytul}  desc={desc} object={objlist}/>}/>
   <Route path='/cos2' element={<FileUploadApp/>}/>
   <Route path='/cos3' element={<ChangeData user={doesCreate? usertoCreate: user}   doesCreate={doesCreate}/>}/>
   <Route path='/cos4' element={<Reset users={userlist}/>}/>
*/
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
