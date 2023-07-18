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
import RecordDocument from '../recordPdf/recordPdf';
//import { PDFViewer } from '@react-pdf/renderer';

const color=['#ca5a4b','#ddc850','#2ea857','#8f488f','#c5892e','#2e8ec5']

const DoctorDashboard = () => {

    const {auth} = useAuth();
    const  [ myPatient,setMyPatient ] = useState();
    const data = useData();
    const [update , setUpdate ] = useState(false);
    const [loading,setLoading] = useState(false)
    const [showRecord,setShowRecord] = useState(false);
    let index = 0;
    
    const EnableUpdateRecord = (element) => {
        //console.log(showRecord);
        setUpdate(true);
        setMyPatient(() => element);
        return false;
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

    const show_Record = (val) => {
        //setUpdate(true);
        setShowRecord(val);
    }

    const unshow_Record = () => {
        setUpdate(false);
        setShowRecord(false);
    }

    const set_index = (()=>{
        if(index < color.length){
            index += 1;
            return index;
        }
        else{
            index = 0;
            return index;
        }
    })

    useEffect(() =>{
        data.setPatients( () => {} );
        data.SetFreePatients( () => {} );

        const getInfo = async () => {

            const res = await getDoctorPatients(auth.id.toString(),auth.accessToken,auth.role[0]);
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
    },[auth])

    return (

        <div className="DocDash">
                {!update &&  
                
                <div className='TitleContainer'>
                    <h4 style = {{fontWeight:"400",float:"left",marginLeft:"10px",marginTop:"10px"}}>Dashboard <p style = {{display:"inline",color:"gray"}}>/</p> I miei pazienti</h4> 
                </div>
                }
                { 
                    data.patients && !update && !loading && !showRecord
                        ? 
                        (
                        <div className='Sections' >
                        {data.patients.map( (val,key) => {
                            
                            return (
                            
                                <div className='element' style={{backgroundColor:color[set_index()]}} key= {key+"element"} >
                                    <div className='Info' key = {key + "info"} >
                                        <div onClick = { ()=> show_Record(val) } style = {{cursor: "pointer"}}>
                                        <div className = 'Data' key = {key + "data nome"}>
                                        Nome: {val.personalData.name}
                                        </div>

                                        <div className = 'Data' key = {key + "data cognome"} >
                                            Cognome: {val.personalData.surname}
                                        </div>

                                        <div className = 'Data' key = {key + "data cf"}>
                                            CF: {val.personalData.cf}
                                        </div>
                                        </div>
                                        <div className = 'Data' key = {key + "data svg"}  style = {{display : "inline-block",float:"right",padding:"15px"}}>
                                            
                                            <div className= "Mysvg"   onClick={() => EnableUpdateRecord(val) } style = {{cursor: "pointer"}}> 
                                                <img src = {Pencil} style = {{width:"25px",height:"25px"}} alt = "pencil" />
                                            </div>
                                        <div className= "Mysvg" onClick = { () => removeMyPatient(val.id,val)} style = {{cursor: "pointer"}}> 
                                            <img src = {Delete} style = {{width:"25px",height:"25px"}} alt = "delete" />  
                                        </div> 

                                        </div>

                                    </div>
                                </div>

                            )
                            }
                        
                        )}    
                        </div>
                        

                        ) 
                        : 
                        (
                            update && !loading && !showRecord ? 
                                (<ModifyRecord record = {[myPatient]} setDashboard = {setUpdate} /> ) : 


                                (
                                    showRecord ?

                                    (<RecordDocument patientData = {[showRecord]}  back = {unshow_Record} />)
                                    :
                                     (<div className='Sections' style = {{margin : "auto", width:"120px"}} > <Loading /> </div>)
                                     
                                    
                                )
                             

                            
                        ) 
                }



        </div>
    )
}


export default DoctorDashboard;