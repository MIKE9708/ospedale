import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from '../../hooks/useRefreshToken';
import useAuth from '../../hooks/useAuth';
import useStorageToken from "../../hooks/useStorageToken";

const PersistLogin = () =>{

    const [ loading,setLoading ] = useState(true);
    const refresh = useRefreshToken();
    const storageToken = useStorageToken();
    const { auth,persist } = useAuth();
    //const [persist] = useLocalStorage('persist', false);

    
    useEffect(() => {

        let isMounted = true;

        const static_token = () => {
            try{
                storageToken();
            }
            catch(err){
                console.error(err);
            }
    
            finally{
                isMounted && setLoading(false);
            }
        }


        const verifyRefresh = async () => {
            try{
                await refresh();
            }

            catch(err){
                console.error(err);
            }

            finally{
                isMounted && setLoading(false);
            }
        }

        if(persist){
            !auth?.accessToken && persist ? verifyRefresh() : ( setLoading(false) );
        }

        else{
            !auth?.accessToken ? (static_token() ): (setLoading(false));
        }
        return () => isMounted = false;
        // eslint-disable-next-line
    } , [])


    useEffect(() => {

    }, [loading])


    return (
        <>
            {!persist && !loading
                ? <Outlet />
                : loading
                    ? <p>Loading...</p>
                    : <Outlet />
            }
        </>
    )

}

export default PersistLogin;