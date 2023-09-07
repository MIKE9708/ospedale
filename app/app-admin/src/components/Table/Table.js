import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { removeAdmin, removeDoctor,removePatients } from '../../api_call/api_call';
import useAuth from '../../hooks/useAuth';
import Spinner from 'react-bootstrap/Spinner';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function TableUsers(props) {
    

    const get_keys= (type) => {
        if (type === "doctor" ){
            return [ "id", "name", "surname"] 
        }
        else if (type === "admin" ){
            return ["username","email"]
        }
        else{
            return [ "id", "name", "surname", "cf", "number" ]
        }
    }

    const data_keys = get_keys(props.data[2])
    const auth=useAuth();
    const [loading,setLoading] = useState();
    const navigate = useNavigate();

    const go_to_update = (data) => {
        console.log(props.data[2])
        navigate('/UpdateData/' + data["id"] ,{state:{data,type:props.data[2]}});
    } 

    const remove_data=async(id) => {
        props.setError(()=>"");
        setLoading(() => true)

        let res ="N/A"; 
        
        if (props.data[2] === "doctor"){
           res = await removeDoctor(id,auth.auth.accessToken);  
        }
        else if( props.data[2] === "admin" ){
            res = await removeAdmin(id,auth.auth.accessToken); 
        }
        else {
            res = await removePatients(id,auth.auth.accessToken);
        }
        
        if ( !res.data.error ){
            const key = props.data[2] === "admin" ? ("username"):("id");
            let my_data =  props.data[2] === "admin" ? ({"username":id}):(id)
            let new_data = props.data[0].filter((obj) => obj[key] !== my_data[key])
            console.log(new_data)
            props.data[1]( ()=> new_data );

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
                    return<td style={{fontWeight: "bold"}}key={index+elem[obj_key]+obj_key}>{elem[obj_key]}</td>
                })}
                
                {props.data[2] !== "admin" ?
                    (
                    <td key={index+"modify"} style={{width:"30px"}}>
                        <Button  style={{fontWeight: "bold",display: "block",margin: "auto",border:"0px",backgroundColor:"#BA55D3"}}
                            onClick={()=> go_to_update(elem)}>
                            Modifica
                        </Button>
                    </td>)
                    :
                    (undefined)
                }

                <td key={index+"remove"} style={{width:"30px"}}>
                    <Button  style={{fontWeight: "bold",display: "block",margin: "auto",border:"0px",backgroundColor:"#BA55D3"}}
                        onClick={()=>
                            remove_data(props.data[2] !== "admin" ? (elem['id'],elem):(elem["username"]))}
                    >
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


