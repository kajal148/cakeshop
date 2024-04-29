import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
    const  { userInfo } = useSelector((state) => state.auth);

    //putting replace here to replace any past history
    return userInfo ? <Outlet /> : <Navigate to="/login" replace />
}

export default PrivateRoute;