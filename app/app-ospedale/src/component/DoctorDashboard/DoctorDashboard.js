import { useEffect,useState } from 'react';
import './DoctorDashboard.css'
import { getDoctorPatients } from '../../api_call/api';
import useAuth from '../../hooks/useAuth';
import PatientsList from '../patientsList/PatientsList';

const color=['#ca5a4b','#ddc850','#2ea857','#8f488f','#c5892e','#2e8ec5']

const DoctorDashboard = () => {

    const {auth} = useAuth();
    const  [ myPatients,setMyPatients ] = useState();
    const [ nope,setNope ] = useState(false);

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

                { 
                    myPatients && !nope
                        ? 
                        (
                            <div className='Sections'>
                                <PatientsList elem = { myPatients } color = {color[0]} setNope = {setNope} />
                                <PatientsList elem = { myPatients } color = {color[1]}  />
                                <PatientsList elem = { myPatients } color = {color[2]}  />
                                <PatientsList elem = { myPatients } color = {color[3]}  />
                                <PatientsList elem = { myPatients } color = {color[4]}  />
                                <PatientsList elem = { myPatients } color = {color[5]}  />
                            </div>
                        ) 
                        : 
                        (undefined) 
                }


            
        </div>
    )
}


export default DoctorDashboard;