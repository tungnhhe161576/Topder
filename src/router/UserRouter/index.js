import { jwtDecode } from "jwt-decode"
import { Outlet } from "react-router-dom"
import ErrorPage from '../../pages/ErrorPage'
const UserRoutes = () => {
    
    return (
        
        <>
        {
            !!localStorage.getItem('token') &&
            jwtDecode(localStorage.getItem('token'))?.role === "Customer" 
                ?
                    <Outlet />
                : <ErrorPage />
        }
        </>
    )
}

export default UserRoutes