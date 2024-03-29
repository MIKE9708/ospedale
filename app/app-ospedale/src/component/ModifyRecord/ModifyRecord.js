
import {  useReducer,useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './ModifyRecord.css'
import DatePicker from 'react-date-picker';
import useData from "../../hooks/useData";
import { updateRecord } from "../../api_call/api";
import useAuth from '../../hooks/useAuth';
import Loading from "../Loading/Loadng";
import { ReactComponent as Back } from '../../media/back.svg';

function ModifyRecord(record){

    const data = useData();
    const [loading,setLoading] = useState(false);  
    const record_patient = record.record[0];
    const regex1text = /[a-zA-Z \s]/g;
    const regexSpecialChar = /[!@#$%^&*)(]/g
    const [ error,setError ] = useState( {nome:"",cognome:"",cf:"",numero:"",peso:"",altezza:""} ); 
    const auth = useAuth();

    const formReducer = (state,action) =>{

        switch(action.type) {

            
            case "peso":
                if( action.payload.match(regex1text)  || action.payload.length === 0) {
                    setError( (error) => (
                        // eslint-disable-next-line
                        {... error,peso:"Il campo obligatorio e può contenere solo numeri"}  ));
                        return {...state} ;
                    } 

               else{
                 setError((error) => ( {...error,peso:""} ));
                 return {...state , personalData: { ...state.personalData, weight:action.payload} };
               }
            
            case "altezza":
                if( action.payload.match(regex1text) || action.payload.length === 0 ) {
                    setError( (error) => (
                        // eslint-disable-next-line
                        {... error,altezza:"Il campo è obligatorio e può contenere solo numeri"}  ));
                        return {...state} ;
                    } 
                else{
                    setError((error) => ( {...error,altezza:""} ));
                    return {...state , personalData: { ...state.personalData, height:action.payload} };
                }
            
            case "medicine":

                if( action.payload.match(regexSpecialChar)  ) {
                    setError( (error) => (
                        // eslint-disable-next-line
                        {... error,medicine:"Non sono ammessi caratteri speciali"}  ));
                        return {...state} ;
                    } 
               
                else{
                    setError((error) => ( {...error,medicine:""} ));
                    return {...state , info: { ...state.info, medicinesTaken:action.payload } };
                }

            case "allergie":

                if( action.payload.match(regexSpecialChar) ){
                    setError( (error) => (
                        // eslint-disable-next-line
                        {... error,allergie:"Non sono ammessi caratteri speciali"}  ));
                        return {...state} ;
                    } 
                
                else{
                    setError((error) => ( {...error,allergie:""} ));
                    return {...state , info: { ...state.info, allergies:action.payload } };
                }

            case "problemiPassati":
                
                if( action.payload.match(regexSpecialChar) ){
                    setError( (error) => (
                        // eslint-disable-next-line
                        {... error,problemiPassati:"Non sono ammessi caratteri speciali"}  ));
                        return {...state} ;
                    } 
                else{
                    setError((error) => ( {...error,problemiPassati:""} ));
                    return {...state , info: { ...state.info, pastMedicalProblems:action.payload } };
                }

            default : return state;
        }
    }

    const [ formState,dispatch ] = useReducer(formReducer,record_patient);

    const handleSubmit = async(event) => {
        
        event.preventDefault();
        for( const prop in error){

            if( error[prop].length !==0 ) return ;

        }

        console.log("Faccio chaimata alle api ",formState);

        setLoading(true);

        const res = await updateRecord(formState.id,formState,auth.auth.accessToken);

        if ( !res.data.error ){

            let patients = data.patients;
            const index = data.patients.findIndex((obj) => obj.id === formState.id);
            patients[index] = formState;
            data.setPatients(() => patients);
            record.setDashboard(false);
            setLoading(false);
        }        


    }
  

    return (

        <div>
        {!loading && <div className = "BackClass" onClick = { () => record.setDashboard(false) }>
        <Back className="Back"/>
        </div> } 
        <div className = "RecordFormContainer">
      
            <h2 style={{fontWeight:"900"}}>Modifica Cartella </h2>
            {record.record[0] ? (<h4 style={{fontWeight:"900",margin:"auto" }} >Paziente: {record.record[0].id}</h4>) : (undefined) }

    
        {record.record[0]  && !loading ? 
        (<Form onSubmit={handleSubmit}>

        <Form.Group className="mb-3" controlId="formBasicData" style ={{marginTop:"30px"}}>
        <div className="display-line-break">

            <Form.Label column sm="0" style={{float:"left",fontWeight:"900"}} >Nome </Form.Label>
           <div> <p style={{fontSize:"20px",fontWeight:"400"}}> {record.record[0].personalData.name} </p> </div>
        </div>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicData">
            <div className="display-line-break">
            <Form.Label column sm="0" style={{float:"left",fontWeight:"900"}} >Cognome</Form.Label>
            
                <div><p style={{fontSize:"20px",fontWeight:"400"}}>{record.record[0].personalData.surname}</p></div>
            </div>
        </Form.Group>

        <Form.Group className="mb-1" controlId="formBasicData" style={{paddingTop:"10px"}}>
            <div className="display-line-break">

            <Form.Label column sm="0" style={{float:"left",fontWeight:"900"}} >Codice Fiscale</Form.Label>
            <div><p>{record.record[0].personalData.cf}</p></div>
            </div>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicData" style={{paddingTop:"10px",}}>
        <div className="display-line-break">
            <Form.Label column sm="0" style={{float:"left",fontWeight:"900"}} >Telefono </Form.Label>
            <div> <p > {record.record[0].personalData.number}  </p>  </div>
        </div>
            
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicData" style={{paddingTop:"10px"}}>
            <Form.Label column sm="0" style={{float:"left",fontWeight:"900"}} >Peso (Kg) </Form.Label>
            <Form.Control type="text"  className="update-form" placeholder="Peso (kg)" defaultValue = {record.record[0].personalData.weight}  onChange = { (event) => dispatch({type:"peso",payload:event.target.value}) } />
            <p style= {{color:"red"}} > {error.peso} </p>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicData" style={{paddingTop:"10px"}}>
            <Form.Label column sm="0" min="0" style={{float:"left",fontWeight:"900"}} >Altezza (m) </Form.Label>
            <Form.Control  type="text" className="update-form" placeholder="Altezza (m)" defaultValue = {record.record[0].personalData.height}  onChange = { (event) => dispatch({type:"altezza",payload:event.target.value}) } />
            <p style= {{color:"red"}} > {error.altezza} </p>
        </Form.Group>



        <Form.Group className="mb-3" controlId="formBasicData" style={{paddingTop:"10px"}}>
            <Form.Label column sm="0" style={{float:"left",fontWeight:"900"}} >Allergie </Form.Label>
            <Form.Control as="textarea" className="update-form" placeholder="Allergie" defaultValue = {record.record[0].info.allergies}  onChange = { (event) => dispatch({type:"allergie",payload:event.target.value}) } />
            <p style= {{color:"red"}} > {error.allergie} </p>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicData" style={{paddingTop:"10px"}}>
            <Form.Label column sm="0" style={{float:"left",fontWeight:"900"}} >Problemi Medici passati </Form.Label>
            <Form.Control as="textarea" className="update-form" placeholder="Problemi Medici passati" defaultValue = {record.record[0].info.pastMedicalProblems}  onChange = { (event) => dispatch({type:"problemiPassati",payload:event.target.value}) } />
            <p style= {{color:"red"}} > {error.problemiPassati} </p>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicData" style={{paddingTop:"10px"}}>
            <Form.Label column sm="0" style={{float:"left",fontWeight:"900"}} >Medicine </Form.Label>
            <Form.Control as="textarea" className="update-form" placeholder="Medicine" defaultValue = {record.record[0].info.medicinesTaken}  onChange = { (event) => dispatch({type:"medicine",payload:event.target.value}) } />
            <p style= {{color:"red"}} > {error.medicine} </p>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicData">
            <Form.Label style={{fontWeight:900}} >Data di Nascita</Form.Label>
            <div className = "DateContainer" style = {{paddingBottom:"10px"}}>
                <DatePicker style = {{ width :"200px"}} value={ new Date(record.record[0].personalData.birth) } />
            </div>
        </Form.Group>



        <div className="d-grid" style={{width:"80%",height:"50px",margin:"auto",marginTop:"40px"}}>

            <Button variant="secondary" type="submit">
                <p style= {{fontWeight:"900",margin:"auto"}} >Modifica</p>
            </Button>
        </div>

        </Form>)
        :
            (
                <div className='Sections' style = {{margin : "auto", width:"120px"}} >
                <Loading/>
                </div>
            )
    }
        </div> 

    
    </div>
    )
    
}

export default ModifyRecord;