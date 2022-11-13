import { useEffect, useState } from 'react';
import './DoctorDashboard.css'
import { getDoctorPatients } from '../../api_call/api';
import useAuth from '../../hooks/useAuth';
import ModifyRecord from '../ModifyRecord/ModifyRecord';
import useData from '../../hooks/useData';
import Pencil from '../../media/pencil.svg';
import Delete from '../../media/delete.svg';
import Loading from '../Loading/Loadng';
import { unfollowPatient,getFreePatients } from '../../api_call/api';


const color=['#ca5a4b','#ddc850','#2ea857','#8f488f','#c5892e','#2e8ec5']

const DoctorDashboard = () => {

    const {auth} = useAuth();
    const  [ myPatient,setMyPatient ] = useState();
    const data = useData();
    const [update , setUpdate ] = useState(false);
    const [loading,setLoading] = useState(false)

    const EnableUpdateRecord = (element) => {
        setUpdate(true);
        setMyPatient(() => element);
    }


    const removeMyPatient = async (id,elem) => {


        setLoading(true);
        const obj = {doctorId:auth.id,patientId:id}        
        const res = await unfollowPatient(obj,auth.accessToken); 
        
        if ( res && !res.data.error ){

            const new_patients = data.patients.filter((obj) => obj.id !== id);
            data.setPatients(() => new_patients);
            data.SetFreePatients((val) => [...val,elem]);
            setLoading(false);

        }    


    } 


    useEffect(() =>{

        const getInfo = async () => {

            const res = await getDoctorPatients(auth.id.toString(),auth.accessToken);
            const res2 = !data.freePatients ? ( await getFreePatients(auth.accessToken) ) : ( undefined );

            if ( !res.error){
                //setMyPatients( () => res.data.message.message );
                data.setPatients( () => res.data.message.message );
            }
            
            if ( res2 && !res.error ){
                data.SetFreePatients( () => res2.data.message.message );

            }
        }
        
        getInfo();
        
     // eslint-disable-next-line       
    },[])

    return (

        <div className="DocDash">

                {!update &&  <h2 style = {{paddingTop:"20px",fontWeight:"900",color:"rgb(107, 107, 107)"}}>I miei pazienti </h2> }
                { 
                    data.patients && !update && !loading
                        ? 
                        (
                        data.patients.map( (val,key) => {
                            
                            return (
                            
                            <div className='Sections' key={key+"section"}>
                                <div className='element' style={{backgroundColor:color[key]}} key= {val+"element"} >
                                    <div className='Info' key = {key + "info"}>
                                        <div className = 'Data' key = {key + "data nome"}>
                                        Nome: {val.personalData.name}
                                        </div>

                                        <div className = 'Data' key = {key + "data cognome"} >
                                            Cognome: {val.personalData.surname}
                                        </div>

                                        <div className = 'Data' key = {key + "data cf"}>
                                            CF: {val.personalData.cf}
                                        </div>

                                        <div className = 'Data' key = {key + "data svg"}  style = {{display : "inline-block",float:"right",padding:"15px"}}>
                                            
                                            <div className= "Mysvg"   onClick={() => EnableUpdateRecord(val) }> 
                                                <img src = {Pencil} style = {{width:"25px",height:"25px"}} alt = "pencil" />
                                            </div>
                                        <div className= "Mysvg" onClick = { () => removeMyPatient(val.id,val)} > 
                                            <img src = {Delete} style = {{width:"25px",height:"25px"}} alt = "delete" />  
                                        </div>                                       
                                        </div>

                                    </div>
                                </div>
                            </div>
                            )
                            }
                        )
                        ) 
                        : 
                        (
                            update && !loading ? 
                                (<ModifyRecord record = {[myPatient]} setDashboard = {setUpdate} /> ) : 
                                (<div className='Sections' style = {{margin : "auto", width:"120px"}} > <Loading /> </div>)
                             

                            
                        ) 
                }


            
        </div>
    )
}


export default DoctorDashboard;