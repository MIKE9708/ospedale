import Form from 'react-bootstrap/Form';
import { Col,Button } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import useAuth from '../../hooks/useAuth';
// import { Navigate } from 'react-router';
import { useState } from 'react';
import { useReducer } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { useLocation } from 'react-router';
import { updatePatient,updateDoctor } from '../../api_call/api_call';
import useData from '../../hooks/useData';
import { useNavigate } from 'react-router';

function UpdateData(){

    const navigate = useNavigate();
    let data = useData();
    const location = useLocation();
    const auth=useAuth();
    const [ error,setError ] = useState( {nome:"",cognome:"",cf:"",numero:"",request:""} ); 
    const user= location.state.data;
    const regex1text = /[a-zA-Z \s]/g;
    const regex2number = /[0-9]/g;
    const regexSpecialChar = /[!@#$%^&*)(]/g
    // const user_data=["nome","cognome","numero","peso","altezza","cf"]
    const [errRequ,setErrReq] = useState();
    const [loading,setLoading] = useState();
    const error_message={
        nome:"Il campo non può essere vuoto e deve contenere solo lettere",
        cf:"Il campo non può contenere caratteri speciali",
        numero:"Il campo  può contenere solo numeri e deve tra 8 e 11 cifre",
        onlyNum:"Il campo obligatorio e può contenere solo numeri",
        email:"Email non valida",
        username:"username deve avere almeno lunghezza 5 e non avere caratteri speciali",
        password: "le password non coincidono"
    }
    
    //console.log(data.patients)
    const formReducer=(state,action)=>{
        
        switch(action.type) {


            case "nome":
                setError(()=>({...error, [action.type]:""}));
                if(action.payload.length === 0 || action.payload.match(regex2number) || action.payload.match(regexSpecialChar) ) {
                    setError( (error) => (
                        // eslint-disable-next-line
                        {... error,nome:error_message.nome}  ));
                        return {...state} ;
                    } 
                else{
                    return {...state,name:action.payload}
                }
            case "cognome":
                setError(()=>({...error, [action.type]:""}));
                if(action.payload.length === 0 || action.payload.match(regex2number) || action.payload.match(regexSpecialChar) ) {
                    // eslint-disable-next-line
                    setError((error)=>({... error,cognome:error_message.nome})); 
                    return {...state} ;
                    } 

                else{
                    return {...state,surname:action.payload}
                }
            case "cf":
                setError(()=>({...error, [action.type]:""}));
                if( action.payload.match(regexSpecialChar)  ) {
                    setError( (error) => (
                        // eslint-disable-next-line
                        {... error,cf:error_message.cf}  ));
                        return {...state} ;
                }
                else{
                    return {...state,cf:action.payload}
                }
            case "numero":
                    setError(()=>({...error, [action.type]:""}));
                    if( action.payload.match(regex1text) || ( (action.payload.length <8 || action.payload.length >11) && action.payload.length>0 ) ) {
                        setError( (error) => (
                            // eslint-disable-next-line
                            {... error,numero:error_message.numero}  ));
                            return {...state} ;
                        } 
                    else{
                        return {...state,number:action.payload}
                    }
            default : return state;
        }
        
    }

    const [formState,dispatch ] = useReducer(formReducer,user);


    const update_data = (updated_data,type) => {
        
        if(type === "doctor"){
            let doctors = data.doctors;
            
            const index = data.doctors.findIndex((obj) => obj.id === updated_data.id);
            doctors[index]["name"] = formState["name"];
            doctors[index]["surname"] = formState["surname"];
            data.setDoctors(() => doctors);
        }
        else{
            let patients = data.patients;
            const index = data.patients.findIndex((obj) => obj.id === updated_data.id);
            patients[index]["name"] = formState["name"];
            patients[index]["surname"] = formState["surname"];
            patients[index]["cf"] = formState["cf"];
            patients[index]["number"] = formState["number"];
            data.setPatients(() => patients);
        }

    }

    const handleSubmit = async (event)=>{

        event.preventDefault();
        let res = "N/A"

        setError(()=>({...error,request:""}));
        setLoading(() => true )
        if(location.state.type !== "doctor"){
            res = await updatePatient(formState,auth.auth.accessToken);
        }
        else{
          res = await updateDoctor(formState,auth.auth.accessToken);
        }
        if(res.error){
            setErrReq(()=>(res.error.response.data.message));
            
        }
        else{
            update_data(formState,location.state.type);
        }


        setLoading(() => false);
        navigate("/",{replace:true});

    }



    if(loading){
        
        return(     
            
            <div style={{backgroundColor:"rgb(32, 32, 32)",color: "white",width:"100%",height:"100%",display:"flex"}}>
                <div>
                    <Sidebar />
                </div>
            
                <div className ="App" style={{backgroundColor:"rgb(32, 32, 32)",width:"100%",height:"100%"}}>
                    <div style={{margin:"auto",width:"100px",marginTop:"300px"}}>
                        <Spinner animation="border" variant="info" size='lg' style={{ width: "4rem", height: "4rem" }}/>
                    </div>
                </div>
            </div>
        )
      
}





    return(
        <div style={{backgroundColor:"rgb(32, 32, 32)",color: "white",width:"100%",height:"100%",display:"flex"}}>
                <div>
                    <Sidebar />
                </div>
            <div style={{"width":"80%",marginTop:"10px"}}>
                <h3 style={{textAlign:'center',fontWeight:"600",fontFamily: "Helvetica, sans-serif"}}>Modifica Dati</h3>
            <div className='loginContainer1' style={{height:"auto",margin:"auto"}}>
            {errRequ ? 
                            (<div style={{width:"300px",height:"auto",borderRadius:"8px",backgroundColor:"#ffdddd", margin:"auto",marginTop:"10px"}}>
                                <p style={{color:"#f44336",textAlign:"center",fontWeight:"900"}}>{errRequ}</p></div>)
                            :
                            (undefined)
                            }
                <div className='subcontainer'>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group as={Col} className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column sm="1" style={{float:"left"}}>
                            <div style={{width:"200px"}}>
                                <h4 >Nome</h4>
                            </div>
                        </Form.Label>
                            <Col  style={{margin:"auto",}}>
                                <Form.Control className = "login-form" size="md" type="text" required placeholder="Nome" defaultValue = {location.state.data["name"]} onChange = { (event) => dispatch({type:"nome",payload:event.target.value})}/>
                            </Col>
                            <p style= {{color:"#FF6347" }} > {error.nome} </p>
                        </Form.Group>

                        <Form.Group as={Col} className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column sm="1" style={{float:"left"}}>
                            <div style={{width:"200px"}}>
                                <h4 >Cognome</h4>
                            </div>
                        </Form.Label>
                            <Col  style={{margin:"auto",}}>
                                <Form.Control className = "login-form" size="md" type="text" required placeholder="Cognome" defaultValue = {location.state.data["surname"]} onChange = { (event) => dispatch({type:"cognome",payload:event.target.value})}/>
                            </Col>
                            <p style= {{color:"#FF6347" }} > {error.cognome} </p>
                        </Form.Group>
                        

                        { 
                            location.state.type ==="patient" ? 
                                (
                                    <div>
                                        <Form.Group as={Col} className="mb-3" controlId="formPlaintextPassword">
                                            <Form.Label column sm="1" style={{float:"left"}}>
                                                <div style={{width:"200px"}}>
                                                    <h4 >CF</h4>
                                                </div>
                                            </Form.Label>
                                                <Col  style={{margin:"auto",}}>
                                                    <Form.Control className = "login-form" size="md" type="text" required placeholder="Nome" defaultValue = {location.state.data["cf"]} onChange = { (event) => dispatch({type:"cf",payload:event.target.value})}/>
                                                </Col>
                                                <p style= {{color:"#FF6347" }} > {error.cf} </p>
                                        </Form.Group>

    

                                        <Form.Group as={Col} className="mb-3" controlId="formPlaintextPassword">
                                            <Form.Label column sm="1" style={{float:"left"}}>
                                                <div style={{width:"200px"}}>
                                                    <h4 >Numero</h4>
                                                </div>
                                            </Form.Label>
                                                <Col  style={{margin:"auto",}}>
                                                    <Form.Control className = "login-form" size="md" type="text" required placeholder="Nome" defaultValue = {location.state.data["number"]} onChange = { (event) => dispatch({type:"numero",payload:event.target.value})}/>
                                                </Col>
                                                <p style= {{color:"#FF6347" }} > {error.numero} </p>
                                        </Form.Group>

                                    </div>

                                )
                                :
                                (undefined)
                        
                        }

                        <div className="d-grid" style={{width:"80%",margin:"auto",marginTop:"40px"}}>
                            <Button  className="btn-secondary"  size="md" type="submit">
                                Modifica
                            </Button>
                        </div>
                        {error["request"] && 
                            <div style={{width:"300px",height:"auto",borderRadius:"8px",backgroundColor:"#ffdddd", margin:"auto",marginTop:"10px"}}>
                                <p style={{color:"#f44336",textAlign:"center",fontWeight:"900"}}>{error["request"]}</p>
                            </div>}


                    </Form>
                </div>

            </div>

        </div>
    </div>
    )


}


export default UpdateData;