
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";


export const RequireAuth = (allowedRoles) => {
    const {auth}  = useAuth();
    const location = useLocation();
    
    return ( 
        ( auth?.role?.find(role => allowedRoles.allowedRoles?.includes(role)) && auth?.accessToken ) 
        ? <Outlet /> : (allowedRoles.allowedRoles[0]==="doctor" ? <Navigate to="/doctor/login" state={{ from: location }} replace /> : <Navigate to="/login" state={{ from: location }} replace /> )
    )

}


