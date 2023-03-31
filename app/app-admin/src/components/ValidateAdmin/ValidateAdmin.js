import { useEffect } from 'react';
import { useParams,Navigate } from 'react-router';
import './ValidateAdmin.css'
import { checkCode,activateAccount } from '../../api_call/api_call';


function ValidateAdmin(){
    const params=useParams();
    const[error,setError] = useState();


    useEffect(()=>{
        const call_checkCode=async(code)=>{
            
            const call_activateAccount=async(code)=>{
                let res= await activateAccount({randstring:code});
                return res;
            }
            
            let res=await checkCode(code);
            console.log(res)
            if(res.error===undefined){
                let res = call_activateAccount(code);
                if(res.error===undefined){
                    return;
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
    },[])


    return (
        <div className="container">
            {error===undefined ? 
                (<p>Account Attivato torna al login</p>)
                :
                (<p>{error}</p>)
            }
        </div>
    )

}


export default ValidateAdmin