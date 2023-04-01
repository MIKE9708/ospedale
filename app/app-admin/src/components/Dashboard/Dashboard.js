
import { useState,useEffect } from "react";
import {getDoctors,getPatients} from '../../api_call/api_call';
import TableUsers from "../Table/Table";
import Spinner from 'react-bootstrap/Spinner';
import AddUser from "../AddUser/AddUser";
import Sidebar from "../Sidebar/Sidebar";
import useData from '../../hooks/useData';
import useAuth from "../../hooks/useAuth";

function Dashboard(props){

    const [dataReady,setDataReady] = useState(props.type==='addUser'?(true):(false));
    const data = useData();
    const columns1 = ['ID','Nome','Cognome','Rimuovi'];
    const columns2 = ['ID','Nome','Cognome','CF','Numero','Rimuovi'];
    const auth = useAuth();

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

        let res_doctor = await getDoctors(auth.auth.accessToken);
        let res_patients = await getPatients(auth.auth.accessToken);
  
        if(!res_doctor.error && !res_patients.error){
          
          data.setDoctors(()=>prepare_doctor_data(res_doctor.data.message))
          data.setPatients(() => prepare_patient_data(res_patients.data.message))
          setDataReady(() => true)
        }
        
      }

      if(props.type!=="addUser"){
          if(data.patients===undefined && data.doctors===undefined) listDoctors_api_call();
          else setDataReady(()=>true);
        }
       // eslint-disable-next-line 
    },[])
  
    if(!dataReady){
      return(      
      <div className ="App" style={{backgroundColor:"rgb(32, 32, 32)",width:"100%",height:"100%"}}>
        <div style={{margin:"auto",width:"100px",marginTop:"300px"}}>
          <Spinner animation="border" variant="info" size='lg' style={{ width: "4rem", height: "4rem" }}/>
        </div>
      </div>
      )
    }
    else if(props.type!=='addUser'){
        return (
            <div className="App"style={{backgroundColor:"rgb(32, 32, 32)",color: "white",width:"100%",height:"100%",display:"flex"}}>
                <div>
                    <Sidebar />
                </div>

                <div style={{width:"90%",marginTop:"120px"}}>
                    <div style={{width:"80%",margin:"auto",marginTop:"40px"}}>
                        <h2 style={{fontWeight:"bold"}}>Dottori</h2>
                        <TableUsers data={[data.doctors,data.setDoctors]} columns = {columns1}/>
                    </div>
                    
                    <div style={{width:"80%",margin:"auto",marginTop:"120px"}}>
                        <h2 style={{fontWeight:"bold"}}>Pazienti</h2>
                        <TableUsers data={[data.patients,data.setPatients]} columns = {columns2}/>
                    </div>
                    </div>
                </div>
        
            )
        }
    else{
        return (
            <div style={{backgroundColor:"rgb(32, 32, 32)",color: "white",width:"100%",height:"100%",display:"flex"}}>
                <div>
                    <Sidebar />
                </div>
                <AddUser/>
            </div>

        )
    }
}

export default Dashboard;