
import { login } from "../../api_call/api_call";
import { useState} from "react";
import { Form,Col,Button } from "react-bootstrap";
import './Login.css';
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

function Login(){

    const [username,setUsername]=useState();
    const [password,setPassword]=useState();
    const {setAuth}  = useAuth();
    const [error,setError]=useState();
    const navigate=useNavigate();
    
    const handleSubmit=async(event)=>{

        event.preventDefault();
        
        let data = { username:username, password:password };
        const response = await login(data);
        if(!response.error){
          const accessToken = response?.data?.accessToken;
          setAuth(()=>  { return {user:username, accessToken} });
          //let checkPersistance = localStorage.getItem("persist");

          setUsername(()=>'');
          setPassword(()=>'');
          navigate('/Dashboard',{replace:true});
        }

        else setError(()=>response.error.response.data.message);
    

        //navigate('/DeviceCheck',{replace:false});


    }



    return (
        <div className ="App" style={{backgroundColor:"rgb(32, 32, 32)",width:"100%",height:"100%"}}>

            <div className="loginContainer">
                <h3 style={{textAlign:'center',fontSize:"30px",marginTop:"10px",fontWeight:"600",fontFamily: "Helvetica, sans-serif"}}>Accedi</h3>
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
                <h4>Username</h4>
                </div>
                </Form.Label>
                <Col style={{margin:"auto"}}>
                <Form.Control size="md" className="login-form" type="text" placeholder="Username" autoComplete="off" required onChange={(event)=>{setError(()=>'');setUsername(()=>event.target.value)}} />
                </Col>
            </Form.Group>

            <Form.Group as={Col} className="mb-3" controlId="formPlaintextPassword">
                <Form.Label column  style={{float:"left"}}>
                <div style={{width:"85%",margin:"auto"}}>
                <h4 >Password</h4>
                </div>
                </Form.Label>
                <Col  style={{margin:"auto",}}>
                <Form.Control size="md" className = "login-form" type="password" placeholder="Password" autoComplete="off" required onChange={(event)=>{setError(()=>'');setPassword(()=>event.target.value)}}/>
                </Col>
                
            </Form.Group>

                <div>
                <p><Link to="/RecoverPassword">Password Dimenticata</Link></p>
                </div>
            <div className="d-grid" style={{width:"80%",margin:"auto",marginTop:"40px"}}>
                <Button  className="btn-secondary"  size="md" type="submit">
                    Entra
                </Button>
            </div>
            </Form>
                </div>
            </div>
    </div>
    )
}

export default Login;