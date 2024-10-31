import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import { userInfor } from "../../redux/Slice/userSlice"
import ErrorPage from "../../pages/ErrorPage"

const GuestRoutes = () => {
  const user = useSelector(userInfor)

  return (
    <>
      {
        user?.userInfo?.role !== "Restaurant" && user?.userInfo?.role !== "Admin" 
            ?
            <Outlet />
            :
            <ErrorPage/>
      }
    </>
  )
}

export default GuestRoutes