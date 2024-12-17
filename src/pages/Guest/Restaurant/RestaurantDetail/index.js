import React, { useEffect, useRef, useState } from "react";
import CommonLayout from "../../../../components/Layouts/CommonLayout";
import { RestaurantDetailContainer } from "./styled";
import {
	Button,
	Col,
	DatePicker,
	Divider,
	Form,
	Image,
	Input,
	InputNumber,
	message,
	Rate,
	Row,
	Segmented,
} from "antd";
import { WechatOutlined } from "@ant-design/icons";
import RestaurantDescription from "./Description/RestaurantDescription";
import RestaurantRate from "./Description/RestaurantRate";
import {
	formatNumberToK,
	getRegexPhoneNumber,
} from "../../../../lib/stringUtils";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import RelatedRestaurant from "./RelatedRestaurant";
import { useParams } from "react-router-dom";
import GuestService from "../../../../services/GuestService";
import SpinCustom from "../../../../components/Common/SpinCustom";
import ModalRequestLogin from "../../../../components/Modal/RequestLogin";
import { useSelector } from "react-redux";
import { userInfor } from "../../../../redux/Slice/userSlice";
import UserService from "../../../../services/UserService";
import ModalChooseFood from "./Modal/ChooseFood";
import ModalChooseTable from "./Modal/ChooseTable";
import ModalCalFee from "./Modal/ModalCalFee";
import Policy from "./Description/Policy";
import ModalSuccess from "../../../../components/Modal/ModalSuccess";
import ModalReport from "./Modal/ModalReport";
import { SiGooglemaps } from "react-icons/si";
import Menus from "./Description/Menus";

