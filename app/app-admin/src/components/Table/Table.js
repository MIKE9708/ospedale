import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { removeDoctor,removePatients } from '../../api_call/api_call';
import useAuth from '../../hooks/useAuth';
import Spinner from 'react-bootstrap/Spinner';
import { useState } from 'react';

function TableUsers(props) {
    
    const data_keys = props.data[2] === "doctor"  ?  ( [ "id", "nome", "cognome"] ) : ([ "id", "nome", "cognome", "cf", "number" ] );
    const auth=useAuth();
    const [loading,setLoading] = useState();


    const remove_data=async(id) => {
        props.setError(()=>"");
        setLoading(() => true)

        let res ="N/A"; 
        
        if (props.data[2] === "doctor"){
            res = await removeDoctor(id,auth.auth.accessToken);  
        }
        else {
            res = await removePatients(id,auth.auth.accessToken);
        }
        
        if ( !res.data.error ){
            let data = props.data[0];
            for (let i = 0 ; i< data.length; i++ ){
                if ( data[i]['id'] === id ){
                    data.splice(i, 1);
                    break;
                }
            }

            props.data[1]( ()=> data );

            setLoading(() => false)
        }
        else{
            props.setError("Operazione non riuscita");

        }
        setLoading(() => false)
        }
    




    const table_row =props.data[0]!==undefined?(props.data[0].map((elem,index)=>{
        return (
            <tr key={index}>
                {data_keys.map((obj_key)=>{
                    return<td style={{fontWeight: "bold"}}key={index+elem[obj_key]}>{elem[obj_key]}</td>
                })}
                <td key={index+"remove"} style={{width:"30px"}}>
                    <Button  style={{fontWeight: "bold",display: "block",margin: "auto",border:"0px",backgroundColor:"#BA55D3"}}onClick={()=>remove_data(elem['id'],elem)}>
                        Rimuovi
                    </Button>
                </td>
            </tr>
        )
    })):(undefined);


    if(loading){
        return(      
        <div className ="App" style={{backgroundColor:"rgb(32, 32, 32)",width:"100%",height:"20%"}}>
          <div style={{margin:"auto",width:"50px",marginTop:"50px"}}>
            <Spinner animation="border" variant="info" size='lg' style={{ width: "4rem", height: "4rem" }}/>
          </div>
        </div>
        )
      }

    else{
      return (
        <div style={{marginTop:"30px"}}>
           {table_row!==undefined ? 
           (<Table striped bordered hover responsive size="md" variant="dark" >
                <thead>
                    <tr>
                        {props.columns.map((elem) => (<th key={elem}>{elem}</th>))}
                    </tr>
                </thead>
            <tbody>
                {table_row}

            </tbody>
            </Table>):(undefined)
            }

        </div>
        )
    }
}


export default TableUsers;


