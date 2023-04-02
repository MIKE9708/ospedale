import useAuth from "./useAuth";

const useStorageToken = () => {
    
    const { setAuth } = useAuth();

    const getStorageToken =  () => {
        
        const token = localStorage.getItem('briefToken');

        let decodedToken = JSON.parse(atob(token.split(".")[1])); 

        if( decodedToken && ( decodedToken.exp *1000  > Date.now() ) ){
            
            setAuth( prev => {

                return {
                    user:decodedToken.username,
                    accessToken: JSON.parse(token),
                }
            })

            return token;
        }

        else {
            localStorage.setItem('briefToken',undefined);
            return undefined;
        }

    }
    return getStorageToken;
};

export default useStorageToken;