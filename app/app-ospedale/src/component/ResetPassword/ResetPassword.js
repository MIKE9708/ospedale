import '../Login/Login.css';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { Col,Form,Button } from 'react-bootstrap';

function ResetPassword(){
    const param= useParams();
    const[error,setError] = useState("");
    const [new_password,setNewPassword] = useState({pass:"",repass:""});
    const handleSubmit = async ()=>{

    }

    const errorCheck= ()=>{
        setError(()=>false);
        let code = param.code;
        console.log(code);
        if(new_password.pass!==new_password.repass){
            setError("Le due password non coincidono");
        }
    }

    useEffect(()=>{
        errorCheck();
    },// eslint-disable-next-line
    [new_password])

    return(
        <div className="loginContainer">
            <h3 style={{textAlign:'center',marginTop:"10px",fontWeight:"600",fontFamily: "Helvetica, sans-serif"}}>Reset password</h3>
            <div style={{marginTop:"30px"}}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group as={Col} className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column sm="4" style={{float:"left"}}>
                            <div style={{width:"85%",margin:"auto"}}>
                                <h4 >Password</h4>
                            </div>
                        </Form.Label>
                            <Col sm="10" style={{margin:"auto",}}>
                                <Form.Control className = "login-form" type="password" placeholder="Password" autoComplete="off" required onChange={(event)=>{setNewPassword({...new_password,pass:event.target.value})}}/>
                            </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column sm="5" style={{float:"left"}}>
                            <div style={{width:"95%"}}>
                                <h4 >Ripeti Password</h4>
                            </div>
                        </Form.Label>
                            <Col sm="10" style={{margin:"auto",}}>
                                <Form.Control className = "login-form" type="password" placeholder="Ripeti Password" autoComplete="off" required onChange={(event)=>setNewPassword({...new_password,repass:event.target.value})}/>
                            </Col>
                    </Form.Group>
                    <div style={{width:"300px",height:"auto",borderRadius:"8px",backgroundColor:"#ffdddd", margin:"auto",marginTop:"10px"}}>
                        <p style={{color:"#f44336",textAlign:"center",fontWeight:"900"}}>{error}</p>
                    </div>
                    <div className="d-grid" style={{width:"80%",margin:"auto",marginTop:"40px"}}>
                        <Button  className="btn-secondary"  size="lg" type="submit">
                            Resetta Password
                        </Button>
                </div>
                </Form>

            </div>
        </div>
    )
}



export default ResetPassword;