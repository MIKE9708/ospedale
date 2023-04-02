
import useAuth from "./useAuth";
import { refreshToken } from "../api_call/api_call";

const useRefreshToken = () => {
    
    const { setAuth } = useAuth();

    const refresh = async () => {
        
        const response = await refreshToken()
        console.log(response)
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
    return refresh;
};

export default useRefreshToken;