import Form from 'react-bootstrap/Form';
import { Col,Button } from 'react-bootstrap';
import './AddUser.css';
import { useState } from 'react';

function AddUser(){

    const [ error,setError ] = useState( {nome:"",cognome:"",cf:"",numero:"",peso:"",altezza:""} ); 
    const handleSubmit=(event)=>{}
    const [type,setType] = useState();

    const formReducer=(state,action)=>{
        switch(action.type) {
            case "nome":

                if(action.payload.length === 0 || action.payload.match(regex2number) || action.payload.match(regexSpecialChar) ) {
                    setError( (error) => (
                        // eslint-disable-next-line
                        {... error,nome:"Il campo non può essere vuoto e deve contenere solo lettere"}  ));
                        return {...state} ;
                    } 
                else {
                    setError((error) => ( {...error,nome:""} ));
                    return {...state, personalData: { ...state.personalData, name: action.payload} };
                }
                
            case "cognome":

                if(action.payload.length === 0 || action.payload.match(regex2number) || action.payload.match(regexSpecialChar) ) {
                    // eslint-disable-next-line
                    setError((error)=>({... error,cognome:"Il campo non può essere vuoto e deve contenere solo letter"})); 
                    return {...state} ;
                    } 
                else {
                    setError((error) => ( {...error,cognome:""} ));
                    return { ...state, personalData: { ...state.personalData, surname: action.payload  } } ;
                }

            case "cf":
                if( action.payload.match(regexSpecialChar)  ) {
                    setError( (error) => (
                        // eslint-disable-next-line
                        {... error,cf:"Il campo non può contenere caratteri speciali "}  ));
                        return {...state} ;
                }

                else {
                    setError((error) => ( {...error,cf:""} ));
                    return {...state , personalData: { ...state.personalData, cf:action.payload } };
                }
        }
    }

    return(
        <div className='loginContainer'>
            <h3 style={{textAlign:'center',marginTop:"10px",fontWeight:"600",fontFamily: "Helvetica, sans-serif"}}>Aggiungi Utente</h3>

            <Form onSubmit={handleSubmit}>

                <Form.Label column  sm="5" style={{float:"left"}}>
                    <div style={{width:"85%"}}>
                        <h4>Tipo di utente</h4>
                    </div>
                </Form.Label>
                <Form.Select size="lg" className = "login-form" variant="dark" onChange={(event)=> setType(()=>event.target.value)}>
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
                        <Form.Control className = "login-form" size="lg" type="email" required placeholder="Email" />
                    </Col>
                </Form.Group>

                <Form.Group as={Col} className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column sm="1" style={{float:"left"}}>
                            <div style={{width:"85%",margin:"auto"}}>
                                <h4 >Username</h4>
                            </div>
                        </Form.Label>
                        <Col  style={{margin:"auto",}}>
                            <Form.Control size="lg" className = "login-form" type="text" placeholder="username" autoComplete="off" required onChange={(event)=>{}}/>
                        </Col>
                </Form.Group>

                <Form.Group as={Col} className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column sm="1" style={{float:"left"}}>
                            <div style={{width:"85%",margin:"auto"}}>
                                <h4 >Password</h4>
                            </div>
                        </Form.Label>
                    <Col  style={{margin:"auto",}}>
                        <Form.Control size="lg" className = "login-form" type="password" placeholder="password" autoComplete="off" required onChange={(event)=>{}}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Col} className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column sm="1" style={{float:"left"}}>
                            <div style={{width:"200px"}}>
                                <h4 >Ripeti Password</h4>
                            </div>
                        </Form.Label>
                    <Col  style={{margin:"auto",}}>
                        <Form.Control size="lg" className = "login-form" type="password" placeholder="Ripeti Password" autoComplete="off" required onChange={(event)=>{}}/>
                    </Col>
                </Form.Group>

               {(type==="Paziente"||type=="Dottore")&&
               (<div>
                 <Form.Group as={Col} className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column  style={{float:"left"}}>
                            <div style={{width:"85%",margin:"auto"}}>
                                <h4 >Nome</h4>
                            </div>
                        </Form.Label>
                        <Col  style={{margin:"auto",}}>
                            <Form.Control size="lg" className = "login-form" type="text" placeholder="Nome" autoComplete="off" required onChange={(event)=>{}}/>
                            <p style= {{color:"red" }} > {error.nome} </p>
                        </Col>
                </Form.Group>

                <Form.Group as={Col} className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column  style={{float:"left"}}>
                            <div style={{width:"85%",margin:"auto"}}>
                                <h4 >Cognome</h4>
                            </div>
                        </Form.Label>
                        <Col  style={{margin:"auto",}}>
                            <Form.Control size="lg" className = "login-form" type="text" placeholder="Cognome" autoComplete="off" required onChange={(event)=>{}}/>
                            <p style= {{color:"red" }} > {error.nome} </p>
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
                            <Form.Control size="lg" className = "login-form" type="text" placeholder="CF" autoComplete="off" required onChange={(event)=>{}}/>
                            <p style= {{color:"red" }} > {error.nome} </p>
                        </Col>
                </Form.Group>


                <Form.Group as={Col} className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column  style={{float:"left"}}>
                            <div style={{width:"250px",margin:"auto"}}>
                                <h4 >Numero di telefono</h4>
                            </div>
                        </Form.Label>
                        <Col  style={{margin:"auto",}}>
                            <Form.Control size="lg" className = "login-form" type="text" placeholder="Numero" autoComplete="off" required onChange={(event)=>{}}/>
                            <p style= {{color:"red" }} > {error.nome} </p>
                        </Col>
                </Form.Group>

                <Form.Group as={Col} className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column  style={{float:"left"}}>
                            <div style={{width:"200px",margin:"auto"}}>
                                <h4 >Peso</h4>
                            </div>
                        </Form.Label>
                        <Col  style={{margin:"auto",}}>
                            <Form.Control size="lg" className = "login-form" type="text" placeholder="Peso(kg)" autoComplete="off" required onChange={(event)=>{}}/>
                            <p style= {{color:"red" }} > {error.nome} </p>
                        </Col>
                </Form.Group>

                <Form.Group as={Col} className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column  style={{float:"left"}}>
                            <div style={{width:"200px",margin:"auto"}}>
                                <h4 >Altezza</h4>
                            </div>
                        </Form.Label>
                        <Col  style={{margin:"auto",}}>
                            <Form.Control size="lg" className = "login-form" type="text" placeholder="Altezza(m)" autoComplete="off" required onChange={(event)=>{}}/>
                            <p style= {{color:"red" }} > {error.nome} </p>
                        </Col>
                </Form.Group>
                </div>)}





                <div className="d-grid" style={{width:"80%",margin:"auto",marginTop:"40px"}}>
                    <Button  className="btn-secondary"  size="lg" type="submit">
                        Aggiungi
                    </Button>
                 </div>
                
            </Form>


        </div>
    )
}

export default AddUser;