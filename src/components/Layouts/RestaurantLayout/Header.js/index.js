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
import { Badge, Dropdown, Menu } from "antd";
import { useEffect, useState } from "react";
import { onReceiveNoti, startConnection } from "../../../../hub";
import dayjs from "dayjs";
import UserService from "../../../../services/UserService";
import SpinCustom from "../../../Common/SpinCustom";
import { CustomMenuItem } from "../styled";

const Header = () => {
	const nav = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector(userInfor);
	const [loading2, setLoading2] = useState(true);
	const [notis, setNotis] = useState([]);
	const [numberNoti, setNumberNoti] = useState(6);
	const [isExpanded, setIsExpanded] = useState(false);

	const items = [
		{
			key: "1",
			label: (
				<span
					className="fs-16 fw-600"
					onClick={() => nav(`/restaurant/manage-restaurant`)}
				>
					Thông tin nhà hàng
				</span>
			),
		},
		{
			key: "2",
			label: (
				<span
					className="fs-16 fw-600 w-100"
					onClick={() => handleLogout()}
				>
					Đăng xuất
				</span>
			),
		},
	];

	const getListNoti = async () => {
		try {
			setLoading2(true);
			const notisRes = await UserService.getAllNoti(user?.uid);
			setNotis(notisRes);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading2(false);
		}
	};
	useEffect(() => {
		if (!!user) {
			getListNoti();
		}
	}, [user]);

	useEffect(() => {
		if (!!user) {
			const initSignalR = async () => {
				await startConnection();
				onReceiveNoti((data) => {
					console.log("data", data);

					const notiData = data.find((i) => i?.uid === user?.uid);
					console.log("noti", notiData);
					if (!!notiData) {
						setNotis((prev) => [notiData, ...prev]);
					}

					// dispatch(addNoti(notiData))
				});
			};

			initSignalR();

			return () => {
				// connection.stop();
			};
		}
	}, [user]);

	const handleLogout = () => {
		localStorage.removeItem("token");
		dispatch(setAccessToken(null));
		dispatch(setUserInformation(null));
		nav("/login");
	};

	const handleHandleRead = async (notification) => {
		try {
			await UserService.readNoti(notification?.notificationId);
			getListNoti();
			if (notification.type === "Đơn Hàng") {
				nav("/restaurant/manage-order");
			} else if (notification.type === "Hệ Thống Trừ Tiền Từ Ví" || notification.type === "Hệ Thống Cộng Tiền Từ Ví") {
				nav("/restaurant/wallet");
			} else if (notification.type === "Đánh Giá") {
				nav("/restaurant/manage-rate");
			} else if (notification.type === "Quảng Cáo") {
				nav("/restaurant/contact");
			}
		} catch (error) {
			console.log(error);
		}
	};
	const handleDeleteNotification = async (notification) => {
		try {
			await UserService.deleteNoti(
				user?.uid,
				notification?.notificationId
			);
			getListNoti();
		} catch (error) {
			console.log(error);
		}
	};
	const handleReadAllNoti = async () => {
		try {
			await UserService.readAllNoti(user?.uid);
			getListNoti();
		} catch (error) {
			console.log(error);
		}
	};
	const handleDeleteAllNoti = async () => {
		try {
			await UserService.deleteAllNoti(user?.uid);
			getListNoti();
		} catch (error) {
			console.log(error);
		}
	};
	const handleToggleNoti = () => {
		if (isExpanded) {
			setNumberNoti(6);
		} else {
			setNumberNoti((prev) => prev + 4);
		}
		setIsExpanded(!isExpanded);
	};

	const itemNotis = (
		<Menu>
			{notis?.length === 0 ? (
				<div
					className="w-100 pt-10 pb-10 pl-20 pr-20 d-flex fw-500"
					style={{ minWidth: "300px" }}
				>
					Không có thông báo nào
				</div>
			) : (
				<SpinCustom spinning={loading2}>
					<div
						style={{
							maxHeight: "600px",
							overflow: "auto",
							position: "relative",
						}}
					>
						{notis.slice(0, numberNoti).map((notification) => (
							<CustomMenuItem
								key={notification?.notificationId}
								style={
									notification?.isRead
										? { backgroundColor: "red" }
										: {
												fontWeight: "500",
												color: "#f07d22",
										  }
								}
							>
								<div
									className="w-90 mb-10"
									onClick={() =>
										handleHandleRead(notification)
									}
								>
									<div className="d-flex justify-content-space-between align-items-center pl-8 pr-8">
										<div
											className="fs-12"
											style={
												notification?.isRead
													? { color: "gray" }
													: { color: "#e9a671" }
											}
										>
											Ngày:{" "}
											{dayjs(
												notification?.createdAt
											).format("DD-MM-YYYY")}{" "}
										</div>
										<div className="">
											{" "}
											{notification?.type}{" "}
										</div>
									</div>
									<div className="mt-3">
										{" "}
										{notification?.content}{" "}
									</div>
								</div>
								<div
									className="w-10 d-flex justify-content-center align-items-center delete"
									onClick={(e) => {
										e.stopPropagation();
										handleDeleteNotification(notification);
									}}
								>
									x
								</div>
							</CustomMenuItem>
						))}
						<div
							className="d-flex justify-content-space-between align-items-center pl-5 pr-5 mt-5"
							style={{
								position: "sticky",
								bottom: 0,
								height: "40px",
								background: "#ddd",
								color: "black",
							}}
						>
							<div
								style={{ cursor: "pointer" }}
								onClick={(e) => {
									handleReadAllNoti();
									// e.stopPropagation();
								}}
							>
								Đánh dấu đọc tất cả thông báo
							</div>
							<div
								style={{ cursor: "pointer" }}
								onClick={handleToggleNoti}
							>
								{isExpanded
									? "Ẩn bớt thông báo"
									: "Hiển thị thêm thông báo"}
							</div>
							<div
								style={{ cursor: "pointer" }}
								onClick={(e) => {
									handleDeleteAllNoti();
									// e.stopPropagation();
								}}
							>
								Xóa tất cả thông báo
							</div>
						</div>
					</div>
				</SpinCustom>
			)}
		</Menu>
	);

	return (
		<div className="header">
			<div className="logo" onClick={() => nav("/restaurant/dashboard")}>
				<img src={logo} alt="logo-topder" />
			</div>
			<div className="options">
				{/* <div className="item search">
					<SearchOutlined />
				</div>
				<div className="item mail">
					<MailOutlined />
				</div> */}
				<div className="item notification">
					<Badge
						count={
							notis?.filter(
								(i) => i?.isRead === false
							).length
						}
						size="small"
					>
						<div className="fs-22 fw-500 w-100 notification">
							<Dropdown
								overlay={itemNotis}
								trigger={["click"]}
							>
								<BellOutlined />
							</Dropdown>
						</div>
					</Badge>
				</div>
				<div className="item user">
					<Dropdown
						menu={{
							items: items,
						}}
					>
						<div>
							<UserOutlined /> {user?.nameRes}
						</div>
					</Dropdown>
				</div>
			</div>
		</div>
	);
};

export default Header;