const RestaurantDetail = () => {
	const [selectedOption, setSelectedOption] = useState("description");
	const [loading, setLoading] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [restaurantDetail, setRestaurantDetail] = useState();
	const [relatedRestaurant, setRelatedRestaurant] = useState([]);
	const [openModalChooseTable, setOpenModalChooseTable] = useState(false);
	const [tables, setTables] = useState([]);
	const [openModalChooseFood, setOpenModalChooseFood] = useState(false);
	const [openRequestLogin, setOpenRequestLogin] = useState(false);
	const [openModalCalFee, setOpenModalCalFee] = useState(false);
	const [text, setText] = useState("");
	const [foods, setFoods] = useState([]);
	const [totalAmount, setTotalAmount] = useState();
	const [wishlist, setWishList] = useState([]);
	const [isLiked, setIsLiked] = useState(false);
	const [isLikedButton, setIsLikedButton] = useState(false);
	const [date, setDate] = useState();
	const [time, setTime] = useState();
	const { restaurantId } = useParams();
	const [form] = Form.useForm();
	const user = useSelector(userInfor);
	const [showSuccessModal, setShowSuccessModal] = useState(false);
	const [openModalReport, setOpenModalReport] = useState(false);
	const [numberPerson, setNumberPerson] = useState(0);
	const numberPersonRef = useRef();
	const numberChildRef = useRef();
	// let hoursStep = 0
	// let minuteStep = 0

	// useEffect(() => {
    //     if (restaurantDetail?.tableGapTime) {
	// 		hoursStep = restaurantDetail.tableGapTime / 60;
	// 		minuteStep = restaurantDetail.tableGapTime % 60;
	// 	}
    // }, [restaurantDetail]);

	useEffect(() => {
		form.setFieldsValue({
			phoneReceiver: user?.phone,
			nameReceiver: user?.name,
		});
	}, [form, user]);

	//api get data chi tiet nha hang
	const getDataRestaurantDetail = async () => {
		try {
			setLoading(true);
			const res = await GuestService.apiRestaurantDetail(restaurantId);
			setRestaurantDetail(res);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const getAllRelatedRestaurant = async () => {
		try {
			setLoading(true);
			const res = await GuestService.getRelatedRestaurant(
				restaurantId,
				restaurantDetail?.categoryRestaurantId
			);
			setRelatedRestaurant(res);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const getWishlist = async () => {
		try {
			setLoading(true);
			const res = await UserService.getWishLish(user?.uid);
			setWishList(res);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getDataRestaurantDetail();
		if (user?.uid) {
			getWishlist();
		}
	}, [user, restaurantId]);

	useEffect(() => {
		if (restaurantDetail?.categoryRestaurantId) {
			getAllRelatedRestaurant();
		}
	}, [restaurantDetail]);

	//form dat ban
	const handleSubmitFormBooking = async () => {
		if (!user) {
			setOpenRequestLogin(true);
			setText("Bạn cần đăng nhập để đặt bàn");
			return;
		}
		if (!!!user.phone || !!!user.dob || !!!user.gender) {
			setOpenRequestLogin(true);
			setText(
				"Bạn cần cập nhật đầy đủ thông tin tài khoản trước khi đặt bàn!"
			);
			return;
		}
		try {
			setLoading(true);
			const menu = foods.map(({ menuId, quantity }) => ({
				menuId,
				quantity,
			}));
			const table = tables.map((t) => t.tableId);
			const total = await UserService.calTotalOrder({
				customerId: user?.uid,
				restaurantId: restaurantId,
				orderMenus: menu,
			});
			setTotalAmount(total);

			const formValues = await form.validateFields();

			const data = {
				customerId: user?.uid,
				restaurantId: restaurantId,
				discountId: undefined,
				// categoryRoomId: undefined,
				nameReceiver: formValues.nameReceiver,
				phoneReceiver: formValues.phoneReceiver,
				timeReservation: formValues?.time,
				dateReservation: formValues?.date?.$d,
				numberPerson: formValues?.numberPerson,
				numberChild: formValues?.numberChild
					? formValues?.numberChild
					: 0,
				contentReservation: formValues?.contentReservation,
				orderMenus: menu,
				tableIds: table,
			};
			setOpenModalCalFee(data);
			// setNumberPerson(data?.numberPerson + data?.numberChild)
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (wishlist) {
			setIsLiked(
				wishlist.find((item) => item.uid === restaurantDetail?.uid)
			);
			setIsLikedButton(
				wishlist.some((item) => item.uid === restaurantDetail?.uid)
			);
		}
	}, [restaurantDetail, wishlist]);

	const handleAddWishList = async () => {
		try {
			if (!user) {
				setOpenRequestLogin(true);
				setText(
					"Bạn phải đăng nhập trước khi thêm nhà hàng này vào yêu thích"
				);
			} else {
				await UserService.createWishList({
					customerId: user?.uid,
					restaurantId: restaurantId,
				});
				setIsLikedButton(false);
				message.open({
					content: "Thêm thành công",
					type: "success",
					style: {
						marginTop: "10vh",
					},
				});

				await getWishlist();
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleDeleteWishlist = async () => {
		try {
			setLoading(true);
			await UserService.deleteWishlist(user?.uid, isLiked?.wishlistId);
			setIsLikedButton(false);
			message.open({
				content: "Xóa thành công",
				type: "success",
				style: {
					marginTop: "10vh",
				},
			});
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const handleCreateChatBox = async () => {
		if (!user) {
			setOpenRequestLogin(true);
			setText("Bạn cần đăng nhập để nhắn tin với cửa hàng này");
			return;
		}
		try {
			const res = await UserService.checkExistChatBox(
				user?.uid,
				restaurantId
			);
			if (res) {
				message.open({
					content: "Cuộc hội thoại đã được tạo!",
					type: "success",
					style: {
						marginTop: "10vh",
					},
				});
			} else {
				await UserService.createChatBox({
					chatBoxId: 0,
					customerId: user?.uid,
					restaurantId: restaurantId,
				});
				message.open({
					content: "Tạo cuộc hội thoại thành công!",
					type: "success",
					style: {
						marginTop: "10vh",
					},
				});
			}
		} catch (error) {
			console.log(error);
		} finally {
		}
	};

	//xu ly slider hinh anh nha hang
	const nextImage = () => {
		setCurrentIndex(
			(prevIndex) => (prevIndex + 1) % restaurantDetail?.images.length
		);
	};
	const prevImage = () => {
		setCurrentIndex(
			(prevIndex) =>
				(prevIndex - 1 + restaurantDetail?.images.length) %
				restaurantDetail?.images.length
		);
	};
	const options = [
		{ label: "Mô Tả", value: "description" },
		{ label: "Món ăn", value: "menu" },
		{ label: "Đánh giá", value: "rate" },
		{ label: "Chính sách", value: "policy" },
	];
	const getDisabledHours = () => {
		const openTime = restaurantDetail?.openTime || "08:00";
		const closeTime = restaurantDetail?.closeTime || "23:00";

		const apiStartTime = dayjs(openTime, "HH:mm");
		const apiEndTime = dayjs(closeTime, "HH:mm");
		const selectedDate = form.getFieldValue("date");
		const currentDate = dayjs().startOf("day");

		const startHour = apiStartTime.hour();
		const endHour = apiEndTime.hour();
		const currentHour = dayjs().hour();

		const disabledHours = [];

		if (selectedDate.isSame(currentDate, "day")) {
			for (let i = 0; i < currentHour; i++) {
				if (i < startHour || i > endHour) {
					disabledHours.push(i);
				}
			}
			for (let i = 0; i < startHour; i++) {
				disabledHours.push(i);
			}
			for (let i = endHour + 1; i < 24; i++) {
				disabledHours.push(i);
			}
			for (let i = startHour; i < currentHour; i++) {
				if (!disabledHours.includes(i)) {
					disabledHours.push(i);
				}
			}
		} else {
			for (let i = 0; i < startHour; i++) {
				disabledHours.push(i);
			}
			for (let i = endHour + 1; i < 24; i++) {
				disabledHours.push(i);
			}
		}

		return disabledHours;
	};

	const getDisabledMinutes = (selectedHour) => {
		const openTime = restaurantDetail?.openTime || "08:00";
		const closeTime = restaurantDetail?.closeTime || "23:00";

		const apiStartTime = dayjs(openTime, "HH:mm");
		const apiEndTime = dayjs(closeTime, "HH:mm");
		const selectedDate = form.getFieldValue("date");
		const currentDate = dayjs().startOf("day");

		const startHour = apiStartTime.hour();
		const endHour = apiEndTime.hour();
		const currentHour = dayjs().hour();
		const currentMinute = dayjs().minute();

		const disabledMinutes = [];

		if (
			selectedDate.isSame(currentDate, "day") &&
			selectedHour === currentHour
		) {
			for (let i = 0; i < currentMinute; i++) {
				disabledMinutes.push(i);
			}
		}

		if (selectedHour === startHour) {
			const startMinute = apiStartTime.minute();
			for (let i = 0; i < startMinute; i++) {
				disabledMinutes.push(i);
			}
		}

		if (selectedHour === endHour) {
			const endMinute = apiEndTime.minute();
			for (let i = endMinute + 1; i < 60; i++) {
				disabledMinutes.push(i);
			}
		}

		if (selectedHour < startHour || selectedHour > endHour) {
			for (let i = 0; i < 60; i++) {
				disabledMinutes.push(i);
			}
		}

		return disabledMinutes;
	};

	const handleChangePerson = () => {
		setNumberPerson(numberPersonRef.current + numberChildRef.current);
	};

	return (
		<CommonLayout>
			<RestaurantDetailContainer>
				<SpinCustom spinning={loading}>
					<Row gutter={[16, 16]}>
						<Col span={16}>
							{/* thong tin nha hang */}
							<div className="information">
								<div className="d-flex justify-content-space-between align-items-center">
									<div className="fs-26 fw-700 mb-20">
										Thông tin cửa hàng
									</div>
									<div className="pr-20 d-flex align-items-center">
										<Button
											onClick={() =>
												setOpenModalReport(
													restaurantDetail
												)
											}
											title="Báo cáo nhà hàng"
										>
											Báo cáo
										</Button>
										<Button
											className="ml-10"
											onClick={() =>
												handleCreateChatBox()
											}
											title="Nhắn tin với nhà hàng"
										>
											<WechatOutlined className="fs-20" />
										</Button>
									</div>
								</div>
								<Row gutter={[16, 16]}>
									<Col
										xs={20}
										sm={20}
										md={12}
										lg={14}
										xl={14}
									>
										<div className="image-container">
											<img
												src={
													restaurantDetail?.images[
														currentIndex
													]?.imageUrl
												}
												alt="restaurant-image"
											/>
										</div>
										<div className="album-image">
											<div
												className="prev mr-5"
												onClick={prevImage}
											>
												<button> {"<"} </button>
											</div>
											<Row
												gutter={[5, 0]}
												className="row w-100"
											>
												{restaurantDetail?.images?.map(
													(_, index) => (
														<Col
															span={5}
															key={index}
														>
															<div
																className="image-item"
																style={
																	currentIndex ===
																	index
																		? {
																				border: "5px #ef7d22 solid",
																		  }
																		: {}
																}
															>
																<Image
																	className="img"
																	src={
																		restaurantDetail
																			?.images[
																			index
																		]
																			?.imageUrl
																	}
																/>
															</div>
														</Col>
													)
												)}
											</Row>
											<div
												className="next"
												onClick={nextImage}
											>
												<button> {">"} </button>
											</div>
										</div>
									</Col>

									<Col
										xs={15}
										sm={15}
										md={12}
										lg={10}
										xl={10}
									>
										<div className="pl-20">
											<div className="name fw-700 fs-26 mb-16">
												{restaurantDetail?.nameRes}
											</div>
											<div className="rate mb-5">
												<Rate
													className="primary fs-14"
													value={
														restaurantDetail?.star
													}
													disabled
												/>
												- (
												{
													restaurantDetail?.totalFeedbacks
												}{" "}
												đánh giá)
											</div>
											<div className="name fw-500 fs-16 mb-20">
												Loại cửa hàng:{" "}
												{restaurantDetail?.categoryName}
											</div>
											<div className="action-time mb-8">
												<div className="fs-16 fw-600 mb-5">
													Giờ hoạt động
												</div>
												<div>
													Mở cửa:{" "}
													{restaurantDetail?.openTime}
												</div>
												<div>
													Đóng cửa:{" "}
													{
														restaurantDetail?.closeTime
													}
												</div>
											</div>
											<div className="fs-16 fw-500">
												Giá đặt bàn:{" "}
												<span className="primary">
													{restaurantDetail?.price === 0 ? <span>Miễn phí</span> : (restaurantDetail?.discount > 0 ? <span><s style={{color: 'gray'}}>{formatNumberToK(restaurantDetail?.price)}</s> <span className="ml-10">{formatNumberToK(restaurantDetail?.price * (1 - restaurantDetail?.discount/100))}</span> </span> : <span>{formatNumberToK(restaurantDetail?.price)}</span>) }
													{/* {formatNumberToK(
														restaurantDetail?.price
													)} */}
												</span>
											</div>
											<div className="fs-16 fw-500 mb-15">
												Giá món ăn từ:{" "}
												<span className="primary">
													{formatNumberToK(
														restaurantDetail?.minPriceMenu
													)}{" "}
													-{" "}
													{formatNumberToK(
														restaurantDetail?.maxPriceMenu
													)}
												</span>
											</div>
											<div className="short-des mb-20">
												<span className="fs-16 fw-600">
													Sức chứa:
												</span>
												<span className="fs-16 fw-500 primary">
													{" "}
													{
														restaurantDetail?.maxCapacity
													}{" "}
													người
												</span>
											</div>
											<div className="address mb-20">
												<div className="fs-16 fw-600 mb-5">
													Địa chỉ
												</div>
												<div>
													<a
														href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
															restaurantDetail?.address
														)}`}
														target="_blank"
														rel="noopener noreferrer"
														style={{
															marginLeft: 8,
														}}
													>
														<SiGooglemaps
															style={{
																color: "red",
																fontSize:
																	"20px",
															}}
														/>
													</a>{" "}
													{restaurantDetail?.address}{" "}
													<div
														style={{ color: "red" }}
													>
														(Nhấn vào icon để xem
														chỉ đường)
													</div>
												</div>
											</div>
											<div>
												{!isLikedButton ? (
													<Button
														className="added-like"
														shape="round"
														onClick={() =>
															handleAddWishList()
														}
													>
														Thêm vào yêu thích
													</Button>
												) : (
													<Button
														className="added-like"
														shape="round"
														onClick={() =>
															handleDeleteWishlist()
														}
													>
														Xóa khỏi yêu thích
													</Button>
												)}
											</div>
										</div>
									</Col>
								</Row>
							</div>

							<div className="description">
								<div className="segment w-60">
									<Segmented
										options={options}
										block
										value={selectedOption}
										onChange={setSelectedOption}
										size="large"
										style={{ minWidth: "400px" }}
									/>
								</div>
								<Divider
									style={{ marginTop: "-2px" }}
									className="bg-primary mb-20"
								/>
								<div>
									{selectedOption === "description" ? (
										<RestaurantDescription
											restaurantDetail={restaurantDetail}
										/>
									) : selectedOption === "rate" ? (
										<RestaurantRate
											restaurantId={restaurantId}
										/>
									) : selectedOption === 'policy' ? (
										<Policy
											restaurantId={restaurantId}
											restaurantDetail={restaurantDetail}
										/>
									) : <Menus
											restaurantId={restaurantId}
											restaurantDetail={restaurantDetail}
										/>
									}
								</div>
							</div>
						</Col>

						{/* đặt bàn */}
						<Col span={8}>
							<div className="booking mt-50">
								<Row>
									{/* <Col span={12} className='left-side'></Col> */}
									<Col span={24} className="form-booking">
										<div className="p-5">
											<div className="pt-40 pl-20 white fs-24 fw-700">
												Đặt bàn
											</div>
											<Divider className="bg-white mt-10 mb-20" />
											<Form form={form} layout="vertical">
												<Row
													gutter={[24, 0]}
													className="d-flex justify-content-center"
												>
													{/* name */}
													<Col span={10}>
														<Form.Item
															name="nameReceiver"
															label={
																<span className="fs-14 white ml-8">
																	Tên người
																	nhận bàn
																</span>
															}
															rules={[
																{
																	required: true,
																	message: (
																		<span
																			style={{
																				color: "black",
																				marginLeft:
																					"15px",
																			}}
																		>
																			Hãy
																			nhập
																			tên
																			của
																			bạn!
																		</span>
																	),
																},
															]}
														>
															<Input
																className="input"
																placeholder="Nhập tên"
															/>
														</Form.Item>
													</Col>
													{/* phone number */}
													<Col span={10}>
														<Form.Item
															name="phoneReceiver"
															label={
																<span className="fs-14 white ml-8">
																	Số điện
																	thoại người
																	nhận
																</span>
															}
															rules={[
																{
																	required: true,
																	message: (
																		<span
																			style={{
																				color: "black",
																				marginLeft:
																					"15px",
																			}}
																		>
																			Hãy
																			nhập
																			số
																			điện
																			thoại
																			của
																			bạn!
																		</span>
																	),
																},
																{
																	pattern:
																		getRegexPhoneNumber(),
																	message: (
																		<span
																			style={{
																				color: "black",
																				marginLeft:
																					"15px",
																			}}
																		>
																			Số
																			điện
																			thoại
																			sai
																			định
																			dạng
																		</span>
																	),
																},
															]}
														>
															<Input
																className="input"
																placeholder="Nhập số điện thoại"
															/>
														</Form.Item>
													</Col>
													{/* ngay */}
													<Col span={10}>
														<Form.Item
															name="date"
															label={
																<span className="fs-14 white ml-8">
																	Ngày nhận
																</span>
															}
															rules={[
																{
																	required: true,
																	message: (
																		<span
																			style={{
																				color: "black",
																				marginLeft:
																					"15px",
																			}}
																		>
																			Hãy
																			chọn
																			ngày
																			nhận!
																		</span>
																	),
																},
															]}
														>
															<DatePicker
																onChange={(e) =>
																	setDate(e)
																}
																format="DD-MM-YYYY"
																className="input"
																placeholder="Chọn ngày"
																disabledDate={(
																	current
																) => {
																	return (
																		current &&
																		current <
																			dayjs().startOf(
																				"day"
																			)
																	);
																}}
															/>
														</Form.Item>
													</Col>
													{/* gio */}
													<Col span={10}>
														<Form.Item
															noStyle
															shouldUpdate
														>
															{({getFieldValue}) => {
																const selectedDate =
																	getFieldValue("date")
																return selectedDate ? (
																	<Form.Item
																		name="time"
																		label={
																			<span className="fs-14 white ml-8">
																				Giờ đặt bàn
																			</span>
																		}
																		rules={[
																			{
																				required: true,
																				message:
																					(
																						<span
																							style={{ color: "black", marginLeft: "15px"}}
																						>
																							Hãy chọn giờ cụ thể!
																						</span>
																					),
																			},
																			({ getFieldValue }) => ({
																				validator(_, value) {
																					const now = dayjs();
																					const selectedDate = getFieldValue('date');
																					if (!selectedDate || !value) {
																						return Promise.resolve(); 
																					}
																					const selectedTime = dayjs(selectedDate)
																						.hour(value.hour())
																						.minute(value.minute());
																					const diffInMinutes = selectedTime.diff(now, 'minute');
																					if (diffInMinutes >= 20) {
																						return Promise.resolve()
																					}
																					return Promise.reject(
																						<span
																						style={{
																							color: "black",
																						}}
																						className="ml-15"
																					> Thời gian chọn phải lớn hơn 30 phút so với hiện tại! </span>
																					);
																				},
																			}),
																		]}
																	>
																		<DatePicker
																			picker="time"
																			minuteStep={restaurantDetail?.tableGapTime % 60}
																			hourStep={restaurantDetail?.tableGapTime ? (1 + restaurantDetail?.tableGapTime / 60) : 1}
																			placeholder="Chọn giờ"
																			className="input"
																			format="HH:mm"
																			showTime={{
																				format: "HH:mm",
																				disabledHours:
																				getDisabledHours,
																				disabledMinutes:
																				getDisabledMinutes,
																			}}
																			showNow={false}
																			onChange={(
																				e
																			) =>
																				setTime(
																					e
																				)
																			}
																		/>
																	</Form.Item>
																) : null;
															}}
														</Form.Item>
													</Col>
													{/* so nguoi lon */}
													<Col span={10}>
														<Form.Item
															name="numberPerson"
															label={
																<span className="fs-14 white ml-8">
																	Số người lớn
																</span>
															}
															rules={[
																{
																	required: true,
																	message: (
																		<span
																			style={{
																				color: "black",
																				marginLeft:
																					"15px",
																			}}
																		>
																			Hãy
																			nhập
																			số
																			người
																			lớn!
																		</span>
																	),
																},
																{
																	validator: (
																		_,
																		value
																	) =>
																		(value > restaurantDetail?.maxCapacity || numberPerson > restaurantDetail?.maxCapacity)
																			? Promise.reject(
																					<span
																						style={{
																							color: "black",
																						}}
																						className="ml-15"
																					>
																						Vượt
																						quá
																						sức
																						chứa
																						của
																						nhà
																						hàng!
																					</span>
																			  )
																			: Promise.resolve(),
																},
															]}
														>
															<InputNumber
																min={1}
																className="input w-100"
																placeholder="Nhập số người lớn"
																// onChange={(e) => setNumberPerson(prev => prev + e)}
																onChange={(
																	e
																) => {
																	numberPersonRef.current =
																		e;
																	handleChangePerson();
																}}
															/>
														</Form.Item>
													</Col>
													{/* so tre em */}
													<Col span={10}>
														<Form.Item
															name="numberChild"
															label={
																<span className="fs-14 white ml-8">
																	Số trẻ em
																</span>
															}
															rules={[
																{
																	validator: (
																		_,
																		value
																	) =>
																		(value > restaurantDetail?.maxCapacity || numberPerson > restaurantDetail?.maxCapacity)
																			? Promise.reject(
																					<span
																						style={{
																							color: "black",
																						}}
																						className="ml-15"
																					>
																						Vượt
																						quá
																						sức
																						chứa
																						của
																						nhà
																						hàng!
																					</span>
																			  )
																			: Promise.resolve(),
																},
															]}
														>
															<InputNumber
																min={0}
																className="input w-100"
																placeholder="Nhập số trẻ em"
																// onChange={(e) => setNumberPerson(prev => prev + e)}
																onChange={(
																	e
																) => {
																	numberChildRef.current =
																		e;
																	handleChangePerson();
																}}
															/>
														</Form.Item>
													</Col>
													{/* yeu cau */}
													<Col span={20}>
														<Form.Item
															name="contentReservation"
															label={
																<span className="fs-16 white ml-8">
																	Yêu cầu
																</span>
															}
														>
															<TextArea
																rows={6}
																placeholder="Yêu cầu"
															/>
														</Form.Item>
													</Col>
													<div className="d-flex justify-content-center">
														<Form.Item
															noStyle
															shouldUpdate
														>
															{({
																getFieldValue,
															}) => {
																const selectedNumberPerson =
																	getFieldValue(
																		"numberPerson"
																	);
																return selectedNumberPerson ? (
																	<Form.Item name="chooseTable">
																		<Button
																			className="choose fs-16 fw-500 mr-10"
																			onClick={() =>
																				setOpenModalChooseTable(
																					true
																				)
																			}
																		>
																			Chọn
																			bàn
																		</Button>
																	</Form.Item>
																) : null;
															}}
														</Form.Item>
														<Form.Item name="ChooseFoods">
															<Button
																className="choose fs-16 fw-500"
																onClick={() =>
																	setOpenModalChooseFood(
																		true
																	)
																}
															>
																Chọn món ăn
															</Button>
														</Form.Item>
													</div>
													<Col span={20}>
														<Button
															className="button-submit w-100"
															htmlType="submit"
															onClick={() =>
																handleSubmitFormBooking()
															}
														>
															Đặt bàn
														</Button>
													</Col>
												</Row>
											</Form>
										</div>
									</Col>
								</Row>
							</div>
						</Col>
					</Row>
				</SpinCustom>

				{/* Nhà hàng liên quan */}
				<div className="related-restaurant mt-50">
					<SpinCustom spinning={loading}>
						<div className="fs-26 fw-700 mb-30">
							{" "}
							Cửa hàng liên quan{" "}
						</div>
						<Row
							gutter={[30, 32]}
							className="d-dlex justify-content-center"
						>
							{relatedRestaurant.length === 0 ? (
								<div className="fs-18 fw-500 d-flex justify-content-center w-100 red mt-30">
									Không có dữ liệu
								</div>
							) : (
								<>
									{relatedRestaurant
										.slice(0, 3)
										?.map((r, index) => (
											<Col
												key={index}
												xs={12}
												sm={12}
												md={12}
												lg={6}
												xl={6}
											>
												<RelatedRestaurant
													data={r}
													user={user}
												/>
											</Col>
										))}
								</>
							)}
						</Row>
					</SpinCustom>
				</div>
			</RestaurantDetailContainer>

			{!!openModalChooseTable && (
				<ModalChooseTable
					open={openModalChooseTable}
					onCancel={() => setOpenModalChooseTable(false)}
					setTables={setTables}
					tables={tables}
					restaurantId={restaurantId}
					date={date}
					time={time}
					numberPerson={numberPerson}
				/>
			)}
			{!!openModalChooseFood && (
				<ModalChooseFood
					open={openModalChooseFood}
					onCancel={() => setOpenModalChooseFood(false)}
					setFoods={setFoods}
					foods={foods}
					restaurantId={restaurantId}
				/>
			)}
			{!!openModalCalFee && (
				<ModalCalFee
					open={openModalCalFee}
					onCancel={() => {
						setOpenModalCalFee(false);
					}}
					openSucces={() => {
						setShowSuccessModal(true);
					}}
					restaurantId={restaurantDetail?.uid}
					userId={user?.uid}
					totalPrice={totalAmount}
					form={form}
					numberPerson={numberPerson}
				/>
			)}
			{!!openRequestLogin && (
				<ModalRequestLogin
					open={openRequestLogin}
					onCancel={() => setOpenRequestLogin(false)}
					text={text}
				/>
			)}
			{!!showSuccessModal && (
				<ModalSuccess
					open={showSuccessModal}
					onCancel={() => setShowSuccessModal(false)}
					text="Bạn đã đặt bàn thành công, kiểm tra lại trong lịch sử đặt bàn hoặc trong mail của bạn đã đăng ký"
				/>
			)}
			{!!openModalReport && (
				<ModalReport
					open={openModalReport}
					onCancel={() => setOpenModalReport(false)}
					user={user}
					setOpenRequestLogin={setOpenRequestLogin}
					setText={setText}
				/>
			)}
		</CommonLayout>
	);
};

export default RestaurantDetail;
