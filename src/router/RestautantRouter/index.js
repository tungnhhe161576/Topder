import { jwtDecode } from "jwt-decode";
import { Outlet } from "react-router-dom";
import Decentralization from "../../pages/Decentralization";
const RestaurantRoutes = () => {
	return (
		<>
			{!!localStorage.getItem("token") &&
			jwtDecode(localStorage.getItem("token"))?.role === "Restaurant" ? (
				<Outlet />
			) : (
				<Decentralization />
			)}
		</>
	);
};

export default RestaurantRoutes;
