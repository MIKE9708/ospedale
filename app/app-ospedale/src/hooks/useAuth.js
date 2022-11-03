import { useContext } from "react";
import AuthContext from "../context/auth/authContext";


const useAuth = () =>{
    
    return useContext(AuthContext);

}


export default useAuth;