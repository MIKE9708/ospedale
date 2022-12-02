import './PatientDashboard.css'
import RecordDocument from '../recordPdf/recordPdf';
import { useEffect, useState } from 'react';
import { getPatient } from '../../api_call/api';
import useAuth from '../../hooks/useAuth';

const PatientDashboard = () => {

    const auth = useAuth();
    const [myRecord,setMyRecord] = useState();

    useEffect(() =>{
        const getMyRecord = async() => {
            const res = await getPatient(auth.auth.accessToken,auth.auth.id);
            if ( !res.error){
                //setMyPatients( () => res.data.message.message );
                setMyRecord( () => res.data.message.message );
            }
        }
        getMyRecord();
    // eslint-disable-next-line 
    },[myRecord])

    return (

        <div className="body-elem">
          myRecord &&  <RecordDocument patientData = {[myRecord]} />
        </div>
    )
}


export default PatientDashboard;