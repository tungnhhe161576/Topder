import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { userInfor } from "../../redux/Slice/userSlice";
import Decentralization from "../../pages/Decentralization";

const CommonRole = () => {
	const user = useSelector(userInfor);

	return (
		<>
			{user?.role === "Restaurant" || user?.role === "Customer" || user?.role === "Admin" ? (
				<Outlet />
			) : (
				<Decentralization />
			)}
		</>
	);
};

export default CommonRole;
