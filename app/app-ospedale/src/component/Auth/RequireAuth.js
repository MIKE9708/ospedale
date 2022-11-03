
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";


export const RequireAuth = (allowedRoles) => {
    const {auth}  = useAuth();
    const location = useLocation();
    
    return ( 
        ( auth?.role?.find(role => allowedRoles.allowedRoles?.includes(role)) && auth?.accessToken ) 
        ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />
    )

}


