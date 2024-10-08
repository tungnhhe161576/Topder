import React, { useState } from "react";
import {
	Row,
	Col,
	Input,
	Button,
	Upload,
	Select,
	TimePicker,
	Form,
	Image,
	InputNumber,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { RegisterRestaurantContainer } from "./styled";
import {
	getRegexEmail,
	getRegexPassowrd,
	getRegexPhoneNumber,
} from "../../../lib/stringUtils";
import logo from "../../../assets/images/logo.png";
import dayjs from "dayjs";

const getBase64 = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});

const RegisterRestaurant = () => {
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);
	const [openTime, setOpenTime] = useState(null);
	const nav = useNavigate();

	//images
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
		// <button
		// 	style={{
		// 		border: "2px dashed #ff7c08",
		// 		background: "none",
		// 	}}
		// 	type="button"
		// >
		// 	<PlusOutlined />
		// 	<div
		// 		style={{
		// 			marginTop: 8,
		// 		}}
		// 	>
		// 		Upload
		// 	</div>
		// </button>
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

	// time
	const handleOpenTimeChange = (time) => {
		setOpenTime(time);
	};

	const disabledCloseTime = () => {
		if (!openTime) return {};
		const openHour = openTime.hour();
		const openMinute = openTime.minute();

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

	const onFinish = (values) => {
		console.log("Form values: ", values);
	};

	//submit the form
	const handleRegister = async () => {
		try {
			setLoading(true);
			const values = await form.validateFields();
			const data = {
				// restaurantName: values.restaurantName,
				// ownerName: values.ownerName,
				// logo: values.logo[0].originFileObj,
				// address: values.address,
				// phoneNumber: values.phoneNumber,
				// email: values.email,
				// password: values.password,
				timeOpen: dayjs(values.timeOpen).format("HH:mm"),
				timeClose: dayjs(values.timeClose).format("HH:mm"),
			};
			console.log("form: ", data);
			console.log("data: ", data);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<RegisterRestaurantContainer>
			<div className="register-form-container">
				<header className="header-logo">
					<img
						width={150}
						src={logo}
						alt="Logo"
						onClick={() => nav("/")}
						style={{ cursor: "pointer" }}
					/>
				</header>

				<h2 className="primary">Đăng Ký - Nhà Hàng</h2>

				<Form
					form={form}
					name="register"
					onFinish={onFinish}
					layout="vertical"
					className="form-register"
				>
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
										message: "Vui lòng nhập tên nhà hàng",
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
												!visible && setPreviewImage(""),
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
										message: "Vui lòng nhập số điện thoại",
									},
									{
										pattern: getRegexPhoneNumber(),
										message: "Số điện thoại sai định dạng",
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
								/>
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={[24, 16]}>
						<Col xs={24} sm={24} md={12} lg={12}>
							<Form.Item
								name="city"
								label="Thành Phố"
								rules={[
									{
										required: true,
										message: "Vui lòng chọn thành phố",
									},
								]}
							>
								<Select
									showSearch
									style={{
										width: "100%",
									}}
									placeholder="Thành Phố"
									optionFilterProp="label"
									filterSort={(optionA, optionB) =>
										(optionA?.label ?? "")
											.toLowerCase()
											.localeCompare(
												(
													optionB?.label ?? ""
												).toLowerCase()
											)
									}
									options={[
										{
											value: "1",
											label: "Hà Nội",
										},
										{
											value: "2",
											label: "Hồ Chí Minh",
										},
									]}
								/>
							</Form.Item>
						</Col>

						<Col xs={24} sm={24} md={12} lg={12}>
							<Form.Item
								name="restaurantType"
								label="Loại Nhà Hàng"
								rules={[
									{
										required: true,
										message: "Vui lòng chọn loại nhà hàng",
									},
								]}
							>
								<Select
									showSearch
									style={{
										width: "100%",
									}}
									placeholder="Loại Nhà Hàng"
									optionFilterProp="label"
									filterSort={(optionA, optionB) =>
										(optionA?.label ?? "")
											.toLowerCase()
											.localeCompare(
												(
													optionB?.label ?? ""
												).toLowerCase()
											)
									}
									options={[
										{
											value: "1",
											label: "Quán trà sữa và cà phê",
										},
										{
											value: "2",
											label: "Nhà hàng gia đình",
										},
									]}
								/>
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
										message: "Vui lòng nhập giá đặt bàn",
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
										message: "Vui lòng nhập số lượng người",
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
					<Row gutter={[24, 16]}>
						<Col xs={24} sm={24} md={12} lg={12}>
							<Form.Item
								name="password"
								label="Mật Khẩu"
								rules={[
									{
										required: true,
										message: "Vui lòng nhập mật khẩu",
									},
									{
										pattern: getRegexPassowrd(),
										message: "Mật khẩu sai định dạng",
									},
								]}
							>
								<Input.Password
									style={{
										width: "100%",
									}}
									placeholder="Mật Khẩu"
								/>
							</Form.Item>
						</Col>

						<Col xs={24} sm={24} md={12} lg={12}>
							<Form.Item
								name="confirmPassword"
								label="Nhập Lại Mật Khẩu"
								dependencies={["password"]}
								rules={[
									{
										required: true,
										message: "Vui lòng nhập lại mật khẩu",
									},
									({ getFieldValue }) => ({
										validator(_, value) {
											if (
												!value ||
												getFieldValue("password") ===
													value
											) {
												return Promise.resolve();
											}
											return Promise.reject(
												new Error(
													"Mật khẩu nhập lại không khớp"
												)
											);
										},
									}),
								]}
							>
								<Input.Password
									style={{
										width: "100%",
									}}
									placeholder="Nhập Lại Mật Khẩu"
								/>
							</Form.Item>
						</Col>

						<Form.Item>
							<div className="mb-10 ml-10 fs-16 fw-600 notice">
								* Lưu ý: Mật khẩu gồm 6 kí tự, bao gồm chữ
								thường, chữ in hoa và 1 số
							</div>
						</Form.Item>
					</Row>

					<div className="register-submit">
						<Button
							onClick={handleRegister}
							loading={loading}
							type="primary"
							className="submit"
							shape="round"
						>
							Đăng Ký
						</Button>
					</div>
				</Form>
			</div>
		</RegisterRestaurantContainer>
	);
};

export default RegisterRestaurant;
