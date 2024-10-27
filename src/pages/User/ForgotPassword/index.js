import React, { useEffect, useState } from "react";
import LeftSide from "../../../components/LeftSideLogin";
import { Button, Col, Form, Input, message, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { CloseOutlined } from "@ant-design/icons";
import { getRegexEmail } from "../../../lib/stringUtils";
import { LoginContainer } from "../../Guest/LoginPage/styled";
import UserService from "../../../services/UserService";

const ForgotPassword = () => {
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);
	const [emailExists, setEmailExists] = useState(false);
	const [showError, setShowError] = useState(false);
	const nav = useNavigate();

	const checkEmailExistence = async (email) => {
		try {
			const check = await UserService.checkExisEmail(email);
			setEmailExists(check);
		} catch (error) {
			message.error(
				"Email không tồn tại trong hệ thống, vui lòng thử lại."
			);
			setEmailExists(false);
		}
	};

	useEffect(() => {
		const email = form.getFieldValue("email");
		if (email) {
			const timeoutId = setTimeout(() => {
				checkEmailExistence(email);
			}, 1000);
			return () => clearTimeout(timeoutId);
		} else {
			setEmailExists(false);
		}
	}, [form.getFieldValue("email")]);

	const handleForgotPassByForm = async () => {
		setShowError(false);
		try {
			setLoading(true);
			const values = await form.validateFields();
			const email = values.email;

			if (!emailExists) {
				setShowError(true);
				return;
			}

			localStorage.setItem("forgotPasswordEmail", email);

			const res = await UserService.forgotPassword(email);
			message.open({
				content: res.message || "OTP đã được gửi đến email của bạn.",
				type: "success",
				style: {
					marginTop: "20vh",
				},
			});
			setTimeout(() => {
				nav("/verify-otp");
			}, 1000);
		} catch (error) {
		} finally {
			setLoading(false);
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
							<span className="fs-18 fw-600">Đăng Nhập</span>
						</Button>
						<Link to="/">
							<div className="button-close">
								<CloseOutlined />
							</div>
						</Link>
					</div>

					<div className="title">
						<span className="side1">Quên Mật Khẩu</span>
						<span className="side2">Hãy điền email của bạn!</span>
					</div>

					<div className="form mt-40 flex-column">
						<Form
							form={form}
							layout="vertical"
							initialValues={{ remember: true }}
						>
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
								label={<span className="fw-600"> Email </span>}
							>
								<Input placeholder="Email" />
							</Form.Item>
							{showError &&
								!emailExists && ( // Chỉ hiển thị khi nhấn nút và email không tồn tại
									<div
										className="error-message"
										style={{
											color: "red",
											marginTop: "4px",
										}}
									>
										Email không tồn tại trong hệ thống, vui
										lòng thử lại.
									</div>
								)}
						</Form>

						<Button
							onClick={handleForgotPassByForm}
							htmlType="submit"
							loading={loading}
							type="primary"
							className="submit"
							shape="round"
						>
							Tiếp tục
						</Button>
					</div>
				</Col>
			</Row>
		</LoginContainer>
	);
};

export default ForgotPassword;
