import { useEffect } from 'react';
import { useParams,Navigate } from 'react-router';
import './ValidateAdmin.css'
import { checkCode,activateAccount } from '../../api_call/api_call';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function ValidateAdmin(){
    const params=useParams();
    const[error,setError] = useState();


    useEffect(()=>{
        const call_checkCode=async(code)=>{
            console.log(code)
            const call_activateAccount=async(code)=>{
                let res= await activateAccount({randstring:code});
                return res;
            }
            
            let res=await checkCode(code);
            console.log(res)
            if(res.error===undefined){
                let res = call_activateAccount(code);
                if(res.error===undefined){
                    <Navigate to="/Dashboard" />
                }
                else{
                    setError(()=>"Quacosa è andato storto durante l'operazione");
       
                }
            }   
            else{
                setError(()=>"Quacosa è andato storto durante l'operazione");
            }
            
        }

        call_checkCode(params.code);
        // eslint-disable-next-line
    },[])


    return (
        <div className="container">
            <div style={{margin:"auto",textAlign:"center",paddingTop:"150px"}}>
            {error===undefined ? 
                
                    (
                    <div>
                        <h3>Account Attivato</h3>
                        <h3><Link to="/Login" replace={true}>Torna al Login</Link></h3>
                    </div>
                    )
                    :
                    (
                    <div>
                        <h3>{error}</h3>
                        <h3><Link to="/Login"replace={true}>Torna al Login</Link></h3>
                    </div>
                    )
            }
            </div>
        </div>
    )

}


export default ValidateAdmin