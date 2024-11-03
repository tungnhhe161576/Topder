import { jwtDecode } from "jwt-decode";
import { Outlet } from "react-router-dom";
import Decentralization from "../../pages/Decentralization";
const UserRoutes = () => {
	return (
		<>
			{!!localStorage.getItem("token") &&
			jwtDecode(localStorage.getItem("token"))?.role === "Customer" ? (
				<Outlet />
			) : (
				<Decentralization />
			)}
		</>
	);
};

export default UserRoutes;
