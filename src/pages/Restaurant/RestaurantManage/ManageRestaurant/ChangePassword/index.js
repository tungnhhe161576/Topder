import { Button, Form, Input } from "antd";
import { ChangePasswordContainer } from "./styled";
import { getRegexPassowrd } from "../../../../../lib/stringUtils";
import { useState } from "react";

const ChangePassword = () => {
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);

	const handleChangePassword = async () => {
		try {
			setLoading(true);
			const values = await form.validateFields();
			console.log(values);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<ChangePasswordContainer>
			<div className="form">
				<Form form={form} layout="vertical" className="w-60 m-auto">
					<Form.Item
						className="mb-20 form-item"
						name="password"
						rules={[
							{
								required: true,
								message: "Hãy điền mật khẩu cũ!",
							},
							// { pattern: getRegexPassowrd(), message: "Mật khẩu sai định dạng" },
						]}
						label={
							<span className="fw-600 ml-10"> Mật khẩu cũ</span>
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
							<span className="fw-600 ml-10"> Mật khẩu mới</span>
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
						(Mật khẩu gồm 6 kí tự: bao gồm chữ thường, chữ in hoa và
						1 số){" "}
					</div>
					<Form.Item
						className="form-item"
						name="confirmNewPassword"
						rules={[
							{
								required: true,
								message: "Nhập lại mật khẩu!",
							},
							({ getFieldValue }) => ({
								validator(_, value) {
									if (
										!value ||
										getFieldValue("newPassword") === value
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
							type="primary"
							shape="round"
							htmlType="submit"
							onClick={handleChangePassword}
						>
							Xác nhận
						</Button>
					</Form.Item>
				</Form>
			</div>
		</ChangePasswordContainer>
	);
};

export default ChangePassword;
