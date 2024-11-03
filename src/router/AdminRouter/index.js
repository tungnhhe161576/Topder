import { jwtDecode } from "jwt-decode";
import { Outlet } from "react-router-dom";
import Decentralization from "../../pages/Decentralization";
const AdminRoutes = () => {
	return (
		<>
			{!!localStorage.getItem("token") &&
			jwtDecode(localStorage.getItem("token"))?.role === "Admin" ? (
				<Outlet />
			) : (
				<Decentralization />
			)}
		</>
	);
};

export default AdminRoutes;
