import React, { useEffect, useState } from "react";
import { Avatar, Badge, Col, Dropdown, Menu, Row } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import {
	BellOutlined,
	MailOutlined,
	PhoneOutlined,
	TikTokOutlined,
	createFromIconfontCN,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getNav, setActiveButton } from "../../../../redux/Slice/navSlice";
import topder from "../../../../assets/images/LOGO-TOPDER_qonl9l.png";
import logo2 from "../../../../assets/images/Logo2.png";
import {
	setUserInformation,
	userInfor,
} from "../../../../redux/Slice/userSlice";
import { setAccessToken } from "../../../../redux/Slice/accessTokenSlice";
import GuestService from "../../../../services/GuestService";
import SpinCustom from "../../../Common/SpinCustom";
import dayjs from "dayjs";
import { onReceiveNoti, startConnection } from "../../../../hub";
import UserService from "../../../../services/UserService";
import { CustomMenuItem } from "../styled";

const IconFont = createFromIconfontCN({
	scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js",
});

const Header = () => {
	const nav = useNavigate();
	const dispatch = useDispatch();
	const activeButton = useSelector(getNav);
	const user = useSelector(userInfor);
	const [loading, setLoading] = useState(true);
	const [loading2, setLoading2] = useState(true);
	const [ads, setAds] = useState([]);
	const [notis, setNotis] = useState([]);
	const [numberNoti, setNumberNoti] = useState(6);
	const [isExpanded, setIsExpanded] = useState(false);
	const [category, setCategory] = useState([]);
	const location = useLocation();

	const handleToggleNoti = () => {
		if (isExpanded) {
			setNumberNoti(6);
		} else {
			setNumberNoti((prev) => prev + 4);
		}
		setIsExpanded(!isExpanded);
	};

	console.log("noti", notis);

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
					const notiData = data.find((i) => i?.uid === user?.uid);
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

	const getAds = async () => {
		try {
			// setLoading(true)
			const res = await GuestService.getAllAds();
			setAds(res);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		getAds();
	}, []);

	const getAllRestaurantCategory = async () => {
		try {
			const res = await GuestService.getAllRestaurantCategory();
			setCategory(res);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getAllRestaurantCategory();
	}, []);

	const itemsDropdown = [
		{
			key: "1",
			label: (
				<span
					className="fs-16 fw-600"
					onClick={() => nav("/privacy-policy")}
				>
					Chính sách bảo mật
				</span>
			),
		},
		{
			key: "2",
			label: (
				<span
					className="fs-16 fw-600"
					onClick={() => nav("/terms-condition")}
				>
					Điều khoản và điều kiện
				</span>
			),
		},
	];

	const itemsDropdownProfile = [
		{
			key: "1",
			label: (
				<span
					className="fs-16 fw-600"
					onClick={() => nav(`/user-profile`)}
				>
					Thông tin cá nhân
				</span>
			),
		},
		{
			key: "2",
			label: (
				<span className="fs-16 fw-600" onClick={() => handleLogout()}>
					Đăng xuất
				</span>
			),
		},
	];

	const itemsCategory = category?.map((c) => ({
		key: c?.categoryRestaurantId,
		label: (
			<span
				className="fs-16 fw-600"
				onClick={() =>
					nav("/restaurant-view", {
						state: {
							categoryRestaurantId: c?.categoryRestaurantId,
						},
					})
				}
			>
				{c?.categoryRestaurantName}
			</span>
		),
	}));

	const handleHandleRead = async (notification) => {
		try {
			await UserService.readNoti(notification?.notificationId);
			getListNoti();
			if (notification.type === "Đơn Hàng") {
				nav("/user-profile/history-booking");
			} else if (notification.type === "Hệ Thống Trừ Tiền Từ Ví") {
				nav("/user-profile/transactiom-history");
			} else if (notification.type === "Đánh Giá") {
				nav("/user-profile/rates");
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

	const handleButtonClick = (buttonName) => {
		dispatch(setActiveButton(buttonName));
	};

	useEffect(() => {
		let prevBtn = document.getElementById("prev");
		let nextBtn = document.getElementById("next");
		let carousel = document.querySelector(".carousel");
		if (carousel) {
			let items = carousel.querySelectorAll(".list .item");
			let indicator = carousel.querySelector(".indicators");
			let dots = indicator.querySelectorAll(".indicators ul li");
			let active = 0;
			let firstPosition = 0;
			let lastPosition = items.length - 1;
			let autoPlay;

			const startAutoPlay = () => {
				clearInterval(autoPlay);
				autoPlay = setInterval(() => {
					nextBtn.click();
				}, 5000);
			};
			startAutoPlay();

			const setSlider = () => {
				let itemActiveOld =
					carousel.querySelector(".list .item.active");
				if (itemActiveOld) itemActiveOld.classList.remove("active");
				items[active].classList.add("active");

				let dotActiveOld = indicator.querySelector(
					".indicators ul li.active"
				);
				if (dotActiveOld) dotActiveOld.classList.remove("active");
				dots[active].classList.add("active");

				indicator.querySelector(".number").innerText =
					"0" + (active + 1);
				startAutoPlay();
			};
			setSlider();

			nextBtn.onclick = () => {
				active = active + 1 > lastPosition ? 0 : active + 1;
				carousel.style.setProperty("--calculation", 1);
				setSlider();
			};
			prevBtn.onclick = () => {
				active = active - 1 < firstPosition ? lastPosition : active - 1;
				carousel.style.setProperty("--calculation", -1);
				setSlider();
				clearInterval(autoPlay);
				autoPlay = setInterval(() => {
					nextBtn.click();
				}, 5000);
			};
			dots.forEach((item, position) => {
				item.onclick = () => {
					active = position;
					setSlider();
				};
			});
		}
	}, []);

	const handleLogout = () => {
		localStorage.removeItem("token");
		dispatch(setAccessToken(null));
		dispatch(setUserInformation(null));
		nav("/login");
	};

	console.log(ads);
	

	return (
		<>
			<div className="header">
				<div className="header-content">
					<div className="parallelogram">
						<span>
							<a
								style={{
									color: "inherit",
									textDecoration: "none",
								}}
								href="mailto:topder.vn@gmail.com"
							>
								<MailOutlined
									style={{ transform: "skew(0deg)" }}
								/>{" "}
								topder.vn@gmail.com
							</a>
						</span>
						<span>
							<a
								style={{
									color: "inherit",
									textDecoration: "none",
								}}
								href="tel:0828290092"
							>
								<PhoneOutlined
									style={{ transform: "skew(0deg)" }}
								/>{" "}
								0828 290 092
							</a>
						</span>
						<span>
							<a
								style={{
									color: "inherit",
									textDecoration: "none",
								}}
								href="tel:0931589123"
							>
								<PhoneOutlined
									style={{ transform: "skew(0deg)" }}
								/>{" "}
								0931 589 123
							</a>
						</span>
					</div>
					<div className="contact-icon">
						<div className="icon">
							<TikTokOutlined />{" "}
						</div>
						<div className="icon">
							<IconFont type="icon-facebook" />{" "}
						</div>
					</div>
				</div>
			</div>

			<div className="nav">
				<div
					className="d-flex justify-content-space-between"
					style={{ width: "90%", margin: "auto", height: "90px" }}
				>
					<Row className="d-flex justify-content-center align-items-center">
						<Col xs={6} sm={6} md={3} lg={3} xl={3}>
							<div
								className="logo-topder"
								onClick={() => nav("/")}
							>
								<img src={logo2} alt="logo-topder" />
							</div>
						</Col>
						<Col xs={15} sm={15} md={18} lg={18} xl={18}>
							<div className="list">
								<span
									style={
										activeButton === "home"
											? { color: "#f07d22" }
											: {}
									}
									onClick={() => {
										handleButtonClick("home");
										nav("/");
									}}
								>
									{" "}
									Trang Chủ{" "}
								</span>

								{location.pathname.includes(
									"/restaurant-view"
								) ? (
									<span
										style={
											activeButton === "restaurant"
												? { color: "#f07d22" }
												: {}
										}
										onClick={() => {
											handleButtonClick("restaurant");
											nav("/restaurant-view");
										}}
									>
										Nhà Hàng - Dịch Vụ
									</span>
								) : (
									<Dropdown
										menu={{
											items: itemsCategory,
										}}
									>
										<span
											style={
												activeButton === "restaurant"
													? { color: "#f07d22" }
													: {}
											}
											onClick={() => {
												handleButtonClick("restaurant");
												nav("/restaurant-view");
											}}
										>
											Nhà Hàng - Dịch Vụ
										</span>
									</Dropdown>
								)}

								{/* <Dropdown
									menu={{
										items: itemsCategory,
									}}
								>
									<span
										style={
											activeButton === "restaurant"
												? { color: "#f07d22" }
												: {}
										}
										onClick={() => {
											handleButtonClick("restaurant");
											nav("/restaurant-view");
										}}
									>
										Nhà Hàng - Dịch Vụ
									</span>
								</Dropdown> */}
								<span
									style={
										activeButton === "about-us"
											? { color: "#f07d22" }
											: {}
									}
								>
									<Dropdown
										menu={{
											items: itemsDropdown,
										}}
									>
										<span
											onClick={() => {
												handleButtonClick("about-us");
												nav("/about-us");
											}}
										>
											Về chúng tôi
										</span>
									</Dropdown>
								</span>
								<span
									style={
										activeButton === "blog"
											? { color: "#f07d22" }
											: {}
									}
									onClick={() => {
										handleButtonClick("blog");
										nav("/blog");
									}}
								>
									{" "}
									Blog{" "}
								</span>
								<span
									style={
										activeButton === "contact"
											? { color: "#f07d22" }
											: {}
									}
									onClick={() => {
										handleButtonClick("contact");
										nav("/contact");
									}}
								>
									{" "}
									Liên Hệ{" "}
								</span>
							</div>
						</Col>
						<Col
							xs={3}
							sm={3}
							md={3}
							lg={3}
							xl={3}
							className="d-flex align-items-center"
						>
							{!!user ? (
								<div className="notification mr-20">
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
							) : null}
							<div className="user-info">
								{!user ? (
									<div className="lo-re">
										<span
											className="login"
											onClick={() => nav("/login")}
										>
											Đăng Nhập
										</span>
										/
										<span
											className="register"
											onClick={() => nav("/register")}
										>
											Đăng Ký
										</span>
									</div>
								) : (
									<div className="user">
										<Dropdown
											menu={{
												items: itemsDropdownProfile,
											}}
										>
											<Avatar
												src={user?.image}
												size={56}
											/>
										</Dropdown>
									</div>
								)}
							</div>
						</Col>
					</Row>
				</div>
			</div>

			<SpinCustom spinning={loading}>
				<div className="carousel">
					<div className="list">
						{!loading && ads.length > 0 ? (
							ads?.map((i, index) => (
								<div className="item " key={index}>
									<figure>
										<img
											style={{ borderRadius: "20px" }}
											src={i?.logo}
											alt="img"
										/>
									</figure>
									<div className="content">
										<p
											className="category"
											onClick={() =>
												nav("/restaurant-view")
											}
										>
											{i?.categoryName}
										</p>
										<h2>{i?.nameRes}</h2>
										<p className="description">
											{i?.title}
										</p>
										<div className="more">
											<button
												onClick={() =>
													nav(
														"/restaurant-detail/" +
															i?.uid
													)
												}
											>
												Đặt bàn
											</button>
											<button
												onClick={() =>
													nav(
														"/restaurant-detail/" +
															i?.uid
													)
												}
											>
												Xem chi tiết
											</button>
										</div>
									</div>
								</div>
							))
						) : (
							<div className="item ">
								<figure>
									<img src={topder} alt="img" />
								</figure>
								<div className="content">
									<p
										className="category"
										onClick={() => nav("/restaurant-view")}
									>
										Việt Nam
									</p>
									<h2>Topder</h2>
									<p className="description">
										Nền tàng đặt bàn và món ăn
									</p>
								</div>
							</div>
						)}
					</div>
					<div className="arrows">
						<button id="prev"> {"<"} </button>
						<button id="next"> {">"} </button>
					</div>
					<div className="indicators">
						<div className="number">02</div>
						<ul>
							<li className="active"></li>
							<li></li>
							<li></li>
						</ul>
					</div>
				</div>
			</SpinCustom>
		</>
	);
};

export default Header;
