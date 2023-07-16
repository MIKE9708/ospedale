
import useAuth from "./useAuth";
import { refreshToken } from "../api_call/api_call";

const useRefreshToken = () => {
    
    const { setAuth } = useAuth();

    const refresh = async () => {
        
        const response = await refreshToken()
        if(!response.error){
            setAuth( prev => {
                return {
                    ...prev,
                    user:response.data.username,
                    accessToken: response.data.access_token,
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