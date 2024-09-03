import { useEffect, useState, useContext } from 'react'
import { Button, Grid  } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import { useParams } from "react-router-dom";
import { adressContext } from '../Routing';
import Axios from "axios";
import { Navigate, Outlet, useLocation, useNavigate} from  'react-router-dom';
import ReactLoading from "react-loading";
import ItemModal from './SetItem';
import { descModal } from '../styles';
export default function Items(props){
    const [obiekt, setObiekt]=useState({ID_DESC:0,LNG1:"",LNG2:"",LNG3:"",ID_PICTURE:"",ALT:"",NOTE:"",Owner:"",TITLE:"",ID_OBJECT:0 })
const[loaded, SetLoaded] =useState(true)
let {projecttoOpen}  = useParams();
const adress=useContext(adressContext)

    const navigate=useNavigate();
function loading(){
const data=adress+"/php_rest_api/APIS/workersinfo.php?task=getParametrs&type="+props.item.ielement[1]+"&id="+props.item.ielement[0]
    Axios.get(data, {headers:{Authorization: props.user.tempToken+":"+props.user.userId }}).then(
      function (response) {
      if(response.data!='no'){ 
        console.log(response) 
        const fields = projecttoOpen.split('$');

        setObiekt({
          ...response.data,
          PROJ_ID:fields[0]
      })
        SetLoaded(false)
      }else{
        alert('wystąpił błąd przy pobieraniu danych')
        navigate('/loged/Wystawa')
      }

    }).catch(function (error) {
      alert('wystąpił błąd przy pobieraniu danych')
      navigate('/loged/Wystawa')
          })
}





    useEffect(()=>{
      SetLoaded(true)
if(props.item.iopen){
  setTimeout(() => {
    if(props.item.ielement[1]==null){
      console.log(props.item)
        const fields = projecttoOpen.split('$');

setObiekt({PICTURE:{edited:false} ,NOTE:"",TITLE:"",ID:null, edited:false, TYPE:"", PROJ_ID:fields[0], DESC:{LNG1:"", LNG2:"", LNG3:"",edited:false}})
console.log(obiekt)
        SetLoaded(false)

    }else{

      console.log(props.item.ielement)
      loading() }
  },1000)
  }
  },[props.item.ielement])
return(  

<Modal
        open={props.item.iopen}
        onClose={props.handler}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper  sx={descModal} >
        <Grid container justifyContent="center" display='flex' alignItems="center" >
          <Grid item sx={{marginTop:'10%'}}>
       {loaded? <ReactLoading
          type={"spinningBubbles"}
          color={"radial-gradient(circle, rgba(18,6,183,1) 6%, rgba(46,194,255,0.8856792717086834) 89%)"}
          height={180}
          width={180}
        />:<ItemModal obiekt={obiekt} user={props.user} flicker={props.flicker}/>}
</Grid>
</Grid> 
        </Paper>
      </Modal>

)



}