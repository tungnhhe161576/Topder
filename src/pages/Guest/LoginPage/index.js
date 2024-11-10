import React, { useState } from "react";
import { LoginContainer } from "./styled";
import LeftSide from "../../../components/LeftSideLogin";
import { Button, Checkbox, Col, Form, Input, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { CloseOutlined, GoogleOutlined } from "@ant-design/icons";
import { getRegexEmail } from "../../../lib/stringUtils";
import UserService from "../../../services/UserService";
import { useDispatch } from "react-redux";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { setUserInformation } from "../../../redux/Slice/userSlice";
import { setAccessToken } from "../../../redux/Slice/accessTokenSlice";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const LoginPage = () => {
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);
	const nav = useNavigate();
	const dispatch = useDispatch();
	const [rememberMe, setRememberMe] = useState(false);
	const [textError, setTextError] = useState(false);

	const handleLoginByForm = async () => {
		const values = await form.validateFields();
		try {
			setLoading(true);
			const res = await UserService.loginApi(values);
			if (rememberMe) {
				localStorage.setItem("token", res.data.token);
			} else {
				sessionStorage.setItem("token", res.data.token);
			}
			localStorage.setItem("token", res.data.token);
			dispatch(setUserInformation(res.data.userInfo));
			dispatch(setAccessToken(res.data.token));
			toast("Đăng nhập thành công!");

			if (res.data.userInfo.role === "Customer") {
				nav("/");
			} else if (res.data.userInfo.role === "Restaurant") {
				nav("/restaurant/dashboard");
			} else {
				nav("/admin/dashboard");
			}
		} catch (error) {
			console.log("dsdasd", error);
		} finally {
			setLoading(false);
		}
	};

	const handleGoogleLoginSuccess = async (response) => {
		try {
			setLoading(true);
			const accessToken = response.credential;
			// console.log("Access Token:", accessToken);
			const res = await UserService.loginGG(accessToken);
			const token = jwtDecode(res.data);
			// console.log("Token:", token);
			localStorage.setItem("token", res.data);
			dispatch(setUserInformation(token));
			dispatch(setAccessToken(res.data));
			toast("Đăng nhập thành công!");
			if (token.role === "Customer") {
				nav("/");
			} else if (token.role === "Restaurant") {
				nav("/restaurant/dashboard");
			} else {
				nav("/admin/dashboard");
			}
		} catch (error) {
			console.error("Error during Google Login:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleGoogleLoginFailure = (error) => {
		console.error("Google Login Failed:", error);
		toast.error("Đăng nhập bằng Google thất bại. Vui lòng thử lại.");
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
								nav("/register");
							}}
						>
							<span className="fs-18 fw-600">Đăng ký</span>
						</Button>
						<Link to="/">
							<div className="button-close">
								<CloseOutlined />
							</div>
						</Link>
					</div>

					<div className="title">
						<span className="side1">Đăng nhập</span>
						<span className="side2">
							Chào mừng bạn đã đến với TOPDER!
						</span>
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
							<Form.Item
								className="mb-10"
								name="password"
								rules={[
									{
										required: true,
										message: "Hãy nhập mật khẩu của bạn",
									},
								]}
								label={
									<span className="fw-600"> Mật khẩu </span>
								}
							>
								<Input.Password placeholder="Mật khẩu" />
							</Form.Item>

							<Form.Item
								name="remember"
								valuePropName="checked"
								className="ml-20"
							>
								<Checkbox
									className="fw-600"
									checked={rememberMe}
									onChange={(e) =>
										setRememberMe(e.target.checked)
									}
								>
									Ghi nhớ tài khoản
								</Checkbox>
								<span
									className="forgot-password fs-16 fw-600 primary-color"
									onClick={() => {
										nav("/forgot-password");
									}}
								>
									* Quên mật khẩu?
								</span>
							</Form.Item>
						</Form>
						<Button
							onClick={handleLoginByForm}
							htmlType="submit"
							loading={loading}
							type="primary"
							className="submit"
							shape="round"
						>
							Đăng nhập
						</Button>

						<div className="or mt-10">Hoặc</div>

						<div className="others-login mt-20">
							{/* <Button shape="round">
								tiếp tục với{" "}
								<GoogleOutlined className="fs-20" />
							</Button> */}
							<GoogleLogin
								onSuccess={handleGoogleLoginSuccess}
								onFailure={handleGoogleLoginFailure}
								cookiePolicy={"single_host_origin"}
								render={(renderProps) => (
									<Button
										shape="round"
										onClick={renderProps.onClick}
										disabled={renderProps.disabled}
									>
										Tiếp tục với{" "}
										<GoogleOutlined className="fs-20" />
									</Button>
								)}
							/>
						</div>
					</div>
				</Col>
				<ToastContainer
					position="top-right"
					autoClose={3000} // 3 seconds
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="colored"
					transition={Bounce}
				/>
			</Row>
		</LoginContainer>
	);
};

export default LoginPage;
