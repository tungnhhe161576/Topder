import { jwtDecode } from "jwt-decode"
import { Outlet } from "react-router-dom"
import ErrorPage from '../../pages/ErrorPage'
const AdminRoutes = () => {
    
    return (
        <>
        {
            !!localStorage.getItem('token') &&
            jwtDecode(localStorage.getItem('token'))?.role === "Admin" 
                ? <Outlet />
                : <ErrorPage />
        }
        </>
    )
}

export default AdminRoutes