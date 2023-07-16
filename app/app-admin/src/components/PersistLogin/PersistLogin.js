import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from '../../hooks/useRefreshToken';
import useAuth from '../../hooks/useAuth';

const PersistLogin = () =>{

    const [ loading,setLoading ] = useState(true);
    const refresh = useRefreshToken();
    const { auth } = useAuth();
    //const [persist] = useLocalStorage('persist', false);

    
    useEffect(() => {

        let isMounted = true;

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

        
        !auth?.accessToken  ? verifyRefresh() : ( setLoading(false) );

        return () => isMounted = false;
        // eslint-disable-next-line
    } , [])


    useEffect(() => {

    }, [loading])


    return (
        <>
            { !loading
                ? <Outlet />
                : loading
                    ? <p>Loading...</p>
                    : <Outlet />
            }
        </>
    )

}

export default PersistLogin;