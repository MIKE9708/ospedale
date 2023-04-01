
import { logout_fun } from "../api_call/api_call";


const useLogout=()=>{


    const logout=async()=>{ 
        
        let res=await logout_fun();
            localStorage.setItem('briefToken',undefined);
            return res;
        
    }
    return logout;

}

export default useLogout;