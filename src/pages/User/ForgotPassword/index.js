import React, { useState } from "react";
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
	//const [emailError, setEmailError] = useState("");
	const nav = useNavigate();

	const handleForgotPassByForm = async () => {
		try {
			setLoading(true);
			const values = await form.validateFields();
			const email = values.email;
			localStorage.setItem("forgotPasswordEmail", email);
			const res = await UserService.forgotPassword(email);
			message.open({
				content: res || "OTP đã được gửi đến email của bạn.",
				type: "success",
				style: {
					marginTop: "20vh",
				},
			});
			setTimeout(() => {
				nav("/verify-otp");
			}, 1000);
		} catch (error) {
			message.open({
				content: error.message || "Có lỗi xảy ra",
				type: "error",
				style: {
					marginTop: "20vh",
				},
			});
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
							{/* {emailError && (
								<div
									style={{
										color: "red",
										marginTop: "-15px",
										marginBottom: "10px",
									}}
								>
									{emailError}
								</div>
							)} */}
						</Form>

						{/* <div className="forgot-password fs-16 fw-600 primary-color">
                        * Quên mật khẩu
                    </div> */}

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
