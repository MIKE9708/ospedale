
import { login } from "../../api_call/api_call";
import { useState,useEffect } from "react";
import { Form,Col,Button } from "react-bootstrap";
import './Login.css';
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

function Login(){

    const [username,setUsername]=useState();
    const [password,setPassword]=useState();
    const {setAuth,setPersist}  = useAuth();
    const [error,setError]=useState();
    const [changePersist,setChangePersist] = useState(false)
    const navigate=useNavigate();
    
    const handleSubmit=async(event)=>{

        event.preventDefault();
        
        let data = { username:username, password:password, persist:changePersist };
        const response = await login(data);
        if(!response.error){
          const accessToken = response?.data?.accessToken;
          setPersist(()=>true)
          setAuth(()=>  { return {user:username, accessToken,persist:changePersist} });
          //let checkPersistance = localStorage.getItem("persist");
          if( ! changePersist ){
            localStorage.setItem("briefToken", JSON.stringify(accessToken));
            setPersist(()=> false)
          }
          setUsername(()=>'');
          setPassword(()=>'');
          navigate('/Dashboard',{replace:true});
        }

        else setError(()=>response.error.response.data.message);


    }

    useEffect(()=>{
        localStorage.setItem("persist", changePersist);
    },[changePersist])

    return (
        <div className ="App" style={{backgroundColor:"rgb(32, 32, 32)",width:"100%",height:"100%"}}>

            <div className="loginContainer">
                <h3 style={{textAlign:'center',fontSize:"35px",marginTop:"10px",fontWeight:"600",fontFamily: "Helvetica, sans-serif"}}>Accedi</h3>
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
                <Form.Control size="lg" className="login-form" type="text" placeholder="Username" autoComplete="off" required onChange={(event)=>{setError(()=>'');setUsername(()=>event.target.value)}} />
                </Col>
            </Form.Group>

            <Form.Group as={Col} className="mb-3" controlId="formPlaintextPassword">
                <Form.Label column  style={{float:"left"}}>
                <div style={{width:"85%",margin:"auto"}}>
                <h4 >Password</h4>
                </div>
                </Form.Label>
                <Col  style={{margin:"auto",}}>
                <Form.Control size="lg" className = "login-form" type="password" placeholder="Password" autoComplete="off" required onChange={(event)=>{setError(()=>'');setPassword(()=>event.target.value)}}/>
                </Col>
                
            </Form.Group>
            {<Form.Group as={Col} className="mb-3" controlId="formPlaintextPassword">
                <Col style={{width:"50%"}} >
                    <Form.Check
                        inline
                        label="Fidati del dispositivo"
                        name="group1"
                        id="persist"
                        onChange={()=>{setChangePersist( (prev) => !prev)}}/>
                </Col>
                </Form.Group>}
                <div>
                <p><Link to="/RecoverPassword">Password Dimenticata</Link></p>
                </div>
            <div className="d-grid" style={{width:"80%",margin:"auto",marginTop:"40px"}}>
                <Button  className="btn-secondary"  size="lg" type="submit">
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