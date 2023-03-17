import { useState,useEffect } from "react";
import {getDoctors,getPatients} from './api_call/api_call';
import TableUsers from "./components/Table";
import Spinner from 'react-bootstrap/Spinner';
import './App.css'
function App() {

  const [doctors,setDoctors] = useState({});
  const [dataReady,setDataReady] = useState(false);
  const [patients,setPatients] = useState({});
  
  const columns1 = ['ID','Nome','Cognome','Rimuovi'];
  const columns2 = ['ID','Nome','Cognome','CF','Numero','Rimuovi'];

  function prepare_doctor_data(data){
    let table_datas = [];

    for(let elem of data){
      let obj = {
        id:elem.id,
        nome:elem.nome,
        cognome: elem.cognome,
    }
    table_datas.push(obj);
    }
    return table_datas;
  }

  function prepare_patient_data(data){
    let table_datas = [];

    for(let elem of data){
      let obj = {
        id:elem["id"],
        nome:elem.personalData["name"],
        cognome:elem.personalData["surname"],
        cf:elem.personalData["cf"],
        number:elem.personalData["number"],
      }
      table_datas.push(obj);
    }
    return table_datas;
  }
  
  
  useEffect(() =>{
    async function listDoctors_api_call(){
      
      let res_doctor = await getDoctors();
      let res_patients = await getPatients();

      if(!res_doctor.error && !res_patients.error){
        
        setDoctors(()=>prepare_doctor_data(res_doctor.data.message))
        setPatients(() => prepare_patient_data(res_patients.data.message))
        setDataReady(() => true)
      }
      
    }
    listDoctors_api_call()
  },[])

  if(!dataReady){
    return(      
    <div style={{margin:"auto"}}>
      <Spinner animation="border" variant="info" size='lg' style={{ width: "4rem", height: "4rem" }}/>
    </div>
    )
  }
  return (

    <div style={{marginTop:"120px"}}>
      <div style={{maxWidth:"900px",margin:"auto"}}>
        <h2 style={{fontWeight:"bold"}}>Dottori</h2>
        <TableUsers data={[doctors,setDoctors]} columns = {columns1}/>
      </div>
      
      <div style={{maxWidth:"900px",margin:"auto"}}>
        <h2 style={{fontWeight:"bold"}}>Pazienti</h2>
        <TableUsers data={[patients,setPatients]} columns = {columns2}/>
      </div>
    </div>

   )

 }
 export default App;