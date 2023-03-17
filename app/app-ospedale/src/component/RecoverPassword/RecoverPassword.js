import '../Login/Login.css';
import { Form,Col,Button } from "react-bootstrap";
import { useEffect, useState } from 'react';
import { recoverCredentials } from '../../api_call/api';
import { Link } from 'react-router-dom';
//CREATE EVENT remove_from_activation on SCHEDULE AT CURRENT_TIMESTAMP + INTERVAL 8 HOUR DO DELETE FROM user_activation;


function RecoverPassword(){
    const [email,setEmail] = useState();
    const [error,setError]= useState();
    const [go_on,setGo_on]=useState(false);
    const reg = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    
    useEffect(()=>{

    },[go_on])

    const recover_data=async(email)=>{
        return await recoverCredentials(email);
    }
    const handleSubmit=async(event)=>{
        event.preventDefault();
        setError(()=>"");
        if(!reg.exec(email)){
            setError("Inserire una email valida");
        }
        else{
            let res = await recover_data(email)
            if(res.error!==undefined){
                setError(()=>res.error.response.data.message);
            }
            else{
                setGo_on(()=>true);
            }
        }
    }
    
    if(go_on){
        return (
            <div className="loginContainer">
                <h3 style={{textAlign:'center',marginTop:"10px",fontWeight:"600",fontFamily: "Helvetica, sans-serif"}}>Inserisci la tua email</h3>
                <div  style={{width:"80%",margin:"auto",marginTop:"70px",color:"red"}}>
                    <h4>Abbiamo mandato una email al tuo account fai click sul link della mail per il reset della password</h4>
                    <h4><Link to="/">Torna alla home</Link> </h4>
                </div>
            </div>)
    }
    else{
        return(
            <div className="loginContainer">
                <h3 style={{textAlign:'center',marginTop:"10px",fontWeight:"600",fontFamily: "Helvetica, sans-serif"}}>Inserisci la tua email</h3>
                <div style={{marginTop:"80px"}}>
                <Form onSubmit={handleSubmit}>
                <Form.Group as={Col} className="mb-3" autoComplete="off" controlId="formPlaintextEmail">
                <Form.Label column sm="5" style={{float:"left"}}>
                    <div style={{width:"65%"}}>
                    <h4>Email</h4>
                    </div>
                    </Form.Label>
                    <Col sm="10"style={{margin:"auto"}}>
                    <Form.Control size="lg" className="login-form" type="text" placeholder="Email" autoComplete="off" required onChange={(event)=>{setError("");setEmail(()=>event.target.value)}}/>
                    </Col>
                    <div style={{width:"300px",height:"auto",borderRadius:"8px",backgroundColor:"#ffdddd", margin:"auto",marginTop:"10px"}}>
                        <p style={{color:"#f44336",textAlign:"center",fontWeight:"900"}}>{error}</p>
                    </div>
                </Form.Group>
                <div className="d-grid" style={{width:"80%",margin:"auto",marginTop:"70px"}}>
                    <Button  className="btn-secondary"  size="lg" type="submit">
                        Recupera Credenziali
                    </Button>
                </div>
                </Form>
                </div>
            </div>)
    }
}


export default RecoverPassword;