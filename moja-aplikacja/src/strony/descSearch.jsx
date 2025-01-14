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
      /*
      const data1=[
        {
            "ID_DESC": 48,
            "LNG1": "Pomnik konny Jana III\r\nartysta nieznany\r\nok. 1693\r\nTo najbardziej symboliczne dzieło „ku pamięci” zwycięskiej\r\nbitwy pod Wiedniem, rozegranej 12 września 1683. Pomnik\r\nlegenda\r\njana iii\r\nzostał wzniesiony z polecenia króla w 10. rocznicę wydarzeń. Pierwotnie zdobił Wielką Sień pałacu wilanowskiego – centralne, najważniejsze wnętrze rezydencji, by każdy przybywający do Wilanowa już\r\nod progu wiedział, że znalazł się w domu wielkiego bohatera. Tym\r\ngestem Sobieski nadał kierunek legendzie, która poczęła rozwijać\r\nsię własnym rytmem, nie zawsze podążając ścieżkami wytyczonymi\r\nprzez monarchę. Podobny pomnik, wyobrażający Jana III jako zbawcę chrześcijaństwa, miał stanąć w atrium Bazyliki Świętego Piotra\r\nw Watykanie, naprzeciwko monumentu cesarza Konstantyna.",
            "LNG2": "Equestrian statue of Jan III\r\nartist unknown\r\ncirca 1693\r\nThis is the most symbolic work \"in memory\" of the winner\r\nBattle of Vienna, fought on September 12, 1683. Monument\r\nlegend\r\nJohn III\r\nit was erected by order of the king on the 10th anniversary of the events. Originally, it decorated the Grand Hall of the Wilanów Palace - the central, most important interior of the residence, so that everyone coming to Wilanów\r\nfrom the threshold he knew that he was in the house of a great hero. Tim\r\nWith his gesture, Sobieski gave direction to the legend that began to develop\r\nat your own pace, not always following the marked paths\r\nby the monarch. A similar monument, depicting John III as the savior of Christianity, was to be erected in the atrium of St. Peter's Basilica\r\nin the Vatican, opposite the monument of Emperor Constantine.",
            "LNG3": "Reiterstatue von Jan III\r\nKünstler unbekannt\r\num 1693\r\nDies ist das symbolträchtigste Werk „im Gedenken“ an den Gewinner\r\nSchlacht bei Wien, ausgetragen am 12. September 1683. Denkmal\r\nLegende\r\nJohannes III\r\nEs wurde im Auftrag des Königs zum 10. Jahrestag der Ereignisse errichtet. Ursprünglich schmückte es den Großen Saal des Wilanów-Palastes – den zentralen und wichtigsten Innenraum der Residenz, damit jeder, der nach Wilanów kommt\r\nVon der Schwelle an wusste er, dass er sich im Haus eines großen Helden befand. Tim\r\nMit seiner Geste gab Sobieski der Legende, die sich zu entwickeln begann, die Richtung vor\r\nGehen Sie in Ihrem eigenen Tempo und folgen Sie nicht immer den markierten Wegen\r\nvom Monarchen. Ein ähnliches Denkmal, das Johannes III. als Retter des Christentums darstellt, sollte im Atrium des Petersdoms errichtet werden\r\nim Vatikan, gegenüber dem Denkmal Kaiser Konstantins."
        },
        {
            "ID_DESC": 49,
            "LNG1": "Wystawy artefaktów z grobowca Tutanchamona odbywały się w muzeach w kilku krajach, zwłaszcza w Wielkiej Brytanii, Związku Radzieckim, Stanach Zjednoczonych, Kanadzie, Japonii i Francji.\r\n\r\nArtefakty wzbudziły szerokie zainteresowanie w starożytnym Egipcie, kiedy odkryto je w latach 1922–1927, ale większość z nich pozostawała w Muzeum Egipskim w Kairze aż do lat 60. XX wieku, kiedy to po raz pierwszy wystawiono je poza Egiptem.\r\nDzięki tym wystawom relikty z grobowca Tutanchamona należą do najczęściej podróżowanych artefaktów na świecie. Prawdopodobnie najbardziej znaną trasą była „Skarby Tutanchamona” trwająca od 1972 do 1981 roku.",
            "LNG2": "Exhibitions of artifacts from the tomb of Tutankhamun have been held at museums in several countries, notably the United Kingdom, Soviet Union, United States, Canada, Japan, and France.\r\n\r\nThe artifacts had sparked widespread interest in ancient Egypt when they were discovered between 1922 and 1927, but most of them remained in the Egyptian Museum in Cairo until the 1960s, when they were first exhibited outside of Egypt.\r\nBecause of these exhibitions, relics from the tomb of Tutankhamun are among the most travelled artifacts in the world. Probably the best-known tour was the Treasures of Tutankhamun from 1972 until 1981.",
            "LNG3": "Ausstellungen mit Artefakten aus dem Grab von Tutanchamun fanden in Museen in mehreren Ländern statt, insbesondere im Vereinigten Königreich, in der Sowjetunion, in den Vereinigten Staaten, Kanada, Japan und Frankreich.\r\n\r\nDie Artefakte hatten großes Interesse im alten Ägypten geweckt, als sie zwischen 1922 und 1927 entdeckt wurden. Die meisten von ihnen blieben jedoch bis in die 1960er Jahre im Ägyptischen Museum in Kairo, als sie erstmals außerhalb Ägyptens ausgestellt wurden.\r\nAufgrund dieser Ausstellungen gehören Relikte aus dem Grab von Tutanchamun zu den am häufigsten bereisten Artefakten der Welt. Die wohl bekannteste Tour war die „Schätze des Tutanchamun“ von 1972 bis 1981."
        }
    ]
    const data2=
      [
        {
            "ID_DESC": 48,
            "LNG1": "Pomnik konny Jana III\r\nartysta nieznany\r\nok. 1693\r\nTo najbardziej symboliczne dzieło „ku pamięci” zwycięskiej\r\nbitwy pod Wiedniem, rozegranej 12 września 1683. Pomnik\r\nlegenda\r\njana iii\r\nzostał wzniesiony z polecenia króla w 10. rocznicę wydarzeń. Pierwotnie zdobił Wielką Sień pałacu wilanowskiego – centralne, najważniejsze wnętrze rezydencji, by każdy przybywający do Wilanowa już\r\nod progu wiedział, że znalazł się w domu wielkiego bohatera. Tym\r\ngestem Sobieski nadał kierunek legendzie, która poczęła rozwijać\r\nsię własnym rytmem, nie zawsze podążając ścieżkami wytyczonymi\r\nprzez monarchę. Podobny pomnik, wyobrażający Jana III jako zbawcę chrześcijaństwa, miał stanąć w atrium Bazyliki Świętego Piotra\r\nw Watykanie, naprzeciwko monumentu cesarza Konstantyna.",
            "LNG2": "Equestrian statue of Jan III\r\nartist unknown\r\ncirca 1693\r\nThis is the most symbolic work \"in memory\" of the winner\r\nBattle of Vienna, fought on September 12, 1683. Monument\r\nlegend\r\nJohn III\r\nit was erected by order of the king on the 10th anniversary of the events. Originally, it decorated the Grand Hall of the Wilanów Palace - the central, most important interior of the residence, so that everyone coming to Wilanów\r\nfrom the threshold he knew that he was in the house of a great hero. Tim\r\nWith his gesture, Sobieski gave direction to the legend that began to develop\r\nat your own pace, not always following the marked paths\r\nby the monarch. A similar monument, depicting John III as the savior of Christianity, was to be erected in the atrium of St. Peter's Basilica\r\nin the Vatican, opposite the monument of Emperor Constantine.",
            "LNG3": "Reiterstatue von Jan III\r\nKünstler unbekannt\r\num 1693\r\nDies ist das symbolträchtigste Werk „im Gedenken“ an den Gewinner\r\nSchlacht bei Wien, ausgetragen am 12. September 1683. Denkmal\r\nLegende\r\nJohannes III\r\nEs wurde im Auftrag des Königs zum 10. Jahrestag der Ereignisse errichtet. Ursprünglich schmückte es den Großen Saal des Wilanów-Palastes – den zentralen und wichtigsten Innenraum der Residenz, damit jeder, der nach Wilanów kommt\r\nVon der Schwelle an wusste er, dass er sich im Haus eines großen Helden befand. Tim\r\nMit seiner Geste gab Sobieski der Legende, die sich zu entwickeln begann, die Richtung vor\r\nGehen Sie in Ihrem eigenen Tempo und folgen Sie nicht immer den markierten Wegen\r\nvom Monarchen. Ein ähnliches Denkmal, das Johannes III. als Retter des Christentums darstellt, sollte im Atrium des Petersdoms errichtet werden\r\nim Vatikan, gegenüber dem Denkmal Kaiser Konstantins."
        },
        {
            "ID_DESC": 49,
            "LNG1": "Wystawy artefaktów z grobowca Tutanchamona odbywały się w muzeach w kilku krajach, zwłaszcza w Wielkiej Brytanii, Związku Radzieckim, Stanach Zjednoczonych, Kanadzie, Japonii i Francji.\r\n\r\nArtefakty wzbudziły szerokie zainteresowanie w starożytnym Egipcie, kiedy odkryto je w latach 1922–1927, ale większość z nich pozostawała w Muzeum Egipskim w Kairze aż do lat 60. XX wieku, kiedy to po raz pierwszy wystawiono je poza Egiptem.\r\nDzięki tym wystawom relikty z grobowca Tutanchamona należą do najczęściej podróżowanych artefaktów na świecie. Prawdopodobnie najbardziej znaną trasą była „Skarby Tutanchamona” trwająca od 1972 do 1981 roku.",
            "LNG2": "Exhibitions of artifacts from the tomb of Tutankhamun have been held at museums in several countries, notably the United Kingdom, Soviet Union, United States, Canada, Japan, and France.\r\n\r\nThe artifacts had sparked widespread interest in ancient Egypt when they were discovered between 1922 and 1927, but most of them remained in the Egyptian Museum in Cairo until the 1960s, when they were first exhibited outside of Egypt.\r\nBecause of these exhibitions, relics from the tomb of Tutankhamun are among the most travelled artifacts in the world. Probably the best-known tour was the Treasures of Tutankhamun from 1972 until 1981.",
            "LNG3": "Ausstellungen mit Artefakten aus dem Grab von Tutanchamun fanden in Museen in mehreren Ländern statt, insbesondere im Vereinigten Königreich, in der Sowjetunion, in den Vereinigten Staaten, Kanada, Japan und Frankreich.\r\n\r\nDie Artefakte hatten großes Interesse im alten Ägypten geweckt, als sie zwischen 1922 und 1927 entdeckt wurden. Die meisten von ihnen blieben jedoch bis in die 1960er Jahre im Ägyptischen Museum in Kairo, als sie erstmals außerhalb Ägyptens ausgestellt wurden.\r\nAufgrund dieser Ausstellungen gehören Relikte aus dem Grab von Tutanchamun zu den am häufigsten bereisten Artefakten der Welt. Die wohl bekannteste Tour war die „Schätze des Tutanchamun“ von 1972 bis 1981."
        },
        {
          "ID_DESC": 49,
          "LNG1": "Wystawy artefaktów z grobowca Tutanchamona odbywały się w muzeach w kilku krajach, zwłaszcza w Wielkiej Brytanii, Związku Radzieckim, Stanach Zjednoczonych, Kanadzie, Japonii i Francji.\r\n\r\nArtefakty wzbudziły szerokie zainteresowanie w starożytnym Egipcie, kiedy odkryto je w latach 1922–1927, ale większość z nich pozostawała w Muzeum Egipskim w Kairze aż do lat 60. XX wieku, kiedy to po raz pierwszy wystawiono je poza Egiptem.\r\nDzięki tym wystawom relikty z grobowca Tutanchamona należą do najczęściej podróżowanych artefaktów na świecie. Prawdopodobnie najbardziej znaną trasą była „Skarby Tutanchamona” trwająca od 1972 do 1981 roku.",
          "LNG2": "Exhibitions of artifacts from the tomb of Tutankhamun have been held at museums in several countries, notably the United Kingdom, Soviet Union, United States, Canada, Japan, and France.\r\n\r\nThe artifacts had sparked widespread interest in ancient Egypt when they were discovered between 1922 and 1927, but most of them remained in the Egyptian Museum in Cairo until the 1960s, when they were first exhibited outside of Egypt.\r\nBecause of these exhibitions, relics from the tomb of Tutankhamun are among the most travelled artifacts in the world. Probably the best-known tour was the Treasures of Tutankhamun from 1972 until 1981.",
          "LNG3": "Ausstellungen mit Artefakten aus dem Grab von Tutanchamun fanden in Museen in mehreren Ländern statt, insbesondere im Vereinigten Königreich, in der Sowjetunion, in den Vereinigten Staaten, Kanada, Japan und Frankreich.\r\n\r\nDie Artefakte hatten großes Interesse im alten Ägypten geweckt, als sie zwischen 1922 und 1927 entdeckt wurden. Die meisten von ihnen blieben jedoch bis in die 1960er Jahre im Ägyptischen Museum in Kairo, als sie erstmals außerhalb Ägyptens ausgestellt wurden.\r\nAufgrund dieser Ausstellungen gehören Relikte aus dem Grab von Tutanchamun zu den am häufigsten bereisten Artefakten der Welt. Die wohl bekannteste Tour war die „Schätze des Tutanchamun“ von 1972 bis 1981."
      },
      {
        "ID_DESC": 49,
        "LNG1": "Wystawy artefaktów z grobowca Tutanchamona odbywały się w muzeach w kilku krajach, zwłaszcza w Wielkiej Brytanii, Związku Radzieckim, Stanach Zjednoczonych, Kanadzie, Japonii i Francji.\r\n\r\nArtefakty wzbudziły szerokie zainteresowanie w starożytnym Egipcie, kiedy odkryto je w latach 1922–1927, ale większość z nich pozostawała w Muzeum Egipskim w Kairze aż do lat 60. XX wieku, kiedy to po raz pierwszy wystawiono je poza Egiptem.\r\nDzięki tym wystawom relikty z grobowca Tutanchamona należą do najczęściej podróżowanych artefaktów na świecie. Prawdopodobnie najbardziej znaną trasą była „Skarby Tutanchamona” trwająca od 1972 do 1981 roku.",
        "LNG2": "Exhibitions of artifacts from the tomb of Tutankhamun have been held at museums in several countries, notably the United Kingdom, Soviet Union, United States, Canada, Japan, and France.\r\n\r\nThe artifacts had sparked widespread interest in ancient Egypt when they were discovered between 1922 and 1927, but most of them remained in the Egyptian Museum in Cairo until the 1960s, when they were first exhibited outside of Egypt.\r\nBecause of these exhibitions, relics from the tomb of Tutankhamun are among the most travelled artifacts in the world. Probably the best-known tour was the Treasures of Tutankhamun from 1972 until 1981.",
        "LNG3": "Ausstellungen mit Artefakten aus dem Grab von Tutanchamun fanden in Museen in mehreren Ländern statt, insbesondere im Vereinigten Königreich, in der Sowjetunion, in den Vereinigten Staaten, Kanada, Japan und Frankreich.\r\n\r\nDie Artefakte hatten großes Interesse im alten Ägypten geweckt, als sie zwischen 1922 und 1927 entdeckt wurden. Die meisten von ihnen blieben jedoch bis in die 1960er Jahre im Ägyptischen Museum in Kairo, als sie erstmals außerhalb Ägyptens ausgestellt wurden.\r\nAufgrund dieser Ausstellungen gehören Relikte aus dem Grab von Tutanchamun zu den am häufigsten bereisten Artefakten der Welt. Die wohl bekannteste Tour war die „Schätze des Tutanchamun“ von 1972 bis 1981."
    },
    {
      "ID_DESC": 49,
      "LNG1": "Wystawy artefaktów z grobowca Tutanchamona odbywały się w muzeach w kilku krajach, zwłaszcza w Wielkiej Brytanii, Związku Radzieckim, Stanach Zjednoczonych, Kanadzie, Japonii i Francji.\r\n\r\nArtefakty wzbudziły szerokie zainteresowanie w starożytnym Egipcie, kiedy odkryto je w latach 1922–1927, ale większość z nich pozostawała w Muzeum Egipskim w Kairze aż do lat 60. XX wieku, kiedy to po raz pierwszy wystawiono je poza Egiptem.\r\nDzięki tym wystawom relikty z grobowca Tutanchamona należą do najczęściej podróżowanych artefaktów na świecie. Prawdopodobnie najbardziej znaną trasą była „Skarby Tutanchamona” trwająca od 1972 do 1981 roku.",
      "LNG2": "Exhibitions of artifacts from the tomb of Tutankhamun have been held at museums in several countries, notably the United Kingdom, Soviet Union, United States, Canada, Japan, and France.\r\n\r\nThe artifacts had sparked widespread interest in ancient Egypt when they were discovered between 1922 and 1927, but most of them remained in the Egyptian Museum in Cairo until the 1960s, when they were first exhibited outside of Egypt.\r\nBecause of these exhibitions, relics from the tomb of Tutankhamun are among the most travelled artifacts in the world. Probably the best-known tour was the Treasures of Tutankhamun from 1972 until 1981.",
      "LNG3": "Ausstellungen mit Artefakten aus dem Grab von Tutanchamun fanden in Museen in mehreren Ländern statt, insbesondere im Vereinigten Königreich, in der Sowjetunion, in den Vereinigten Staaten, Kanada, Japan und Frankreich.\r\n\r\nDie Artefakte hatten großes Interesse im alten Ägypten geweckt, als sie zwischen 1922 und 1927 entdeckt wurden. Die meisten von ihnen blieben jedoch bis in die 1960er Jahre im Ägyptischen Museum in Kairo, als sie erstmals außerhalb Ägyptens ausgestellt wurden.\r\nAufgrund dieser Ausstellungen gehören Relikte aus dem Grab von Tutanchamun zu den am häufigsten bereisten Artefakten der Welt. Die wohl bekannteste Tour war die „Schätze des Tutanchamun“ von 1972 bis 1981."
  },
  {
    "ID_DESC": 49,
    "LNG1": "Wystawy artefaktów z grobowca Tutanchamona odbywały się w muzeach w kilku krajach, zwłaszcza w Wielkiej Brytanii, Związku Radzieckim, Stanach Zjednoczonych, Kanadzie, Japonii i Francji.\r\n\r\nArtefakty wzbudziły szerokie zainteresowanie w starożytnym Egipcie, kiedy odkryto je w latach 1922–1927, ale większość z nich pozostawała w Muzeum Egipskim w Kairze aż do lat 60. XX wieku, kiedy to po raz pierwszy wystawiono je poza Egiptem.\r\nDzięki tym wystawom relikty z grobowca Tutanchamona należą do najczęściej podróżowanych artefaktów na świecie. Prawdopodobnie najbardziej znaną trasą była „Skarby Tutanchamona” trwająca od 1972 do 1981 roku.",
    "LNG2": "Exhibitions of artifacts from the tomb of Tutankhamun have been held at museums in several countries, notably the United Kingdom, Soviet Union, United States, Canada, Japan, and France.\r\n\r\nThe artifacts had sparked widespread interest in ancient Egypt when they were discovered between 1922 and 1927, but most of them remained in the Egyptian Museum in Cairo until the 1960s, when they were first exhibited outside of Egypt.\r\nBecause of these exhibitions, relics from the tomb of Tutankhamun are among the most travelled artifacts in the world. Probably the best-known tour was the Treasures of Tutankhamun from 1972 until 1981.",
    "LNG3": "Ausstellungen mit Artefakten aus dem Grab von Tutanchamun fanden in Museen in mehreren Ländern statt, insbesondere im Vereinigten Königreich, in der Sowjetunion, in den Vereinigten Staaten, Kanada, Japan und Frankreich.\r\n\r\nDie Artefakte hatten großes Interesse im alten Ägypten geweckt, als sie zwischen 1922 und 1927 entdeckt wurden. Die meisten von ihnen blieben jedoch bis in die 1960er Jahre im Ägyptischen Museum in Kairo, als sie erstmals außerhalb Ägyptens ausgestellt wurden.\r\nAufgrund dieser Ausstellungen gehören Relikte aus dem Grab von Tutanchamun zu den am häufigsten bereisten Artefakten der Welt. Die wohl bekannteste Tour war die „Schätze des Tutanchamun“ von 1972 bis 1981."
},
        {
            "ID_ARCHIVES": 1,
            "LNG1": "Dzikan zaroślowy (Potamochoerus larvatus) –\r\n gatunek ssaka z rodziny świniowatych, blisko spokrewniony z dzikanem rzecznym. Występuje w Afryce, także na Madagaskarze. Wyróżnia się od 3 do 5 podgatunków. Wszystkożerny, łatwo się adaptuje. Żyje w grupach liczących 6-12 zwierząt, w tym dominujący samiec. Szybko się rozmnaża, rozród trwa cały rok, w miocie 3-4 prosięta. Nie zagraża mu wyginięcie.",
            "LNG2": "The wild boar \r\n(Potamochoerus larvatus) is a species of mammal from the swine family, closely related to the river wild boar. It occurs in Africa, also in Madagascar. There are 3 to 5 subspecies. Omnivorous, easily adaptable. It lives in groups of 6-12 animals, including a dominant male. It breeds quickly, breeding lasts all year round, 3-4 piglets per litter. It is not in danger of extinction.",
            "LNG3": "Mežacūka \r\n(Potamochoerus larvatus) ir cūku dzimtas zīdītāju suga, kas cieši saistīta ar upes mežacūku. Tas notiek Āfrikā, arī Madagaskarā. Ir 3 līdz 5 pasugas. Visēdājs, viegli pielāgojams. Tas dzīvo 6-12 dzīvnieku grupās, ieskaitot dominējošo tēviņu. Vairojas ātri, vairošanās ilgst visu gadu, 3-4 sivēni metienā. Tai nedraud izzušana."
        }
    ]
    let data;
if(filter.searchInArc){
data=data2
}else{
  data=data1
}
*/
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