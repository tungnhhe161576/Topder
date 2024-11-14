import { InsertRowAboveOutlined, TableOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";

const LeftSide = () => {
	const nav = useNavigate();
	const location = useLocation();

	const isActive = (path) => location.pathname === path;


	return (
		<div className="left-side">
			<div
				className={`item dashboard ${
					isActive("/restaurant/dashboard") ? "active" : ""
				}`}
				onClick={() => nav("/restaurant/dashboard")}
			>
				<div className="item-icon">
					<TableOutlined />
				</div>
				<div className="item-name">Dashboard</div>
			</div>

			<div className="fs-16 fw-600 mt-15 mb-15 ml-30"> Quản lý </div>
			<div
				className={`item restaurant ${
					isActive("/restaurant/manage-restaurant") ? "active" : ""
				}`}
				onClick={() => nav("/restaurant/manage-restaurant")}
			>
				<div className="item-icon">
					<InsertRowAboveOutlined />
				</div>
				<div className="item-name"> Quản lý nhà hàng </div>
			</div>
			<div
				className={`item contact ${
					isActive("/restaurant/wallet") ? "active" : ""
				}`}
				onClick={() => nav("/restaurant/wallet")}
			>
				<div className="item-icon">
					<InsertRowAboveOutlined />
				</div>
				<div className="item-name"> Ví của bạn </div>
			</div>
			<div
				className={`item order ${
					isActive("/restaurant/manage-order") ? "active" : ""
				}`}
				onClick={() => nav("/restaurant/manage-order")}
			>
				<div className="item-icon">
					<InsertRowAboveOutlined />
				</div>
				<div className="item-name"> Quản lý đơn hàng </div>
			</div>
			<div
				className={`item rate ${
					isActive("/restaurant/manage-rate") ? "active" : ""
				}`}
				onClick={() => nav("/restaurant/manage-rate")}
			>
				<div className="item-icon">
					<InsertRowAboveOutlined />
				</div>
				<div className="item-name"> Quản lý đánh giá </div>
			</div>
			<div
				className={`item rate ${
					isActive("/restaurant/manage-discount") ? "active" : ""
				}`}
				onClick={() => nav("/restaurant/manage-discount")}
			>
				<div className="item-icon">
					<InsertRowAboveOutlined />
				</div>
				<div className="item-name"> Quản lý giảm giá </div>
			</div>
			<div
				className={`item rate ${
					isActive("/restaurant/manage-table") ? "active" : ""
				}`}
				onClick={() => nav("/restaurant/manage-table")}
			>
				<div className="item-icon">
					<InsertRowAboveOutlined />
				</div>
				<div className="item-name"> Quản lý bàn nhà hàng </div>
			</div>
			<div
				className={`item rate ${
					isActive("/restaurant/manage-menu") ? "active" : ""
				}`}
				onClick={() => nav("/restaurant/manage-menu")}
			>
				<div className="item-icon">
					<InsertRowAboveOutlined />
				</div>
				<div className="item-name"> Quản lý thực đơn </div>
			</div>
			<div
				className={`item contact ${
					isActive("/restaurant/contact") ? "active" : ""
				}`}
				onClick={() => nav("/restaurant/contact")}
			>
				<div className="item-icon">
					<InsertRowAboveOutlined />
				</div>
				<div className="item-name"> Liên hệ quảng cáo</div>
			</div>
		</div>
	);
};

export default LeftSide;
