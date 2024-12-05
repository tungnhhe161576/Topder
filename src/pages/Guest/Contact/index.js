import React, { useState } from "react";
import CommonLayout from "../../../components/Layouts/CommonLayout";
import { ContactContainer } from "./styled";
import { Form, Input, Button, Row, Col, Select, message } from "antd";
import { getRegexEmail, getRegexPhoneNumber } from "../../../lib/stringUtils";
import {
	PhoneOutlined,
	MailOutlined,
	EditOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { userInfor } from "../../../redux/Slice/userSlice";
import GuestService from "../../../services/GuestService";
const { TextArea } = Input;
const { Option } = Select;

const Contact = () => {
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);
	const user = useSelector(userInfor);
	console.log('user', user);

	const handleSendForm = async () => {
		try {
			setLoading(true);
			const values = await form.validateFields();
			console.log(values);
			await GuestService.createContact({
				uid: user ? user?.uid : null,
				name: user ? user?.name : values?.name,
				email: user ? user?.email : values?.email,
				topic: values?.subject,
				content: values?.content,
				phone: user ? user?.phone : values?.phone,
			});
			form.resetFields();
			message.open({
				content:
					values?.subject === "RestaurantRegister"
						? "Gửi yêu cầu thành công, vui lòng kiểm tra email để đăng ký nhà hàng."
						: "Gửi liên hệ thành công.",
				type: "success",
				style: {
					marginTop: "10vh",
				},
			});
		} catch (error) {
			message.open({
				content: "Gửi yêu cầu thất bại!",
				type: "error",
				style: {
					marginTop: "10vh",
				},
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<CommonLayout>
			<ContactContainer>
				<div className="contact-page">
					<Row gutter={[32, 16]}>
						<Col xs={24} md={10}>
							<div className="contact-info">
								<div className="contact-info-item">
									<h2>Số Điện Thoại</h2>
									<p>
										<a
											style={{
												color: "inherit",
												textDecoration: "none",
											}}
											href="tel:0828290092"
										>
											+082-829-0092
										</a>
									</p>
									<p>
										<a
											style={{
												color: "inherit",
												textDecoration: "none",
											}}
											href="tel:0931589123"
										>
											+093-158-9123
										</a>
									</p>
								</div>
								<div className="contact-info-item">
									<h2>Email</h2>
									<p>
										<a
											style={{
												color: "inherit",
												textDecoration: "none",
											}}
											href="mailto:topder.vn@gmail.com"
										>
											topder.vn@gmail.com
										</a>
									</p>
								</div>

								<div className="contact-info-item border-0 p-0 m-0">
									<h2>Địa Chỉ</h2>
									<p>
										<a
											href="https://maps.app.goo.gl/u7CurDx4nRzX759AA"
											target="_blank"
											rel="noopener noreferrer"
											style={{
												marginLeft: 8,
												color: "inherit",
												textDecoration: "none",
											}}
										>
											Khu GD&ĐT, khu CNC Hòa Lạc, KM29,
											Đại lộ Thăng Long, huyện Thạch Thất,
											TP Hà Nội, Việt Nam
										</a>
									</p>
								</div>
							</div>
						</Col>
						<Col xs={24} md={14}>
							<div className="contact-form">
								<h2>Liên Hệ</h2>
								<Form
									form={form}
									layout="vertical"
									initialValues={{ remember: true }}
								>
									<Row gutter={16}>
										{!!user ? (
											<></>
										) : (
											<>
												<Col span={24}>
													<Form.Item
														name="name"
														rules={[
															{
																required: true,
																message:
																	"Vui lòng nhập họ và tên!",
															},
														]}
													>
														<Input
															prefix={
																<UserOutlined
																	style={{
																		color: "#ff7c08",
																	}}
																/>
															}
															placeholder="Họ và tên"
														/>
													</Form.Item>
												</Col>

												<Col xs={24} md={12}>
													<Form.Item
														name="email"
														rules={[
															{
																required: true,
																message:
																	"Vui lòng nhập email!",
															},
															{
																pattern:
																	getRegexEmail(),
																message:
																	"Email sai định dạng",
															},
														]}
													>
														<Input
															prefix={
																<MailOutlined
																	style={{
																		color: "#ff7c08",
																	}}
																/>
															}
															placeholder="Email"
														/>
													</Form.Item>
												</Col>

												<Col xs={24} md={12}>
													<Form.Item
														name="phone"
														rules={[
															{
																required: true,
																message:
																	"Vui lòng nhập số điện thoại!",
															},
															{
																pattern:
																	getRegexPhoneNumber(),
																message:
																	"Số điện thoại sai định dạng",
															},
														]}
													>
														<Input
															prefix={
																<PhoneOutlined
																	style={{
																		color: "#ff7c08",
																	}}
																/>
															}
															placeholder="Số điện thoại"
														/>
													</Form.Item>
												</Col>
											</>
										)}
										<Col span={24}>
											<Form.Item
												name="subject"
												rules={[
													{
														required: true,
														message:
															"Vui lòng nhập chủ đề!",
													},
												]}
											>
												<Select
													placeholder="Chọn yêu cầu"
													allowClear
												>
													<Option value="RestaurantRegister">
														Đăng ký nhà hàng
													</Option>
													<Option value="Other">
														Khác
													</Option>
												</Select>
											</Form.Item>
										</Col>
										<Col span={24}>
											<Form.Item
												name="content"
												rules={[
													{
														required: true,
														message:
															"Vui lòng nhập nội dung!",
													},
												]}
											>
												<div
													style={{
														position: "relative",
													}}
												>
													<EditOutlined
														style={{
															position:
																"absolute",
															left: "10px",
															top: "50%",
															transform:
																"translateY(-50%)",
															color: "#ff7c08",
															fontSize: "20px",
														}}
													/>
													<TextArea
														placeholder="Nội dung"
														rows={4}
														style={{
															paddingLeft: "30px",
														}}
													/>
												</div>
											</Form.Item>
										</Col>
									</Row>
								</Form>
								<div className="contact-submit">
									<Button
										onClick={() => handleSendForm()}
										htmlType="submit"
										loading={loading}
										type="primary"
										className="submit"
										shape="round"
									>
										Gửi
									</Button>
								</div>
							</div>
						</Col>
					</Row>
				</div>

				<div className="contact-map">
					<iframe
						title="Google Map"
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8836.003325700769!2d105.51653446977538!3d21.012416700000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135abc60e7d3f19%3A0x2be9d7d0b5abcbf4!2sFPT%20University!5e1!3m2!1sen!2s!4v1732992568574!5m2!1sen!2s"
						// src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.724423916977!2d105.5031283151469!3d21.00732648601015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab367c96a883%3A0x47860e1b37f6a591!2sFPT%20University!5e0!3m2!1sen!2s!4v1666804601241!5m2!1sen!2s"
						width="100%"
						height="500"
						allowFullScreen=""
						loading="lazy"
					></iframe>
				</div>
			</ContactContainer>
		</CommonLayout>
	);
};

export default Contact;
