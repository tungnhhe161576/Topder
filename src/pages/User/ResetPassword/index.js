import React, { useEffect, useState } from "react";
import LeftSide from "../../../components/LeftSideLogin";
import { Button, Col, Form, Input, message, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { CloseOutlined } from "@ant-design/icons";
import { getRegexPassowrd } from "../../../lib/stringUtils";
import { LoginContainer } from "../../Guest/LoginPage/styled";
import UserService from "../../../services/UserService";

const ReserPassword = () => {
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState("");
	const nav = useNavigate();

	useEffect(() => {
		const storedEmail = localStorage.getItem("forgotPasswordEmail");
		if (storedEmail) {
			setEmail(storedEmail);
		} else {
			nav("/forgot-password");
		}
		console.log("Email", storedEmail);
	}, [nav]);

	const handleResetPassByForm = async () => {
		try {
			setLoading(true);
			const values = await form.validateFields();
			const newPassword = values.newPassword;
			const res = await UserService.resetPassword({ email, newPassword });
			message.open({
				content: res || "Đặt lại mật khẩu thành công.",
				type: "success",
				style: {
					marginTop: "20vh",
				},
			});
			setTimeout(() => {
				nav("/login");
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
								nav("/verify-otp");
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
						<span className="side1">Đặt Lại Mật Khẩu</span>
						<span className="side2">Nhập lại mật khẩu mới!</span>
					</div>

					<div className="form mt-40 flex-column">
						<Form
							form={form}
							layout="vertical"
							initialValues={{ remember: true }}
						>
							{/* <Form.Item
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
							</Form.Item> */}
							<Form.Item
								className="mb-0 form-item"
								name="newPassword"
								rules={[
									{
										required: true,
										message: "Hãy điền mật khẩu!",
									},
									{
										pattern: getRegexPassowrd(),
										message: "Mật khẩu sai định dạng",
									},
								]}
								label={
									<span className="fw-600 ml-10">
										{" "}
										Mật khẩu mới
									</span>
								}
							>
								<Input.Password
									className="input"
									placeholder="Nhập mật khẩu mới"
								/>
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
								className="form-item"
								name="confirmNewPassword"
								rules={[
									{
										required: true,
										message: "Nhập lại mật khẩu cũ!",
									},
									({ getFieldValue }) => ({
										validator(_, value) {
											if (
												!value ||
												getFieldValue("newPassword") ===
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
								dependencies={["newPassword"]}
								label={
									<span className="fw-600 ml-10">
										{" "}
										Nhập lại mật khẩu mới{" "}
									</span>
								}
							>
								<Input.Password
									className="input"
									placeholder="Nhập lại mật khẩu mới"
								/>
							</Form.Item>
						</Form>

						{/* <div className="forgot-password fs-16 fw-600 primary-color">
                        * Quên mật khẩu
                    </div> */}

						<Button
							onClick={handleResetPassByForm}
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

export default ReserPassword;
