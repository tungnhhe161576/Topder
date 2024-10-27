import { useNavigate } from "react-router-dom";
import logo from "../../../../assets/images/Logo2.png";
import {
	SearchOutlined,
	MailOutlined,
	BellOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
	setUserInformation,
	userInfor,
} from "../../../../redux/Slice/userSlice";
import { setAccessToken } from "../../../../redux/Slice/accessTokenSlice";

const Header = () => {
	const nav = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector(userInfor);

	const handleLogout = () => {
		localStorage.removeItem("token");
		dispatch(setAccessToken(null));
		dispatch(setUserInformation(null));
		nav("/login");
	};
	return (
		<div className="header">
			<div className="logo" onClick={() => nav("/restaurant/dashboard")}>
				<img src={logo} alt="logo-topder" />
			</div>
			<div className="options">
				<div className="item search">
					<SearchOutlined />
				</div>
				<div className="item mail">
					<MailOutlined />
				</div>
				<div className="item notification">
					<BellOutlined />
				</div>
				<div className="item user">
					{user ? (
						<div className="user-info">
							<span onClick={handleLogout}>
								<UserOutlined /> {user?.nameRes}/Đăng xuất
							</span>
						</div>
					) : (
						<UserOutlined />
					)}
				</div>
			</div>
		</div>
	);
};

export default Header;
