import { Navigate, Outlet } from "react-router"
import { useAuthStore } from "../stores/auth.store";

type Props = {
    allowedRoles?:string
}

export default function PrivateRoute ({ allowedRoles }:Props){
    const accessToken = useAuthStore((state)=> state.accessToken);
    const user = useAuthStore((state)=>state.user);
    
    if(!accessToken){
        return <Navigate to="/" />;
    }

    if(allowedRoles){
        if(!user || !allowedRoles.includes(user.role)){
            return <Navigate to="/unauthorized" />
        }
    }

    return <Outlet />;
}