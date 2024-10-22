import React, { useState, useEffect } from "react";
import LeftSide from "../../../components/LeftSideLogin";
import { Button, Col, Form, Input, Row, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { CloseOutlined } from "@ant-design/icons";
import { LoginContainer } from "../../Guest/LoginPage/styled";
import UserService from "../../../services/UserService";

const VerifyOTP = () => {
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);
	const nav = useNavigate();
	const [email, setEmail] = useState("");

	useEffect(() => {
		const storedEmail = localStorage.getItem("forgotPasswordEmail");
		if (storedEmail) {
			setEmail(storedEmail);
		} else {
			nav("/forgot-password");
		}
		console.log("Email", storedEmail);
	}, [nav]);

	const handleVerifyOTP = async () => {
		try {
			setLoading(true);
			const values = await form.validateFields();
			const otp = values.otp;
			const res = await UserService.verifyOTP({ email, otp });
			message.open({
				content: res || "OTP đã được xác thực thành công.",
				type: "success",
				style: {
					marginTop: "20vh",
				},
			});
			setTimeout(() => {
				nav("/reset-password");
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
								nav("/forgot-password");
							}}
						>
							<span className="fs-18 fw-600">Back</span>
						</Button>
						<Link to="/">
							<div className="button-close">
								<CloseOutlined />
							</div>
						</Link>
					</div>

					<div className="title">
						<span className="side1">OTP - Quên Mật Khẩu</span>
						<span className="side2">
							Kiểm tra hòm thư Email và lấy OTP!
						</span>
					</div>

					<div className="form mt-40 flex-column">
						<Form
							form={form}
							layout="vertical"
							initialValues={{ remember: true }}
						>
							<Form.Item
								name="otp"
								rules={[
									{
										required: true,
										message: "Hãy nhập OTP",
									},
								]}
								label={<span className="fw-600"> OTP </span>}
							>
								<Input placeholder="Vui lòng nhập OTP" />
							</Form.Item>
						</Form>

						<Button
							onClick={handleVerifyOTP}
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

export default VerifyOTP;
