import { useEffect,useState } from 'react';
import './DoctorDashboard.css'
import { getDoctorPatients } from '../../api_call/api';
import useAuth from '../../hooks/useAuth';
//import PatientsList from '../patientsList/PatientsList';
import ModifyRecord from '../ModifyRecord/ModifyRecord';

//const color=['#ca5a4b','#ddc850','#2ea857','#8f488f','#c5892e','#2e8ec5']

const DoctorDashboard = () => {

    const {auth} = useAuth();
    const  [ myPatients,setMyPatients ] = useState();
    //const [ nope,setNope ] = useState(false);

    useEffect(() =>{

        const getInfo = async () => {
            
            const res = await getDoctorPatients(auth.id.toString(),auth.accessToken);
            setMyPatients( () => res.data.message.message );

        }
        
        getInfo();
        
     // eslint-disable-next-line       
    },[])

    return (
        <div className="DocDash">
 
               { myPatients   ?  (<ModifyRecord record = {myPatients} />) : (undefined) }

                { /*
                    myPatients 
                        ? 
                        (
                        myPatients.map( (val) => {
                        
                            return (<div className='Sections'>
                                <div className='element' style={{backgroundColor:color[0]}} >
                                    <div className='Info'>
                                        <div className = 'Data'>
                                        Nome: {val.personalData.name}
                                        </div>

                                        <div className = 'Data'>
                                            Cognome: {val.personalData.surname}
                                        </div>

                                        <div className = 'Data'>
                                            CF: {val.personalData.cf}
                                        </div>
                                    </div>
                                </div>
                            </div>)
                            }
                        )
                        ) 
                        : 
                        (undefined) */
                }


            
        </div>
    )
}


export default DoctorDashboard;