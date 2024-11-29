import React, { useEffect, useRef, useState } from "react";
import CommonLayout from "../../../components/Layouts/CommonLayout";
import {
	Col,
	Row,
	Select,
	Input,
	Button,
	Form,
	Slider,
	InputNumber,
	Dropdown,
	message,
	Pagination,
} from "antd";
import { RestaurantContainer } from "./styled";
import RestaurantItem from "../../../components/RestaurantItem";
import ModalRequestLogin from "../../../components/Modal/RequestLogin";
import ModalBookingTable from "../../../components/Modal/Booking";
import GuestService from "../../../services/GuestService";
import SpinCustom from "../../../components/Common/SpinCustom";
import axios from "axios";
import { formatNumber } from "../../../lib/stringUtils";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
const { Option } = Select;

const Restaurant = () => {
	const [form] = Form.useForm();
	const [openRequestLogin, setOpenRequestLogin] = useState(false);
	const [openModalBooking, setOpenModalBooking] = useState(false);
	const [loading, setLoading] = useState(false);
	const [text, setText] = useState("");
	const [data, setData] = useState([]);
	const [category, setCategory] = useState([]);
	const [cities, setCities] = useState([]);
	const [districts, setDistrits] = useState([]);
	const [communes, setCommunes] = useState([]);
	const [minPrice, setMinPrice] = useState(0);
	const [maxPrice, setMaxPrice] = useState(1000000);
	const [isChange, setIsChange] = useState(false);
	const location = useLocation();
	const categoryRestaurantId = location.state?.categoryRestaurantId;
	const [currentPage, setCurrentPage] = useState(1);
	const [dataSearch, setDataSearch] = useState({
		name: "",
		address: "",
		provinceCity: "",
		district: "",
		commune: "",
		restaurantCategory: categoryRestaurantId
			? categoryRestaurantId
			: undefined,
		minPrice: undefined,
		maxPrice: undefined,
		maxCapacity: undefined,
		pageNumber: 1,
		pageSize: 8,
	});
	const inputRef = useRef(null);

	//set up xử lý tìm kiếm bằng giọng nói
	useEffect(() => {
		const recognition = new (window.SpeechRecognition ||
			window.webkitSpeechRecognition)();
		recognition.lang = "vi-VN";
		recognition.interimResults = true;
		const handleVoiceSearch = () => {
			recognition.start();
			if (inputRef.current) {
				inputRef.current.focus();
			}
		};
		recognition.onresult = (event) => {
			const transcript = Array.from(event.results)
				.map((result) => result[0].transcript)
				.join("");
			if (event.results[0].isFinal) {
				form.setFieldsValue({ name: transcript });
				handleSearch();
			} else {
				form.setFieldsValue({ name: transcript });
			}
		};
		recognition.onerror = (event) => {
			message.open({
				content: "Lỗi nhận diện giọng nói",
				type: "error",
				style: {
					marginTop: "10vh",
				},
			});
		};
		document.getElementById("voice-search-btn").onclick = handleVoiceSearch;
	}, []);

	const getAllRestaurantCategory = async () => {
		try {
			const res = await GuestService.getAllRestaurantCategory();
			setCategory(res);
		} catch (error) {
			console.log(error);
		}
	};
	const getCities = async () => {
		try {
			const response = await axios.get(
				"https://esgoo.net/api-tinhthanh/1/0.htm"
			);
			setCities(response?.data?.data);
		} catch (error) {
			console.error("Error fetching cities:", error);
		}
	};
	const getDistricts = async (cityId) => {
		try {
			const res = await axios.get(
				`https://esgoo.net/api-tinhthanh/2/${cityId}.htm`
			);
			setDistrits(res.data.data);
		} catch (error) {
			console.error("Error fetching districts:", error);
		}
	};
	const getCommune = async (districtId) => {
		try {
			const res = await axios.get(
				`https://esgoo.net/api-tinhthanh/3/${districtId}.htm`
			);
			setCommunes(res.data.data);
		} catch (error) {
			console.error("Error fetching wards:", error);
		}
	};

	const handleCityChange = (value, option) => {
		getDistricts(option?.key);
	};
	const handleDistrictChange = (value, option) => {
		getCommune(option?.key);
	};

	useEffect(() => {
		getAllRestaurantCategory();
		getCities();
	}, []);

	const handleSearch = async () => {
		try {
			const formValues = await form.validateFields();
			const priceValues = formValues.price
				? formValues.price
				: [minPrice, maxPrice];

			setDataSearch((prev) => ({
				...prev,
				restaurantCategory: formValues.category,
				name: formValues.name,
				address: formValues.address,
				district: formValues.district,
				commune: formValues.commune,
				minPrice: priceValues[0],
				maxPrice: priceValues[1],
				maxCapacity: formValues?.maxCapacity,
			}));
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const res = await GuestService.getAllRestaurants(dataSearch);
				setData(res?.items);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [dataSearch, categoryRestaurantId]);

	// slider của giá tiền
	const items = [
		{
			label: (
				<div style={{ width: "300px" }}>
					<Form.Item name="price" className="m-0">
						<div>
							<div className="slider w-100 mr-10">
								<Slider
									onChange={(value) => {
										form.setFieldsValue({ price: value });
										setMinPrice(value[0]);
										setMaxPrice(value[1]);
										setIsChange(true);
									}}
									defaultValue={[minPrice, maxPrice]}
									max={1000000}
									range
									step={10000}
								/>
							</div>
							<div
								style={{
									display: "flex",
									justifyContent: "space-around",
								}}
							>
								<span>{formatNumber(minPrice)}</span>
								<span>Đến</span>
								<span>{formatNumber(maxPrice)}</span>
							</div>
						</div>
					</Form.Item>
				</div>
			),
			key: "0",
		},
	];
	const itemPerPage = 4;
	const onPageChange = (page) => {
		setCurrentPage(page);
	};
	const startIndex = (currentPage - 1) * itemPerPage;
	console.log("data", data);

	return (
		<CommonLayout>
			<RestaurantContainer>
				{/* form search */}
				<Form form={form} className="menu_search_area">
					<Row
						gutter={20}
						className="d-flex justify-content-center align-items-cemter"
					>
						{/* <Button id="voice-search-btn">🎤</Button> */}
						<Col span={22}>
							<Row
								gutter={[16, 0]}
								justify="center"
								align="middle"
							>
								{/* text */}
								<Col span={9}>
									<Form.Item
										name="name"
										className="search-text"
									>
										<Input
											allowClear
											ref={inputRef}
											placeholder="Nhập tên nhà hàng "
											className="input-text"
											addonAfter={
												<span
													className="voice-search"
													id="voice-search-btn"
												>
													🎤
												</span>
											}
										/>
									</Form.Item>
								</Col>
								{/* category */}
								<Col span={6}>
									<Form.Item
										name="category"
										className="menu_search"
									>
										<Select
											className="nice-select w-100"
											allowClear
											placeholder="Chọn loại nhà hàng"
											defaultValue={
												categoryRestaurantId
													? categoryRestaurantId
													: false
											}
										>
											{category?.map((c) => (
												<Option
													key={
														c?.categoryRestaurantId
													}
													value={
														c?.categoryRestaurantId
													}
												>
													{c?.categoryRestaurantName}
												</Option>
											))}
										</Select>
									</Form.Item>
								</Col>
								{/* price */}
								<Col span={4}>
									<div
										className={
											!isChange
												? "dropdown fill"
												: "dropdown filled"
										}
									>
										<Dropdown
											trigger={["click"]}
											menu={{
												items,
											}}
											placement="bottom"
											arrow={{
												pointAtCenter: true,
											}}
										>
											<div className="m-0 p-0">
												{!isChange ? (
													<span> Khoảng giá </span>
												) : (
													<span>
														{formatNumber(minPrice)}{" "}
														-{" "}
														{formatNumber(maxPrice)}
													</span>
												)}
											</div>
										</Dropdown>
									</div>
								</Col>
								{/* Sức chứa */}
								<Col span={4}>
									<Form.Item name="maxCapacity">
										<InputNumber placeholder="Sức chứa" />
									</Form.Item>
								</Col>
								{/* tỉnh */}
								<Col span={10}>
									<Form.Item
										name="address"
										className="menu_search"
									>
										<Select
											allowClear
											className="nice-select"
											placeholder="Chọn thành phố"
											showSearch
											optionFilterProp="children"
											filterOption={(input, option) =>
												option?.children
													.toLowerCase()
													.includes(
														input.toLowerCase()
													)
											}
											onChange={handleCityChange}
										>
											{cities?.map((c) => (
												<Option
													key={c?.id}
													value={c?.name}
												>
													{c?.full_name}
												</Option>
											))}
										</Select>
									</Form.Item>
								</Col>
								{/* districts */}
								<Col span={5}>
									<Form.Item
										name="district"
										className="menu_search"
									>
										<Select
											allowClear
											className="nice-select"
											placeholder="Chọn quận/huyện"
											showSearch
											optionFilterProp="children"
											filterOption={(input, option) =>
												option?.children
													.toLowerCase()
													.includes(
														input.toLowerCase()
													)
											}
											onChange={handleDistrictChange}
										>
											{districts?.map((d) => (
												<Option
													key={d?.id}
													value={d?.name}
												>
													{d?.full_name}
												</Option>
											))}
										</Select>
									</Form.Item>
								</Col>
								{/* commune */}
								<Col span={5}>
									<Form.Item
										name="commune"
										className="menu_search"
									>
										<Select
											allowClear
											className="nice-select"
											placeholder="Chọn xã/phường"
											showSearch
											optionFilterProp="children"
											filterOption={(input, option) =>
												option?.children
													.toLowerCase()
													.includes(
														input.toLowerCase()
													)
											}
										>
											{communes?.map((c) => (
												<Option
													key={c?.id}
													value={c?.name}
												>
													{c?.full_name}
												</Option>
											))}
										</Select>
									</Form.Item>
								</Col>
							</Row>
						</Col>

						{/* search */}
						<Col span={2} className="pr-20">
							<Form.Item className="menu_search">
								<Button
									type="primary"
									htmlType="submit"
									className="search-button"
									onClick={() => handleSearch()}
								>
									Tìm kiếm
								</Button>
							</Form.Item>
						</Col>
					</Row>
				</Form>

				{/* list restaurant */}
				<div className="list mt-30">
					<SpinCustom spinning={loading}>
						{data?.length === 0 ? (
							<div className="fs-18 fw-500 d-flex justify-content-center w-100 red mt-30">
								Không có dữ liệu
							</div>
						) : (
							<Row
								gutter={[30, 32]}
								className="d-flex justify-content-center"
							>
								{data
									?.slice(
										startIndex,
										startIndex + itemPerPage
									)
									?.map((r) => (
										<Col
											key={r?.uid}
											xs={12}
											sm={12}
											md={12}
											lg={6}
											xl={6}
										>
											<RestaurantItem
												setOpenRequestLogin={
													setOpenRequestLogin
												}
												setOpenModalBooking={
													setOpenModalBooking
												}
												data={r}
												setText={setText}
												isWishlist={false}
											/>
										</Col>
									))}
							</Row>
						)}
						<div className="pagination">
							<Pagination
								className="custom-pagination pb-20"
								itemRender={(page, type, originalElement) => {
									if (type === "prev") {
										return <LeftOutlined />;
									}
									if (type === "next") {
										return <RightOutlined />;
									}
									return originalElement;
								}}
								defaultCurrent={1}
								current={currentPage}
								pageSize={itemPerPage}
								total={data?.length}
								onChange={onPageChange}
							/>
						</div>
					</SpinCustom>
				</div>
			</RestaurantContainer>

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

export default Restaurant;
