import './PatientDashboard.css'
import RecordDocument from '../recordPdf/recordPdf';
import { useEffect, useState } from 'react';
import { getPatient } from '../../api_call/api';
import useAuth from '../../hooks/useAuth';
import Loading from '../Loading/Loadng';

const PatientDashboard = () => {

    const auth = useAuth();
    const [myRecord,setMyRecord] = useState();

    useEffect(() =>{
        const getMyRecord = async() => {
            console.log(auth.auth)
            const res = await getPatient(auth.auth.accessToken,auth.auth.id);
            console.log(res)
            if ( !res.error){
                //setMyPatients( () => res.data.message.message );
                setMyRecord( () => res.data.message );
            }
        }
        getMyRecord();
    // eslint-disable-next-line 
    },[myRecord])

    return (

        <div className="DocDash">
            { myRecord ? (<div style={{paddingTop:"20px"}}><RecordDocument patientData={[myRecord]} role="patient" /></div>):(<div className="Secitons" style={{paddingTop:"100px",margin:"auto",width:"120px"}}><Loading/></div>) }
        </div>
    )
}


export default PatientDashboard;