import { useState } from "react";
import { Form,Col,Button } from "react-bootstrap";
import { useLocation } from "react-router";
import useAuth from "../../hooks/useAuth";
// import { useEffect } from "react";
import { useNavigate } from "react-router";
import { device_code_check } from "../../api_call/api";

function CheckDevice(){
    const [error,setError] = useState();
    const message = "Abbiamo iniviato una mail al tuo account con un codice di verifica da inserire"
    const location = useLocation();    
    const username = location.state.username ? (location.state.username) : ("");
    const role = location.state.role ? (location.state.role) : ("");
    const {auth,setAuth}  = useAuth();
    const [code,setCode] = useState();
    const navigate=useNavigate();
    /*useEffect(()=>{
        location.state.setUsername(()=>'');
        location.state.setPassword(()=>'');
        // eslint-disable-next-line
    },[])    
    */
    const handleSubmit=async(event)=>{
        event.preventDefault();
        const data = {
            username:username,
            code:code
        }
        const res = await device_code_check(data);
        if(!res.error){
            const accessToken = res?.data?.accessToken;
            setAuth(()=>  { return {user:username, accessToken,role:[role],id:res.data.id} });
            console.log(auth)
            role === "doctor" ? (navigate('/Doctor/dashboard',{replace:true})) : (navigate('/Patient/dashboard',{replace:true}));
        }
        else{
            setError(()=>res.error?.response?.data.message?(res.error.response.data.message):("Errore"));
        }
    }
    
    return(
        <div className="loginContainer">
            <h3 style={{textAlign:'center',fontSize:"30px",marginTop:"10px",fontWeight:"600",fontFamily: "Helvetica, sans-serif"}}>Codice di verifica</h3>
                {error?
                    (<div style={{width:"300px",height:"auto",borderRadius:"8px",backgroundColor:"#ffdddd", margin:"auto",marginTop:"10px"}}>
                        <p style={{color:"#f44336",textAlign:"center",fontWeight:"900"}}>{error}</p></div>)
                    :
                    (undefined)}
        <div style={{marginTop:"10px"}}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group as={Col} className="mb-3" autoComplete="off" controlId="formPlaintextEmail">
                        <Form.Label column  style={{float:"left"}}>
                        <div style={{width:"85%"}}>
                        <h4>Codice</h4>
                        </div>
                        </Form.Label>
                        <Col style={{margin:"auto"}}>
                        <Form.Control size="md" className="login-form" type="text" placeholder="Codice" autoComplete="off" required onChange={(event)=>{setCode(() => event.target.value)}} />
                        </Col>
                    </Form.Group>
                    <div style={{width:"400px",height:"auto",borderRadius:"8px",backgroundColor:"#a3ffa3", margin:"auto",marginTop:"50px",padding:"5px"}}>
                        <p style={{color:"#006800",textAlign:"center",fontWeight:"900"}}>{message}</p>
                    </div>
                    <div className="d-grid" style={{width:"80%",margin:"auto",marginTop:"60px"}}>
                        <Button  className="btn-secondary"  size="md" type="submit">
                            Verifica
                        </Button>
                    </div>
                </Form>
                </div>
            </div>
    )
}

export default CheckDevice;