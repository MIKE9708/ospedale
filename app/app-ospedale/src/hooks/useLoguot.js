import { logout_fun } from "../api_call/api";
import useAuth from "./useAuth";

const useLogout=()=>{

    const {setAuth} = useAuth();
    const logout=async()=>{ 
        
        let res=await logout_fun();
            localStorage.setItem('briefToken',undefined);
            setAuth(() =>{})
            return res;

    }
    return logout;

}

export default useLogout;