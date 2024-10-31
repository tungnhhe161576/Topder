import { Button, Form, Input, message } from "antd";
import ProfileUserLayout from "../../../../components/Layouts/ProfileUserLayout";
import { ChangePasswordContainer } from "./styled";
import { getRegexPassowrd } from "../../../../lib/stringUtils";
import { useState } from "react";
import UserService from "../../../../services/UserService";
import { useSelector } from "react-redux";
import { userInfor } from "../../../../redux/Slice/userSlice";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);
	const user = useSelector(userInfor);
	const nav = useNavigate();

	const handleChangePassword = async () => {
		try {
			setLoading(true);

			const values = await form.validateFields();

			const response = await UserService.changePassword({
				uid: user.uid,
				...values,
			});
			console.log("check", response);
			if (response === "Mật khẩu đã được thay đổi thành công.") {
				message.open({
					content:
						response.data ||
						"Đổi mật khẩu thành công. vui lòng đăng nhập lại!",
					type: "success",
				});
				setTimeout(() => {
					nav("/login");
				}, 1500);
			}
		} catch (error) {
			message.open({
				content: "Mật khẩu cũ không đúng, vui lòng thử lại!",
				type: "error",
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<ProfileUserLayout>
			<ChangePasswordContainer>
				<div className="title fs-22 fw-600">Đổi mật khẩu</div>
				<div className="form">
					<Form
						form={form}
						layout="vertical"
						className="w-60 m-auto pt-30 pb-30"
					>
						<Form.Item
							className="mb-20 form-item"
							name="oldPassword"
							rules={[
								{
									required: true,
									message: "Hãy điền mật khẩu cũ!",
								},
								// { pattern: getRegexPassowrd(), message: "Mật khẩu sai định dạng" },
							]}
							label={
								<span className="fw-600 ml-10">
									{" "}
									Mật khẩu cũ
								</span>
							}
						>
							<Input.Password
								className="input"
								placeholder="Nhập mật khẩu cũ"
							/>
						</Form.Item>
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
							(Mật khẩu gồm 6 kí tự: bao gồm chữ thường, chữ in
							hoa và 1 số){" "}
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
						<Form.Item className="d-flex justify-content-center">
							<Button
								className="button bg-primary"
								shape="round"
								htmlType="submit"
								onClick={handleChangePassword}
								loading={loading}
							>
								Xác nhận
							</Button>
						</Form.Item>
					</Form>
				</div>
			</ChangePasswordContainer>
		</ProfileUserLayout>
	);
};

export default ChangePassword;
