import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
	Button,
	Col,
	Row,
	Table,
	Form,
	Input,
	Select,
	TimePicker,
	Upload,
	Image,
	InputNumber,
	message,
	Switch,
} from "antd";

import {
	getRegexEmail,
	getRegexPhoneNumber,
} from "../../../../../lib/stringUtils";
import { ManageInfoContainer } from "./styled";
import { useSelector } from "react-redux";
import img from "../../../../../assets/images/logo.png";
import { userInfor } from "../../../../../redux/Slice/userSlice";
import ModalCustom from "../../../../../components/Common/ModalCustom";
import UserService from "../../../../../services/UserService";
import moment from "moment";
import axios from "axios";

const getBase64 = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});

const ManageInfomation = () => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const user = useSelector(userInfor);

	const [form] = Form.useForm();
	const [openTimes, setOpenTime] = useState(null);
	const [dataSource, setDataSource] = useState([]);
	const [categories, setCategories] = useState([]);

	const [cities, setCities] = useState([]);
	const [districts, setDistricts] = useState([]);
	const [wards, setWards] = useState([]);

	const [selectedCity, setSelectedCity] = useState(user.provinceCity);
	const [selectedDistrict, setSelectedDistrict] = useState(user.district);
	const [selectedWard, setSelectedWard] = useState(user.commune);

	// Hàm để lấy dữ liệu thành phố
	const getCities = async () => {
		try {
			const response = await axios.get(
				"https://esgoo.net/api-tinhthanh/1/0.htm"
			);
			const data = response.data;
			if (data.error === 0) {
				setCities(data.data);
			}
		} catch (error) {
			console.error("Error fetching cities:", error);
		}
	};

	// Hàm để lấy dữ liệu quận huyện
	const getDistricts = async (cityId) => {
		try {
			const response = await axios.get(
				`https://esgoo.net/api-tinhthanh/2/${cityId}.htm`
			);
			const data = response.data;
			if (data.error === 0) {
				setSelectedCity(cityId);
				setDistricts(data.data);
			}
		} catch (error) {
			console.error("Error fetching districts:", error);
		}
	};

	// Hàm để lấy dữ liệu phường xã
	const getWards = async (districtId) => {
		try {
			const response = await axios.get(
				`https://esgoo.net/api-tinhthanh/3/${districtId}.htm`
			);
			const data = response.data;
			if (data.error === 0) {
				setSelectedDistrict(districtId);
				setWards(data.data);
			}
		} catch (error) {
			console.error("Error fetching wards:", error);
		}
	};

	useEffect(() => {
		getCities();
	}, []);

	useEffect(() => {
		if (selectedCity) {
			getDistricts(selectedCity);
		}
	}, [selectedCity]);

	useEffect(() => {
		if (selectedDistrict) {
			getWards(selectedDistrict);
		}
	}, [selectedDistrict]);

	// Lấy thông tin người dùng từ Redux
	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await UserService.categoryResApi();
				setCategories(response);
			} catch (error) {
				console.error("Failed to fetch categories:", error);
			}
		};

		fetchCategories();
	}, []);
	console.log("user", categories);

	const handleBookingChange = async (checked, record) => {
		try {
			const response = await UserService.apiIsBookingEnabel(record.key, {
				isBookingEnabled: checked,
			});

			if (response.status === 200) {
				const newDataSource = dataSource.map((item) => {
					if (item.key === record.key) {
						return { ...item, booking: checked };
					}
					return item;
				});
				setDataSource(newDataSource);

				message.success(
					`Đã cập nhật trạng thái booking cho ${record.restaurantName}`
				);
			} else {
				message.error("Cập nhật trạng thái booking thất bại!");
			}
		} catch (error) {
			message.error("Có lỗi xảy ra khi cập nhật trạng thái booking!");
		}
	};

	const getNameById = (id, list) => {
		const item = list.find((x) => x.id === id);
		return item ? item.name : "N/A";
	};
	// Dữ liệu giả lập cho bảng
	useEffect(() => {
		const initialDataSource = [
			{
				key: user.uid,
				restaurantName: user.nameRes || "N/A",
				ownerName: user.nameOwner || "N/A",
				mainImage: user.logo || img,
				openTime:
					moment(user.openTime, "HH:mm").format("HH:mm") || "N/A",
				closeTime:
					moment(user.closeTime, "HH:mm").format("HH:mm") || "N/A",
				address: user.address || "N/A",
				province: getNameById(user.provinceCity, cities) || "N/A",
				maxCapacity: user.maxCapacity || 0,
				price: user.price || 0,
				booking: user.isBookingEnabled,
			},
		];
		setDataSource(initialDataSource);
	}, [user, cities]);

	const columns = [
		{
			title: "Tên Nhà Hàng",
			dataIndex: "restaurantName",
			key: "restaurantName",
		},
		{
			title: "Tên Chủ Nhà Hàng",
			dataIndex: "ownerName",
			key: "ownerName",
		},
		{
			title: "Hình Ảnh Chính",
			dataIndex: "mainImage",
			key: "mainImage",
			render: (mainImage) => (
				<img src={mainImage} alt="Main" width={80} />
			),
		},
		{
			title: "Thời Gian Mở Cửa",
			dataIndex: "openTime",
			key: "openTime",
		},
		{
			title: "Thời Gian Đóng Cửa",
			dataIndex: "closeTime",
			key: "closeTime",
		},
		{
			title: "Thành Phố",
			dataIndex: "province",
			key: "province",
		},
		{
			title: "Địa Chỉ",
			dataIndex: "address",
			key: "address",
		},
		{
			title: "Số Người Tối Đa",
			dataIndex: "maxCapacity",
			key: "maxCapacity",
		},
		{
			title: "Giá Đặt Bàn",
			dataIndex: "price",
			key: "price",
		},
		{
			title: "Booking",
			dataIndex: "booking",
			key: "booking",
			render: (text, record) => (
				<Switch
					checked={record.booking}
					onChange={(checked) => handleBookingChange(checked, record)}
				/>
			),
		},
	];
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState("");
	const [fileList, setFileList] = useState([]);

	const handlePreview = async (file) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj);
		}
		setPreviewImage(file.url || file.preview);
		setPreviewOpen(true);
	};
	const handleChange = ({ fileList: newFileList }) =>
		setFileList(newFileList);
	const uploadButton = (
		<button
			style={{
				border: "2px dashed #333",
				borderRadius: "8px",
				padding: "10px 20px",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				cursor: "pointer",
				transition: "all 0.3s ease",
				boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
			}}
			type="button"
			onMouseOver={(e) => {
				e.target.style.boxShadow = "0 6px 10px rgba(0, 0, 0, 0.15)";
			}}
			onMouseOut={(e) => {
				e.target.style.color = "black";
				e.target.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
			}}
		>
			<PlusOutlined
				style={{ backgroundColor: "transparent", color: "black" }}
			/>
		</button>
	);

	const handleOpenTimeChange = (time) => {
		setOpenTime(time);
	};

	const disabledCloseTime = () => {
		if (!openTimes) return {};
		const openHour = openTimes.hour();
		const openMinute = openTimes.minute();

		return {
			disabledHours: () => {
				const hours = [];
				for (let i = 0; i < openHour; i++) {
					hours.push(i);
				}
				return hours;
			},
			disabledMinutes: (selectedHour) => {
				if (selectedHour === openHour) {
					const minutes = [];
					for (let i = 0; i <= openMinute; i++) {
						minutes.push(i);
					}
					return minutes;
				}
				return [];
			},
		};
	};

	const showModal = () => {
		setIsModalVisible(true);

		form.setFieldsValue({
			restaurantName: user.nameRes,
			ownerName: user.nameOwner,
			address: user.address,
			phone: user.phone,
			logo: user.logo,
			email: user.email,
			openTime: moment(user.openTime, "HH:mm"),
			closeTime: moment(user.closeTime, "HH:mm"),
			maxCapacity: user.maxCapacity,
			price: user.price,
			categories: user.categoryRestaurantId,
			province: user.provinceCity,
			districts: user.district,
			commune: user.commune,
		});
	};
	const handleCancel = () => {
		form.resetFields();
		setIsModalVisible(false);
	};

	const handleOk = async () => {
		try {
			const values = await form.validateFields();

			const updatedData = {
				...dataSource[0],
				...values,
			};

			const result = await UserService.updateRestaurantInfor({
				uid: user.uid,
				...values,
			});

			if (result && result.success) {
				message.open({
					content: result.message || "Cập nhật thành công!",
					type: "success",
					style: {
						marginTop: "20vh",
					},
				});

				setDataSource([updatedData]);

				setIsModalVisible(false);
			} else {
				message.open({
					content: result.message || "Cập nhật thất bại!",
					type: "error",
					style: {
						marginTop: "20vh",
					},
				});
			}
		} catch (err) {
			console.error("Cập nhật thông tin không thành công:", err);
			message.open({
				content: "Có lỗi xảy ra khi cập nhật thông tin!",
				type: "error",
				style: {
					marginTop: "20vh",
				},
			});
		}
	};

	return (
		<ManageInfoContainer>
			<div>
				<div style={{ marginBottom: "20px", textAlign: "right" }}>
					<Button
						type="primary"
						style={{ height: 40 }}
						onClick={showModal}
					>
						Chỉnh Sửa Thông Tin
					</Button>
				</div>

				<Table
					dataSource={dataSource}
					columns={columns}
					rowKey="key"
					// pagination={{ pageSize: 4, position: ["bottomCenter"] }}
					pagination={false}
				/>

				<ModalCustom
					title="Chỉnh Sửa Thông Tin Nhà Hàng"
					visible={isModalVisible}
					onOk={handleOk}
					onCancel={handleCancel}
					okText="Chỉnh sửa"
					cancelText="Hủy"
				>
					<Form form={form} layout="vertical">
						<Row gutter={[24, 16]}>
							<Col
								xs={24}
								sm={24}
								md={12}
								lg={12}
								style={{ padding: "0 16px" }}
							>
								<Form.Item
									name="restaurantName"
									label="Tên Nhà Hàng"
									rules={[
										{
											required: true,
											message:
												"Vui lòng nhập tên nhà hàng",
										},
									]}
								>
									<Input
										style={{
											width: "100%",
										}}
										placeholder="Tên Nhà Hàng"
									/>
								</Form.Item>
							</Col>
							<Col
								xs={24}
								sm={24}
								md={12}
								lg={12}
								style={{ padding: "0 16px" }}
							>
								<Form.Item
									name="ownerName"
									label="Tên Chủ Nhà Hàng"
									rules={[
										{
											required: true,
											message:
												"Vui lòng nhập tên chủ nhà hàng",
										},
									]}
								>
									<Input
										style={{
											width: "100%",
										}}
										placeholder="Tên Chủ Nhà Hàng"
									/>
								</Form.Item>
							</Col>
						</Row>

						<Row gutter={[24, 16]}>
							<Col xs={24} sm={24} md={12} lg={12}>
								<Form.Item
									name="logo"
									label="Logo hoặc Ảnh Trang Đầu"
									valuePropName="fileList"
								>
									<Upload
										action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
										listType="picture-card"
										fileList={fileList}
										onPreview={handlePreview}
										onChange={handleChange}
										maxCount={1}
									>
										{fileList.length < 1 && uploadButton}
									</Upload>
									{previewImage && (
										<Image
											wrapperStyle={{
												display: "none",
											}}
											preview={{
												visible: previewOpen,
												onVisibleChange: (visible) =>
													setPreviewOpen(visible),
												afterOpenChange: (visible) =>
													!visible &&
													setPreviewImage(""),
											}}
											src={previewImage}
										/>
									)}
								</Form.Item>
							</Col>

							<Col xs={24} sm={24} md={12} lg={12}>
								<Form.Item
									name="address"
									label="Địa Chỉ"
									rules={[
										{
											required: true,
											message: "Vui lòng nhập địa chỉ",
										},
									]}
								>
									<Input
										style={{
											width: "100%",
										}}
										placeholder="Địa Chỉ"
									/>
								</Form.Item>
							</Col>
						</Row>
						<Row gutter={[24, 16]}>
							<Col xs={24} sm={24} md={12} lg={12}>
								<Form.Item
									name="phone"
									label="Số Điện Thoại"
									rules={[
										{
											required: true,
											message:
												"Vui lòng nhập số điện thoại",
										},
										{
											pattern: getRegexPhoneNumber(),
											message:
												"Số điện thoại sai định dạng",
										},
									]}
								>
									<Input
										style={{
											width: "100%",
										}}
										placeholder="Số Điện Thoại"
									/>
								</Form.Item>
							</Col>
							<Col xs={24} sm={24} md={12} lg={12}>
								<Form.Item
									name="email"
									label="Email"
									rules={[
										{
											required: true,
											message: "Vui lòng nhập email",
										},
										{
											pattern: getRegexEmail(),
											message: "Email sai định dạng",
										},
									]}
								>
									<Input
										style={{
											width: "100%",
										}}
										placeholder="Email"
										disabled
									/>
								</Form.Item>
							</Col>
						</Row>
						<Row gutter={[24, 16]}>
							{/* Tỉnh/Thành phố */}
							<Col xs={24} sm={24} md={12} lg={12}>
								<Form.Item
									label="Chọn Tỉnh Thành"
									name="province"
									rules={[
										{
											required: true,
											message:
												"Vui lòng chọn tỉnh thành!",
										},
									]}
								>
									<Select
										placeholder="Chọn Tỉnh Thành"
										style={{ width: "100%" }}
										onChange={(value) =>
											setSelectedCity(value)
										}
										value={selectedCity}
									>
										{cities.map((city) => (
											<Select.Option
												key={city.id}
												value={city.id}
											>
												{city.full_name}
											</Select.Option>
										))}
									</Select>
								</Form.Item>
							</Col>

							{/* Quận/Huyện */}
							<Col xs={24} sm={24} md={12} lg={12}>
								<Form.Item
									label="Chọn Quận Huyện"
									name="districts"
									rules={[
										{
											required: true,
											message:
												"Vui lòng chọn quận huyện!",
										},
									]}
								>
									<Select
										placeholder="Chọn Quận Huyện"
										style={{ width: "100%" }}
										onChange={(value) =>
											setSelectedDistrict(value)
										}
										value={selectedDistrict}
									>
										{districts.map((district) => (
											<Select.Option
												key={district.id}
												value={district.id}
											>
												{district.full_name}
											</Select.Option>
										))}
									</Select>
								</Form.Item>
							</Col>
						</Row>

						<Row gutter={[24, 16]}>
							{/* Phường/Xã */}
							<Col xs={24} sm={24} md={12} lg={12}>
								<Form.Item
									label="Chọn Phường Xã"
									name="commune"
									rules={[
										{
											required: true,
											message: "Vui lòng chọn phường xã!",
										},
									]}
								>
									<Select
										placeholder="Chọn Phường Xã"
										style={{ width: "100%" }}
										onChange={(value) =>
											setSelectedWard(value)
										}
										value={selectedWard}
									>
										{wards.map((ward) => (
											<Select.Option
												key={ward.id}
												value={ward.id}
											>
												{ward.full_name}
											</Select.Option>
										))}
									</Select>
								</Form.Item>
							</Col>
							<Col xs={24} sm={24} md={12} lg={12}>
								<Form.Item
									name="categories"
									label="Loại Nhà Hàng"
									rules={[
										{
											required: true,
											message:
												"Vui lòng chọn loại nhà hàng",
										},
									]}
								>
									<Select placeholder="Chọn loại nhà hàng">
										{Array.isArray(categories) &&
										categories.length > 0 ? (
											categories.map((category) => (
												<Select.Option
													key={
														category?.categoryRestaurantId
													}
													value={
														category?.categoryRestaurantId
													}
												>
													{
														category.categoryRestaurantName
													}
												</Select.Option>
											))
										) : (
											<Select.Option disabled>
												Không có loại nhà hàng nào
											</Select.Option>
										)}
									</Select>
								</Form.Item>
							</Col>
						</Row>

						<Row gutter={[24, 16]}>
							<Col xs={24} sm={24} md={12} lg={12}>
								<Form.Item
									name="openTime"
									label="Thời Gian Mở Cửa"
									style={{ width: "100%" }}
									rules={[
										{
											required: true,
											message:
												"Vui lòng chọn thời gian mở cửa",
										},
									]}
								>
									<TimePicker
										placeholder="Thời Gian Mở Cửa"
										style={{
											width: "100%",
										}}
										format="HH:mm"
										onChange={handleOpenTimeChange}
									/>
								</Form.Item>
							</Col>
							<Col xs={24} sm={24} md={12} lg={12}>
								<Form.Item
									name="closeTime"
									label="Thời Gian Đóng Cửa"
									style={{ width: "100%" }}
									rules={[
										{
											required: true,
											message:
												"Vui lòng chọn thời gian đóng cửa",
										},
									]}
								>
									<TimePicker
										placeholder="Thời Gian Đóng Cửa"
										style={{
											width: "100%",
										}}
										format="HH:mm"
										disabledTime={disabledCloseTime}
									/>
								</Form.Item>
							</Col>
						</Row>
						<Row gutter={[24, 16]}>
							<Col
								xs={24}
								sm={24}
								md={12}
								lg={12}
								style={{ padding: "0 16px" }}
							>
								<Form.Item
									name="price"
									label="Giá đặt bàn"
									rules={[
										{
											required: true,
											message:
												"Vui lòng nhập giá đặt bàn",
										},
										{
											type: "number",
											min: 1,
											message: "Giá phải lớn hơn 0",
										},
									]}
								>
									<InputNumber
										style={{
											width: "100%",
										}}
										placeholder="Giá đặt bàn"
									/>
								</Form.Item>
							</Col>
							<Col
								xs={24}
								sm={24}
								md={12}
								lg={12}
								style={{ padding: "0 16px" }}
							>
								<Form.Item
									name="maxCapacity"
									label="Số lượng người tối đa có thể chứa"
									rules={[
										{
											required: true,
											message:
												"Vui lòng nhập số lượng người",
										},
										{
											type: "number",
											min: 1,
											message:
												"Số lượng người phải lớn hơn 0",
										},
									]}
								>
									<InputNumber
										style={{
											width: "100%",
										}}
										placeholder="Số lượng người"
									/>
								</Form.Item>
							</Col>
						</Row>
					</Form>
				</ModalCustom>
			</div>
		</ManageInfoContainer>
	);
};

export default ManageInfomation;
