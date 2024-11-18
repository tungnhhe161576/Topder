import React, { useState } from "react";
import {
	Button,
	Col,
	DatePicker,
	Form,
	Input,
	message,
	Radio,
	Row,
} from "antd";
import LeftSide from "../../../components/LeftSideLogin";
import { LoginContainer } from "../LoginPage/styled";
import { Link, useNavigate } from "react-router-dom";
import { CloseOutlined } from "@ant-design/icons";
import {
	getRegexEmail,
	getRegexPassowrd,
	getRegexPhoneNumber,
} from "../../../lib/stringUtils";
import dayjs from "dayjs";
import UserService from "../../../services/UserService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterPage = () => {
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);
	const [emailExists, setEmailExists] = useState(false);
	const nav = useNavigate();

	const handleRegister = async () => {
		try {
			const values = await form.validateFields();
			const emails = values.email;
			const emailCheck = await UserService.checkExisEmail(emails);
			if (
				emailCheck?.message ===
				"Email đã tồn tại trong hệ thống vui lòng thử một email khác ."
			) {
				setEmailExists(true);
				setLoading(false);
				return;
			}
		} catch (e) {
			try {
				setLoading(true);
				{
					const values = await form.validateFields();
					const data = {
						...values,
						uid: 0,
						dob: values?.dob
							? dayjs(values?.dob).format("YYYY-MM-DD")
							: null,
						gender:
							values?.gender === "Nam"
								? "Male"
								: values?.gender === "Nữ"
								? "Female"
								: "Other",
					};
					await UserService.registerCustomer({
						...data,
					});
					toast.success(
						"Đăng ký thành công. Vui lòng kiểm tra email để xác minh tài khoản",
						{
							autoClose: 5000,
							style: {
								fontSize: "18px",
								padding: "20px",
								borderRadius: "8px",
							},
						}
					);
					setTimeout(() => {
						nav("/login");
					}, 1000);
				}
			} catch (error) {
				message.open({
					content: "Đăng ký tài khoản không thành công",
					type: "error",
				});
			} finally {
				setLoading(false);
			}
		}
	};
	return (
		<LoginContainer>
			<Row>
				<LeftSide />

				<Col span={12} className="right-side">
					<div className="d-flex-end mt-60 mr-40">
						<Button
							type="primary"
							shape="round"
							style={{
								width: "120px",
								backgroundColor: "#ff7c08",
							}}
							onClick={() => {
								nav("/login");
							}}
						>
							<span className="fs-18 fw-600">Đăng nhập</span>
						</Button>

						<Link to="/">
							<div className="button-close">
								<CloseOutlined />
							</div>
						</Link>
					</div>

					<div className="title">
						<span className="side1">Đăng ký</span>
						<span className="side2">
							Chào mừng bạn đã đến với TOPDER!
						</span>
					</div>

					<div className="form mt-40 flex-column">
						<Form form={form} layout="vertical">
							<Form.Item
								name="name"
								rules={[
									{
										required: true,
										message: "Hãy nhập họ và tên của bạn",
									},
								]}
								label={
									<span className="fw-600 ml-10">
										{" "}
										Họ và Tên{" "}
									</span>
								}
							>
								<Input placeholder="Nhập họ và tên" />
							</Form.Item>
							<Form.Item
								name="phone"
								rules={[
									{
										required: true,
										message:
											"Hãy nhập số điện thoại của bạn",
									},
									{
										pattern: getRegexPhoneNumber(),
										message: "Số điện thoại sai định dạng",
									},
								]}
								label={
									<span className="fw-600 ml-10">
										{" "}
										Số điện thoại{" "}
									</span>
								}
							>
								<Input placeholder="Nhập số điện thoại" />
							</Form.Item>
							<Form.Item
								name="email"
								rules={[
									{
										required: true,
										message: "Hãy nhập email của bạn",
									},
									{
										pattern: getRegexEmail(),
										message: "Email sai định dạng",
									},
								]}
								label={
									<span className="fw-600 ml-10">
										{" "}
										Email{" "}
									</span>
								}
							>
								<Input placeholder="Nhập email" />
							</Form.Item>
							{emailExists && (
								<div
									className="error-message"
									style={{ color: "red", marginTop: "4px" }}
								>
									Email đã tồn tại trong hệ thống, vui lòng
									thử một email khác
								</div>
							)}
							<Form.Item
								name="dob"
								rules={[
									{
										required: true,
										message:
											"Hãy chọn ngày-tháng-năm sinh của bạn",
									},
								]}
								label={
									<span className="fw-600 ml-10">
										{" "}
										Ngày/Tháng/Năm sinh{" "}
									</span>
								}
							>
								<DatePicker placeholder="Hãy chọn ngày-tháng-năm sinh của bạn" />
							</Form.Item>
							<Form.Item
								name="gender"
								rules={[
									{
										required: true,
										message: "Hãy chọn giới tính",
									},
								]}
								label={
									<span className="fw-600 ml-10">
										{" "}
										Giới tính{" "}
									</span>
								}
							>
								<Radio.Group>
									<Radio value={"Nam"}>Nam</Radio>
									<Radio value={"Nữ"}>Nữ</Radio>
									<Radio value={"Khác"}>Khác</Radio>
								</Radio.Group>
							</Form.Item>
							<Form.Item
								className="mb-0"
								name="password"
								rules={[
									{
										required: true,
										message: "Hãy điền mật khẩu",
									},
									{
										pattern: getRegexPassowrd(),
										message: "Mật khẩu sai định dạng",
									},
								]}
								label={
									<span className="fw-600 ml-10">
										{" "}
										Mật khẩu{" "}
									</span>
								}
							>
								<Input.Password placeholder="Nhập mật khẩu" />
							</Form.Item>
							<div
								className="mb-20 ml-10 fs-12 red"
								style={{ fontStyle: "italic" }}
							>
								{" "}
								(Mật khẩu gồm 6 kí tự: bao gồm chữ thường, chữ
								in hoa và 1 số){" "}
							</div>
							<Form.Item
								name="confirmPassword"
								rules={[
									{
										required: true,
										message: "Hãy nhập lại mật khẩu",
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
													"Mật khẩu nhập lại chưa đúng!"
												)
											);
										},
									}),
								]}
								hasFeedback
								dependencies={["password"]}
								label={
									<span className="fw-600 ml-10">
										{" "}
										Nhập lại mật khẩu{" "}
									</span>
								}
							>
								<Input.Password placeholder="Nhập lại mật khẩu" />
							</Form.Item>
						</Form>

						<Button
							onClick={handleRegister}
							loading={loading}
							type="primary"
							className="submit-register"
							shape="round"
						>
							Đăng ký
						</Button>
					</div>
				</Col>
			</Row>
		</LoginContainer>
	);
};

export default RegisterPage;
