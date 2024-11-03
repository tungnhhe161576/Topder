import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { userInfor } from "../../redux/Slice/userSlice";
import Decentralization from "../../pages/Decentralization";

const GuestRoutes = () => {
	const user = useSelector(userInfor);

	return (
		<>
			{user?.userInfo?.role !== "Restaurant" &&
			user?.userInfo?.role !== "Admin" ? (
				<Outlet />
			) : (
				<Decentralization />
			)}
		</>
	);
};

export default GuestRoutes;
