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
					isActive("/admin/dashboard") ? "active" : ""
				}`}
				onClick={() => nav("/admin/dashboard")}
			>
				<div className="item-icon">
					<TableOutlined />
				</div>
				<div className="item-name">Dashboard</div>
			</div>

			<div className="fs-16 fw-600 mt-15 mb-15 ml-30"> Quản lý </div>
			<div
				className={`item admin ${
					isActive("/admin/manage-account") ? "active" : ""
				}`}
				onClick={() => nav("/admin/manage-account")}
			>
				<div className="item-icon">
					<InsertRowAboveOutlined />
				</div>
				<div className="item-name"> Quản lý tài khoản </div>
			</div>
			<div
				className={`item order ${
					isActive("/admin/manage-order") ? "active" : ""
				}`}
				onClick={() => nav("/admin/manage-order")}
			>
				<div className="item-icon">
					<InsertRowAboveOutlined />
				</div>
				<div className="item-name"> Quản lý đơn hàng </div>
			</div>
			<div
				className={`item blog ${
					isActive("/admin/manage-blog") ? "active" : ""
				}`}
				onClick={() => nav("/admin/manage-blog")}
			>
				<div className="item-icon">
					<InsertRowAboveOutlined />
				</div>
				<div className="item-name"> Quản lý bài viết </div>
			</div>
			<div
				className={`item contact ${
					isActive("/admin/manage-contact") ? "active" : ""
				}`}
				onClick={() => nav("/admin/manage-contact")}
			>
				<div className="item-icon">
					<InsertRowAboveOutlined />
				</div>
				<div className="item-name"> Liên hệ </div>
			</div>
			<div
				className={`item contact ${
					isActive("/admin/manage-transaction") ? "active" : ""
				}`}
				onClick={() => nav("/admin/manage-transaction")}
			>
				<div className="item-icon">
					<InsertRowAboveOutlined />
				</div>
				<div className="item-name"> Quản lý giao dịch </div>
			</div>
		</div>
	);
};

export default LeftSide;
