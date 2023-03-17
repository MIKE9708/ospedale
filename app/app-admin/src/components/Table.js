import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

function TableUsers(props) {
    
    const data_keys = Object.keys(props.data[0][0]);

    const remove_data=async(id) => {
        console.log(id);
    }




    const table_row = props.data[0].map((elem,index)=>{
        return (
            <tr key={index}>
                {data_keys.map((obj_key)=>{
                    return<td style={{fontWeight: "bold"}}key={index+elem[obj_key]}>{elem[obj_key]}</td>
                })}
                <td key={index+"remove"} style={{width:"30px"}}>
                    <Button variant="danger" style={{fontWeight: "bold",display: "block",margin: "auto"}}onClick={()=>remove_data(elem['id'])}>
                        Rimuovi
                    </Button>
                </td>
            </tr>
        )
    })

    return (
        <Table striped bordered hover responsive size="md" variant="dark" >
            <thead>
                <tr>
                    {props.columns.map((elem) => (<th key={elem}>{elem}</th>))}
                </tr>
            </thead>
        <tbody>
            {table_row}

        </tbody>
      </Table>
    )
}


export default TableUsers;


