
import { login } from "../../api_call/api";
import { useState} from "react";
import { Form,Col,Button } from "react-bootstrap";
import './Login.css';
import useAuth from "../../hooks/useAuth";
//import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

function Login(role){

    const [username,setUsername]=useState();
    const [password,setPassword]=useState();
    const {setAuth}  = useAuth();
    const [error,setError]=useState();
    const navigate=useNavigate();
    
    const handleSubmit=async(event)=>{

        event.preventDefault();
        
        let data = { username:username, password:password, role:role.role };
        const response = await login(data);
        if(!response.error){
          if(response.data.check_device === false){
            navigate('/DeviceCheck',{state: {
                username: username,
                role:role.role[0]
                //setUsername:setUsername,
                //setPassword:setPassword,
              }},
              );
          }

          else{
            const accessToken = response?.data?.accessToken;
            const id = response?.data?.id;
            setAuth(()=>  { return {user:username, accessToken, role:role.role,id:id} });
            //let checkPersistance = localStorage.getItem("persist");

            setUsername(()=>'');
            setPassword(()=>'');

          // if( window.location === from || window.location === 'http://localhost:3000/Doctor/login'){
          
            role.role[0] === "doctor" ? (navigate('/Doctor/dashboard',{replace:true})) : (navigate('/Patient/dashboard',{replace:true}));
              // }

            //else navigate(from, { replace: true });
          }
          

            }

        else setError(()=>response.error.response.data.message);
    

    }



    return (

    <div className="loginContainer">
        <h3 style={{textAlign:'center',marginTop:"10px",fontWeight:"600",fontFamily: "Helvetica, sans-serif"}}>Login {role.role[0]==='doctor' ? ('Dotttore') : ('Paziente') }</h3>
        {error?
            (<div style={{width:"300px",height:"auto",borderRadius:"8px",backgroundColor:"#ffdddd", margin:"auto",marginTop:"10px"}}>
                <p style={{color:"#f44336",textAlign:"center",fontWeight:"900"}}>{error}</p></div>)
            :
            (undefined)}
        <div style={{marginTop:"30px"}}>
        <Form onSubmit={handleSubmit}>
      <Form.Group as={Col} className="mb-3" autoComplete="off" controlId="formPlaintextEmail">
        <Form.Label column sm="5" style={{float:"left"}}>
        <div style={{width:"85%"}}>
          <h4>Username</h4>
          </div>
        </Form.Label>
        <Col sm="10"style={{margin:"auto"}}>
        <Form.Control className="login-form" type="text" placeholder="Username" autoComplete="off" required onChange={(event)=>{setError(()=>'');setUsername(()=>event.target.value)}} />
        </Col>
      </Form.Group>

      <Form.Group as={Col} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label column sm="4" style={{float:"left"}}>
          <div style={{width:"85%",margin:"auto"}}>
          <h4 >Password</h4>
          </div>
        </Form.Label>
        <Col sm="10" style={{margin:"auto",}}>
          <Form.Control className = "login-form" type="password" placeholder="Password" autoComplete="off" required onChange={(event)=>{setError(()=>'');setPassword(()=>event.target.value)}}/>
        </Col>
        
      </Form.Group>

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
    )
}

export default Login;