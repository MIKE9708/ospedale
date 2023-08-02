import Form from 'react-bootstrap/Form';
import { Col,Button } from 'react-bootstrap';
import './AddUser.css';
import { useState } from 'react';
import { useReducer } from 'react';
import { addAdmin,addUser } from '../../api_call/api_call';
import useAuth from '../../hooks/useAuth';
import { Navigate } from "react-router-dom";
import { recoverCredentials } from '../../api_call/secondary_api_call';
import Spinner from 'react-bootstrap/Spinner';

function AddUser(props){
    const error_message={
        nome:"Il campo non può essere vuoto e deve contenere solo lettere",
        cf:"Il campo non può contenere caratteri speciali",
        numero:"Il campo  può contenere solo numeri e deve tra 8 e 11 cifre",
        onlyNum:"Il campo obligatorio e può contenere solo numeri",
        email:"Email non valida",
        username:"username deve avere almeno lunghezza 5 e non avere caratteri speciali",
        password: "le password non coincidono"
    }
    
    const type_mapping = {"Dottore":"doctor","Paziente":"patient","Admin":"Admin"}
    const auth=useAuth();
    const [ error,setError ] = useState( {nome:"",cognome:"",cf:"",numero:"",peso:"",altezza:"",request:""} ); 
    const [type,setType] = useState();
    const user={user:{role:"Admin"},user_data:{role:"Admin"}};
    const regex1text = /[a-zA-Z \s]/g;
    const regex2number = /[0-9]/g;
    const regexSpecialChar = /[!@#$%^&*)(]/g
    const email = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const user_data=["nome","cognome","numero","peso","altezza","cf"]
    const [errRequ,setErrReq] = useState();
    const [loading,setLoading] = useState();
    
    const formReducer=(state,action)=>{
        
        switch(action.type) {
            case "type":
                if( action.payload ==="Admin" ){
                    if(state){
                        for(let key of user_data){
                            //console.log(state)
                            delete state[key];
                        }
                        
                    }
                }
                return {
                    ...state,user:{...state.user,role:type_mapping[action.payload]},
                    user_data:{...state.user_data,role:type_mapping[action.payload]}
                };

            case "email":
                setError(()=>({...error, [action.type]:""}));
                if(action.payload.length === 0 || !action.payload.match(email)) {
                    setError( (error) => (
                        // eslint-disable-next-line
                        {... error,email:error_message.email}  ));
                        return {...state};
                    } 
                else{
                    return {...state,user:{...state.user,email:action.payload}}
                }
    
            case "nome":
                setError(()=>({...error, [action.type]:""}));
                if(action.payload.length === 0 || action.payload.match(regex2number) || action.payload.match(regexSpecialChar) ) {
                    setError( (error) => (
                        // eslint-disable-next-line
                        {... error,nome:error_message.nome}  ));
                        return {...state} ;
                    } 
                else{
                    return {...state,user_data:{...state.user_data,nome:action.payload}}
                }
            case "cognome":
                setError(()=>({...error, [action.type]:""}));
                if(action.payload.length === 0 || action.payload.match(regex2number) || action.payload.match(regexSpecialChar) ) {
                    // eslint-disable-next-line
                    setError((error)=>({... error,cognome:error_message.nome})); 
                    return {...state} ;
                    } 

                else{
                    return {...state,user_data:{...state.user_data,cognome:action.payload} }
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
                    return {...state,user_data:{...state.user_data,cf:action.payload}}
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
                        return {...state,user_data:{...state.user_data,numero:action.payload}}
                    }
            case "peso":
                    setError(()=>({...error, [action.type]:""}));
                    if( action.payload.match(regex1text)  || action.payload.length === 0) {
                        setError( (error) => (
                            // eslint-disable-next-line
                            {... error,peso:error_message.onlyNum}  ));
                            return {...state} ;
                        } 
                    else{
                        return {...state,user_data:{...state.user_data,peso:action.payload}}
                    }
            case "altezza":
                    setError(()=>({...error, [action.type]:""}));
                    if( action.payload.match(regex1text) || action.payload.length === 0 ) {
                        setError( (error) => (
                            // eslint-disable-next-line
                            {... error,altezza:error_message.onlyNum}  ));
                            return {...state} ;
                        } 
                    else{
                        return {...state,user_data:{...state.user_data,altezza:action.payload}}
                    }
            case "username":
                setError(()=>({...error, [action.type]:""}));
                if( action.payload.length <= 5 || action.payload.match(regexSpecialChar) ) {
                    setError( (error) => (
                        // eslint-disable-next-line
                        {... error,username:error_message.username}  ));
                        return {...state} ;
                    } 
                else{
                    return {...state,user:{...state.user,username:action.payload}}
                }
            case "password":
                setError(()=>({...error, [action.type]:""}));
                if( action.payload.length < 6 || action.payload.match(regexSpecialChar) ) {
                    setError( (error) => (
                        // eslint-disable-next-line
                        {... error,password:error_message.password}  ));
                        return {...state} ;
                    } 

                else{
                    return {...state,user:{...state.user,password:action.payload}};
                }
            case "repassword":
                setError(()=>({...error, [action.type]:""}));
                if( action.payload !== state.user["password"] ) {
                    setError( (error) => (
                        // eslint-disable-next-line
                        {... error,"repassword":error_message.password}  ));
                        return {...state} ;
                    } 
                else{
                    return {...state,user:{...state.user,repassword:action.payload}}
                }
            default : return state;
        }
        
    }

    const [formState,dispatch ] = useReducer(formReducer,user);

    const handleSubmit = async (event)=>{

        event.preventDefault();
        //console.log(formState)
        let res = "N/A"



        // setError(()=>({...error,request:""}));
        setLoading(() => true )

        if( formState.user.role ==="Admin"){
            
            res = await addAdmin(formState,auth.auth.accessToken);
            console.log(res);
        }
        else{

            res = await addUser(formState,auth.auth.accessToken);
        }

        if(res.error){
            setErrReq(()=>(res.error.response.data.message));
            

        }
        else{
            let credentials = { email:formState.user.email,username:formState.user.username };
            res = await recoverCredentials(credentials);
            if(res.error){
                setErrReq(()=>(res.error.response.data.message));
            }
            else{
                props.list_data();
                <Navigate to="/Dashboard" />
            }
        }
        setLoading(() => false);

    }

    if(loading){
        
            return(      
            <div className ="App" style={{backgroundColor:"rgb(32, 32, 32)",width:"100%",height:"100%"}}>
              <div style={{margin:"auto",width:"100px",marginTop:"300px"}}>
                <Spinner animation="border" variant="info" size='lg' style={{ width: "4rem", height: "4rem" }}/>
              </div>
            </div>
            )
          
    }

   else return(
        <div style={{"width":"80%",marginTop:"10px"}}>
            <h3 style={{textAlign:'center',fontWeight:"600",fontFamily: "Helvetica, sans-serif"}}>Aggiungi Utente</h3>
        <div className='loginContainer1' style={{height:"690px",margin:"auto"}}>
        {errRequ ? 
                          (<div style={{width:"300px",height:"auto",borderRadius:"8px",backgroundColor:"#ffdddd", margin:"auto",marginTop:"10px"}}>
                              <p style={{color:"#f44336",textAlign:"center",fontWeight:"900"}}>{errRequ}</p></div>)
                          :
                          (undefined)
                        }
            <div className='subcontainer'>
                <Form onSubmit={handleSubmit}>

                    <Form.Label column  sm="5" style={{float:"left"}}>
                        <div style={{width:"85%"}}>
                            <h4>Tipo di utente</h4>
                        </div>
                    </Form.Label>
                    <Form.Select size="md" className = "login-form" variant="dark" onChange={(event)=> {setType(()=>event.target.value);dispatch({type:"type",payload:event.target.value})}}>
                        <option>Admin</option>
                        <option>Dottore</option>
                        <option>Paziente</option>
                    </Form.Select>

                    <Form.Group as={Col} className="mb-3" controlId="formPlaintextPassword">
                            <Form.Label column sm="1" style={{float:"left"}}>
                                <div style={{width:"200px"}}>
                                    <h4 >Email</h4>
                                </div>
                            </Form.Label>
                        <Col  style={{margin:"auto",}}>
                            <Form.Control className = "login-form" size="md" type="email" required placeholder="Email" onChange = { (event) => dispatch({type:"email",payload:event.target.value})}/>
                        </Col>
                        <p style= {{color:"#FF6347" }} > {error.email} </p>
                    </Form.Group>

                    <Form.Group as={Col} className="mb-3" controlId="formPlaintextPassword">
                            <Form.Label column sm="1" style={{float:"left"}}>
                                <div style={{width:"85%",margin:"auto"}}>
                                    <h4 >Username</h4>
                                </div>
                            </Form.Label>
                            <Col  style={{margin:"auto",}}>
                                <Form.Control size="md" className = "login-form" type="text" placeholder="username" autoComplete="off" required onChange={(event)=>(dispatch({type:"username",payload:event.target.value}))}/>
                            </Col>
                            <p style= {{color:"#FF6347" }} > {error.username} </p>
                    </Form.Group>

                    { type === "Admin" && (<Form.Group as={Col} className="mb-3" controlId="formPlaintextPassword">
                            <Form.Label column sm="1" style={{float:"left"}}>
                                <div style={{width:"85%",margin:"auto"}}>
                                    <h4 >Password</h4>
                                </div>
                            </Form.Label>
                        <Col  style={{margin:"auto",}}>
                            <Form.Control size="md" className = "login-form" type="password" placeholder="password" autoComplete="off" required onChange={(event)=>{dispatch({type:"password",payload:event.target.value})}}/>
                        </Col>
                        <p style= {{color:"#FF6347" }} > {error.password} </p>
                    </Form.Group>)}

                    { type === "Admin" && (<Form.Group as={Col} className="mb-3" controlId="formPlaintextPassword">
                            <Form.Label column sm="1" style={{float:"left"}}>
                                <div style={{width:"200px"}}>
                                    <h4 >Ripeti Password</h4>
                                </div>
                            </Form.Label>
                        <Col  style={{margin:"auto",}}>
                            <Form.Control size="md" className = "login-form" type="password" placeholder="Ripeti Password" autoComplete="off" required onChange={(event)=>{dispatch({type:"repassword",payload:event.target.value})}}/>
                        </Col>
                        <p style= {{color:"#FF6347" }} > {error.repassword} </p>
                    </Form.Group>)}

                {(type==="Paziente"||type==="Dottore")&&
                (<div>
                    <Form.Group as={Col} className="mb-3" controlId="formPlaintextPassword">
                            <Form.Label column  style={{float:"left"}}>
                                <div style={{width:"85%",margin:"auto"}}>
                                    <h4 >Nome</h4>
                                </div>
                            </Form.Label>
                            <Col  style={{margin:"auto",}}>
                                <Form.Control size="md" className = "login-form" type="text" placeholder="Nome" autoComplete="off" required onChange={(event)=>{dispatch({type:"nome",payload:event.target.value})}}/>
                                <p style= {{color:"#FF6347" }} > {error.nome} </p>
                            </Col>
                    </Form.Group>

                    <Form.Group as={Col} className="mb-3" controlId="formPlaintextPassword">
                            <Form.Label column  style={{float:"left"}}>
                                <div style={{width:"85%",margin:"auto"}}>
                                    <h4 >Cognome</h4>
                                </div>
                            </Form.Label>
                            <Col  style={{margin:"auto",}}>
                                <Form.Control size="md" className = "login-form" type="text" placeholder="Cognome" autoComplete="off" required onChange={(event)=>{dispatch({type:"cognome",payload:event.target.value})}}/>
                                <p style= {{color:"#FF6347" }} > {error.cognome} </p>
                            </Col>
                    </Form.Group> 
                    </div>)}
                    {type==="Paziente" &&
                    (<div>
                    <Form.Group as={Col} className="mb-3" controlId="formPlaintextPassword">
                            <Form.Label column  style={{float:"left"}}>
                                <div style={{width:"200px",margin:"auto"}}>
                                    <h4 >Codice Fiscale</h4>
                                </div>
                            </Form.Label>
                            <Col  style={{margin:"auto",}}>
                                <Form.Control size="md" className = "login-form" type="text" placeholder="CF" autoComplete="off" required onChange={(event)=>{dispatch({type:"cf",payload:event.target.value})}}/>
                                <p style= {{color:"#FF6347" }} > {error.cf} </p>
                            </Col>
                    </Form.Group>


                    <Form.Group as={Col} className="mb-3" controlId="formPlaintextPassword">
                            <Form.Label column  style={{float:"left"}}>
                                <div style={{width:"250px",margin:"auto"}}>
                                    <h4 >Numero di telefono</h4>
                                </div>
                            </Form.Label>
                            <Col  style={{margin:"auto",}}>
                                <Form.Control size="md" className = "login-form" type="text" placeholder="Numero" autoComplete="off" required onChange={(event)=>{dispatch({type:"numero",payload:event.target.value})}}/>
                                <p style= {{color:"#FF6347" }} > {error.numero} </p>
                            </Col>
                    </Form.Group>

                    <Form.Group as={Col} className="mb-3" controlId="formPlaintextPassword">
                            <Form.Label column  style={{float:"left"}}>
                                <div style={{width:"200px",margin:"auto"}}>
                                    <h4 >Peso</h4>
                                </div>
                            </Form.Label>
                            <Col  style={{margin:"auto",}}>
                                <Form.Control size="md" className = "login-form" type="text" placeholder="Peso(kg)" autoComplete="off" required onChange={(event)=>{dispatch({type:"peso",payload:event.target.value})}}/>
                                <p style= {{color:"#FF6347" }} > {error.peso} </p>
                            </Col>
                    </Form.Group>

                    <Form.Group as={Col} className="mb-3" controlId="formPlaintextPassword">
                            <Form.Label column  style={{float:"left"}}>
                                <div style={{width:"200px",margin:"auto"}}>
                                    <h4 >Altezza</h4>
                                </div>
                            </Form.Label>
                            <Col  style={{margin:"auto",}}>
                                <Form.Control size="md" className = "login-form" type="text" placeholder="Altezza(m)" autoComplete="off" required onChange={(event)=>{dispatch({type:"altezza",payload:event.target.value})}}/>
                                <p style= {{color:"#FF6347" }} > {error.altezza} </p>
                            </Col>
                    </Form.Group>
                    </div>)}





                    <div className="d-grid" style={{width:"80%",margin:"auto",marginTop:"40px"}}>
                        <Button  className="btn-secondary"  size="md" type="submit">
                            Aggiungi
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
    )
}

export default AddUser;