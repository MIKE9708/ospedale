import useAuth from "./useAuth";
import { refreshToken } from "../api_call/api";

const useRefreshToken = () => {
    
    const { setAuth } = useAuth();

    const refresh = async () => {
        
        const response = await refreshToken()
        console.log(response)
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
    return refresh;
};

export default useRefreshToken;