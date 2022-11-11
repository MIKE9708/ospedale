import { useEffect, useState } from 'react';
import './DoctorDashboard.css'
import { getDoctorPatients } from '../../api_call/api';
import useAuth from '../../hooks/useAuth';
//import PatientsList from '../patientsList/PatientsList';
import ModifyRecord from '../ModifyRecord/ModifyRecord';
import useData from '../../hooks/useData';
import Pencil from '../../media/pencil.svg';
import Delete from '../../media/delete.svg';
import Loading from '../Loading/Loadng';

const color=['#ca5a4b','#ddc850','#2ea857','#8f488f','#c5892e','#2e8ec5']

const DoctorDashboard = () => {

    const {auth} = useAuth();
    const  [ myPatient,setMyPatient ] = useState();
    const data = useData();
    const [update , setUpdate ] = useState(false);
    //const [ nope,setNope ] = useState(false);


    const EnableUpdateRecord = (element) => {
        setUpdate(true);
        setMyPatient(() => element);
    }




    useEffect(() =>{

        const getInfo = async () => {
            const res = await getDoctorPatients(auth.id.toString(),auth.accessToken);
            //setMyPatients( () => res.data.message.message );
            data.setPatients( () => res.data.message.message )

        }
        
        getInfo();
        
     // eslint-disable-next-line       
    },[])

    return (
        <div className="DocDash">

                {!update &&  <h2 style = {{paddingTop:"20px",fontWeight:"900",color:"rgb(107, 107, 107)"}}>I miei pazienti </h2> }
                { 
                    data.patients && !update 
                        ? 
                        (
                        data.patients.map( (val) => {
                        
                            return (
                            
                            <div className='Sections' key={val+"section"}>
                                <div className='element' style={{backgroundColor:color[0]}} key= {val+"element"} >
                                    <div className='Info' key = {val + "info"}>
                                        <div className = 'Data' key = {val + "data nome"}>
                                        Nome: {val.personalData.name}
                                        </div>

                                        <div className = 'Data' key = {val + "data cognome"} >
                                            Cognome: {val.personalData.surname}
                                        </div>

                                        <div className = 'Data' key = {val + "data cf"}>
                                            CF: {val.personalData.cf}
                                        </div>

                                        <div className = 'Data' key = {val + "data svg"}  style = {{display : "inline-block",float:"right",padding:"15px"}}>
                                            <div className= "Mysvg"   onClick={() => EnableUpdateRecord(val) }> 
                                                <img src = {Pencil} style = {{width:"25px",height:"25px"}} alt = "pencil" />
                                            </div>
                                        <div className= "Mysvg"  > 
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
                             update===true ? 
                                (<ModifyRecord record = {[myPatient]} setDashboard = {setUpdate} />) : 
                                (
                                <div className='Sections' style = {{margin : "auto", width:"120px"}} >   
                                    <Loading />
                                </div>
                                )
                            
                        ) 
                }


            
        </div>
    )
}


export default DoctorDashboard;