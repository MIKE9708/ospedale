import useAuth from "./useAuth";
import { refreshToken } from "../api_call/api";

const useRefreshToken = () => {
    
    const { setAuth } = useAuth();

    const refresh = async () => {
        
        const response = await refreshToken()
        if(!response.error){

        setAuth( prev => {
            return {
                ...prev,
                role: [response.data.role],
                user:response.data.username,
                accessToken: response.data.access_token,
                id : response.data.id,
                persist:true
            }
        })

        return response.data.accessToken;
    }
    else {
            return "N/A"
        }
    }

    return refresh;
};

export default useRefreshToken;