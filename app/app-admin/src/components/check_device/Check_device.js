import { useState } from "react";
import { Form,Col,Button } from "react-bootstrap";

function CheckDevice(props){
    const [error,setError] = useState();
    const message = "Abbiamo iniviato una mail al tuo account con un codice di verifica da inserire"
    const handleSubmit=async(event)=>{}
    
    
    
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
                        <Form.Control size="md" className="login-form" type="text" placeholder="Codice" autoComplete="off" required onChange={(event)=>{setError(()=>'');}} />
                        </Col>
                    </Form.Group>
                    <div style={{width:"400px",height:"auto",borderRadius:"8px",backgroundColor:"#ffdddd", margin:"auto",marginTop:"50px",padding:"5px"}}>
                        <p style={{color:"#f44336",textAlign:"center",fontWeight:"900"}}>{message}</p>
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