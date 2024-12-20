import React, { useEffect, useState } from "react";
import CommonLayout from "../../../components/Layouts/CommonLayout";
import { HomeContainer } from "./styled";
import { Button, Col, Row } from "antd";
import logo from "../../../assets/images/mini-logo.jpg";
import RestaurantItem from "../../../components/RestaurantItem";
import { useNavigate } from "react-router-dom";
import image1 from "../../../assets/images/Image1.png";
import image2 from "../../../assets/images/image2.png";
import BlogItem from "../../../components/BlogItem";
import ModalRequestLogin from "../../../components/Modal/RequestLogin";
import ModalBookingTable from "../../../components/Modal/Booking";
import GuestService from "../../../services/GuestService";
import SpinCustom from "../../../components/Common/SpinCustom";

const HomePage = () => {
	const nav = useNavigate();
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const [openRequestLogin, setOpenRequestLogin] = useState(false);
	const [openModalBooking, setOpenModalBooking] = useState(false);
	const [text, setText] = useState("");

	const getData = async () => {
		try {
			setLoading(true);
			const res = await GuestService.apiHomePageData();
			setData(res);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<CommonLayout>
			<HomeContainer>
				<SpinCustom spinning={loading}>
					<div className="session1">
						<div className="mb-10">
							<span className="mr-10 heading"> Topder </span>
							<img src={logo} alt="logo" />
						</div>
						<div className="d-flex justify-content-space-between align-items-center mb-30">
							<span className="title">Nhà Hàng Mới</span>
							<Button
								style={{ width: "150px", height: "40px" }}
								onClick={() => nav("/restaurant-view")}
							>
								Xem nhiều hơn
							</Button>
						</div>
						<div className="mt-20">
							<Row
								gutter={[30, 24]}
								className="d-flex justify-content-center"
							>
								{data?.newRestaurants?.map((r, index) => (
									<Col
										key={index}
										xs={12}
										sm={12}
										md={12}
										lg={6}
										xl={6}
									>
										<RestaurantItem
											data={r}
											setOpenRequestLogin={
												setOpenRequestLogin
											}
											setOpenModalBooking={
												setOpenModalBooking
											}
											setText={setText}
											isWishlist={false}
										/>
									</Col>
								))}
							</Row>
						</div>
					</div>

					<div className="session2">
						<Row gutter={[24, 24]}>
							<Col
								xs={24}
								sm={24}
								md={12}
								lg={12}
								xl={12}
								className="session2-image"
							>
								<div className="image-container">
									<img src={image1} alt="session3-1" />
								</div>
								<div className="content">
									<div className="heading mb-16">Topder</div>
									<div className="title mb-13">
										Đặt bàn nhanh chóng
									</div>
									<div className="fs-17">
										Bạn cần đặt bàn ngay bây giờ? Với nền
										tảng của chúng tôi, bạn có thể đặt bàn
										chỉ trong vài giây. Không cần chờ đợi,
										không cần gọi điện, chỉ cần click vào
										nút "Đặt Bàn Ngay" và bàn của bạn sẽ
										được xác nhận
									</div>
									<div
										className="booking"
										onClick={() => nav("/restaurant-view")}
									>
										Đặt Bàn Ngay -{">"}
									</div>
								</div>
							</Col>
							<Col
								xs={24}
								sm={24}
								md={12}
								lg={12}
								xl={12}
								className="session2-image"
							>
								<div className="image-container">
									<img src={image2} alt="session3-2" />
								</div>
								<div className="content">
									<div className="heading mb-16">Topder</div>
									<div className="title mb-13">
										Quản lý thời gian{" "}
									</div>
									<div className="fs-17">
										Bạn luôn lo lắng về việc trễ hẹn? Với
										tính năng quản lý thời gian của nền tảng
										của chúng tôi, bạn có thể dễ dàng theo
										dõi thời gian và nhận thông báo kịp
										thời. Không bao giờ phải lo lắng về việc
										đến muộn nữa
									</div>
									<div
										className="booking"
										onClick={() => nav("/restaurant-view")}
									>
										Đặt Bàn Ngay -{">"}
									</div>
								</div>
							</Col>
						</Row>
					</div>

					<div className="session3">
						<div className="mb-10">
							<span className="mr-10 heading"> Topder </span>
							<img src={logo} alt="logo" />
						</div>
						<div className="d-flex justify-content-space-between align-items-center mb-30">
							<span className="title">
								Nhà Hàng Được Ưa Chuộng Nhất{" "}
							</span>
							<Button
								style={{ width: "150px", height: "40px" }}
								onClick={() => nav("/restaurant-view")}
							>
								Xem nhiều hơn
							</Button>
						</div>
						<div>
							<Row
								gutter={[30, 24]}
								className="d-flex justify-content-center"
							>
								{data?.topBookingRestaurants?.map(
									(r, index) => (
										<Col
											key={index}
											xs={12}
											sm={12}
											md={12}
											lg={6}
											xl={6}
										>
											<RestaurantItem
												data={r}
												setOpenRequestLogin={
													setOpenRequestLogin
												}
												setOpenModalBooking={
													setOpenModalBooking
												}
												setText={setText}
												isWishlist={false}
											/>
										</Col>
									)
								)}
							</Row>
						</div>
					</div>

					<div className="session4">
						<div className="mb-10">
							<span className="mr-10 heading"> Topder </span>
							<img src={logo} alt="logo" />
						</div>
						<div className="d-flex justify-content-space-between align-items-center mb-30">
							<span className="title">Nhà Hàng Hàng Đầu</span>
							<Button
								style={{ width: "150px", height: "40px" }}
								onClick={() => nav("/restaurant-view")}
							>
								Xem nhiều hơn
							</Button>
						</div>
						<div>
							<Row
								gutter={[30, 24]}
								className="d-flex justify-content-center"
							>
								{data?.topRatingRestaurant?.map((r, index) => (
									<Col
										key={index}
										xs={12}
										sm={12}
										md={12}
										lg={6}
										xl={6}
									>
										<RestaurantItem
											data={r}
											setOpenRequestLogin={
												setOpenRequestLogin
											}
											setOpenModalBooking={
												setOpenModalBooking
											}
											setText={setText}
											isWishlist={false}
										/>
									</Col>
								))}
							</Row>
						</div>
					</div>

					<div className="session5">
						<div className="mb-10">
							<span className="mr-10 heading">
								{" "}
								News & Blogs{" "}
							</span>
							<img src={logo} alt="logo" />
						</div>
						<div className="d-flex justify-content-space-between align-items-center mb-30">
							<span className="title">Các Blog Mới Nhất</span>
							<Button
								style={{ width: "150px", height: "40px" }}
								onClick={() => nav("/blog")}
							>
								Xem nhiều hơn
							</Button>
						</div>
						<div>
							<Row
								gutter={[30, 24]}
								className="d-flex justify-content-center"
							>
								{data?.blogs?.map((b, index) => (
									<Col
										key={index}
										xs={12}
										sm={12}
										md={12}
										lg={6}
										xl={6}
									>
										<BlogItem data={b} />
									</Col>
								))}
							</Row>
						</div>
					</div>
				</SpinCustom>
			</HomeContainer>

			{!!openRequestLogin && (
				<ModalRequestLogin
					open={openRequestLogin}
					onCancel={() => setOpenRequestLogin(false)}
					text={text}
				/>
			)}

			{!!openModalBooking && (
				<ModalBookingTable
					open={openModalBooking}
					onCancel={() => setOpenModalBooking(false)}
					text={text}
				/>
			)}
		</CommonLayout>
	);
};

export default HomePage;
