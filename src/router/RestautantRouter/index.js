import { jwtDecode } from "jwt-decode"
import { Outlet } from "react-router-dom"
import ErrorPage from '../../pages/ErrorPage'
const RestaurantRoutes = () => {
    
    return (
        <>
        {
            !!localStorage.getItem('token') &&
            jwtDecode(localStorage.getItem('token'))?.role === "Restaurant" 
                ?
                    <Outlet />
                : <ErrorPage />
        }
        </>
    )
}

export default RestaurantRoutes