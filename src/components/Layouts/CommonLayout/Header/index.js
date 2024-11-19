import React, { useEffect, useState } from "react";
import { Avatar, Badge, Col, Dropdown, Row } from "antd";
import { useNavigate } from "react-router-dom";
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
import SpinCustom from '../../../Common/SpinCustom'

const IconFont = createFromIconfontCN({
	scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js",
});

const Header = () => {
	const nav = useNavigate();
	const dispatch = useDispatch();
	const activeButton = useSelector(getNav);
	const user = useSelector(userInfor);
	const [loading, setLoading] = useState(true)
	const [ads, setAds] = useState([])

	const getAds = async () => {
		try {
			// setLoading(true)
			const res = await GuestService.getAllAds()	
			setAds(res)
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false)
		}
	}
	useEffect(() => {
        getAds()
    }, [])

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
							<MailOutlined style={{ transform: "skew(0deg)" }} />{" "}
							topder.vn@gmail.com
						</span>
						<span>
							<PhoneOutlined
								style={{ transform: "skew(0deg)" }}
							/>{" "}
							0828 290 092
						</span>
						<span>
							<PhoneOutlined
								style={{ transform: "skew(0deg)" }}
							/>{" "}
							0931 589 123
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
									{" "}
									Nhà Hàng - Dịch Vụ{" "}
								</span>
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
						<Col xs={3} sm={3} md={3} lg={3} xl={3} className="d-flex align-items-center">
							<div className="notification mr-20">
								<Badge count={5} size="small">
									<div className="fs-22 fw-500">
										<BellOutlined />
									</div>
								</Badge>
							</div>
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
						{
							(!loading && ads.length > 0) ?
								ads?.map((i, index) => (
									<div className="item " key={index}>
										<figure>
											<img style={{borderRadius: '20px'}} src={i?.logo} alt="img" />
										</figure>
										<div className="content">
											<p
												className="category"
												onClick={() => nav("/restaurant-view")}
											>
												{i?.categoryName}
											</p>
											<h2>{i?.nameRes}</h2>
											<p className="description">
												{i?.title}
											</p>
											<div className="more">
												<button
													onClick={() => nav("/restaurant-detail/" + i?.uid)}
												>
													Đặt bàn
												</button>
												<button
													onClick={() => nav("/restaurant-detail/" + i?.uid)}
												>
													Xem chi tiết
												</button>
											</div>
										</div>
									</div>
								))
							: <div className="item ">
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
						}
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
