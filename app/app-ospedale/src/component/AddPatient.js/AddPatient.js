import { useEffect, useState } from 'react';
import './../DoctorDashboard/DoctorDashboard.css'
import useAuth from '../../hooks/useAuth';
import useData from '../../hooks/useData';
import Add from '../../media/add.svg';
import Loading from '../Loading/Loadng';
import { getFreePatients } from '../../api_call/api';
import { addPatient,getDoctorPatients } from '../../api_call/api';

const color=['#ca5a4b','#ddc850','#2ea857','#8f488f','#c5892e','#2e8ec5']

const AddPatient = () => {

    const {auth} = useAuth();
    const data = useData();
    const [loading,setLoading] = useState(false);



    const addFreePatient = async (elem,id) => {

        const obj = { doctorId:String(auth.id) , patientId:id };
        setLoading(() => true);
        
        const res = await addPatient(obj , auth.accessToken);

        if( !res.error ){
            const newFreePatients = data.freePatients.filter((val) => val.id !== elem.id );
            data.SetFreePatients(() => newFreePatients);
            data.setPatients((patients) => [ ...patients,elem ] );
            setLoading(false);
        }

    } 


    useEffect(() =>{

        const getInfo = async () => {
            const res = await getFreePatients(auth.accessToken);
            const res2 = !data.patients ? await getDoctorPatients(auth.id.toString(),auth.accessToken) : undefined ;
        
            if (  !res.error ){
                data.SetFreePatients( () => res.data.message.message )

            }

            if ( res2 && !res2.error ){
                data.setPatients( () => res2.data.message.message );

            }

        }
        
        if(!data.freePatients)
            getInfo();
     // eslint-disable-next-line       
    },[])

    return (

        <div className="DocDash">
                 <div className='TitleContainer' >
                    <h4 style = {{fontWeight:"400",float:"left",marginLeft:"10px",marginTop:"10px"}}>Dashboard /</h4> 
                    <h4 style = {{fontWeight:"400",float:"left",marginLeft:"10px",marginTop:"10px"}}>Segui pazienti</h4> 
                </div>

                  {  data.freePatients && !loading && data.freePatients.length !== 0
                        ? 
                        
                        (data.freePatients.map( (val) => {
                        
                            return (
                            
                            <div className='Sections' key={val+"section"}>
                                <div className='elementFree' style={{backgroundColor:color[5]}} key= {val+"element"} >
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
                                            
                                            <div className= "Mysvg" style = {{cursor:'pointer'}}> 
                                                <img src = {Add} style = {{width:"25px",height:"25px"}} alt = "add" onClick={() =>  addFreePatient(val,val.id) } />
                                            </div>
                                       
                                        </div>

                                    </div>
                                </div>
                            </div>
                            )

                        }))  :  (
                        
                        data.freePatients && data.freePatients.length === 0 ?
                        (<div className="Empty" style = {{margin:"auto"}}> <h3 style = {{fontWeight:"900",color:"orange",paddingTop:"220px"}}>Non ci sono pazienti disponibii </h3></div>)
                        :
                        (<div className='Sections' style = {{margin : "auto", width:"120px"}} > <Loading/> </div>)
                        
                        
                        
                        )
                    }
                    
                         

                


            
        </div>
    )
}


export default AddPatient;