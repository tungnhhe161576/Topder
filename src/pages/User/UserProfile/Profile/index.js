import { Button, DatePicker, Form, Input, message, Radio } from "antd";
import ProfileUserLayout from "../../../../components/Layouts/ProfileUserLayout";
import { ProfileContainer } from "./styled";
import { getRegexPhoneNumber } from "../../../../lib/stringUtils";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import {
	updateUserInformation,
	userInfor,
} from "../../../../redux/Slice/userSlice";
import SpinCustom from "../../../../components/Common/SpinCustom";
import UserService from "../../../../services/UserService";

const Profile = () => {
	const [form] = Form.useForm();
	const [isEdit, setIsEdit] = useState(false);
	const [loading, setLoading] = useState(false);
	const user = useSelector(userInfor);
	const dispatch = useDispatch();

	const handleEditInfo = async () => {
		try {
			setLoading(true);
			const values = await form.validateFields();
			const updatedUser = {
				...values,
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

			const res = await UserService.updateProfile({
				Uid: user.uid,
				Name: updatedUser.name,
				Phone: updatedUser.phone,
				Dob: updatedUser.dob,
				Gender: updatedUser.gender,
			});
			message.open({
				content: res.message,
				type: "success",
				style: {
					marginTop: "20vh",
				},
			});
			dispatch(updateUserInformation(updatedUser));
			setIsEdit(false);
		} catch (error) {
			message.open({
				error: error.message,
				type: "success",
			});
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (user && (user.uid || user.id)) {
			form.setFieldsValue({
				...user,
				dob: user.dob ? dayjs(user.dob, "YYYY-MM-DD") : null,
				gender:
					user.gender === "Male"
						? "Nam"
						: user.gender === "Female"
						? "Nữ"
						: "Khác",
			});
		}
	}, [user, form]);

	return (
		<ProfileUserLayout>
			<ProfileContainer>
				<div className="title d-flex justify-content-space-between align-items-center fw-600 fs-24">
					<div>Thông tin cá nhân</div>
					<div className="">
						<Button
							className="button"
							shape="round"
							onClick={() => {
								setIsEdit(true);
							}}
						>
							Chỉnh sửa
						</Button>
					</div>
				</div>

				<div className="form">
					<SpinCustom spinning={loading}>
						<Form
							form={form}
							labelCol={{ span: 3 }}
							wrapperCol={{ span: 18 }}
							className="p-40"
						>
							<Form.Item
								name="name"
								label={
									<span className="fs-17 fw-600 d-flex justify-content-start">
										{" "}
										Tên{" "}
									</span>
								}
								rules={[
									{
										required: true,
										message: "Hãy nhập tên của bạn",
									},
								]}
								className="form-item"
							>
								<Input
									className="input fs-16"
									placeholder="Tên"
									disabled={!isEdit ? true : false}
								/>
							</Form.Item>

							<Form.Item
								name="phone"
								label={
									<span className="fs-17 fw-600 d-flex justify-content-start">
										{" "}
										Số điện thoại{" "}
									</span>
								}
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
								className="form-item"
							>
								<Input
									className="input fs-16"
									placeholder="Số điện thoại"
									disabled={!isEdit ? true : false}
								/>
							</Form.Item>

							{isEdit === false ? (
								<Form.Item
									name="gender"
									label={
										<span className="fs-17 fw-600 d-flex justify-content-start">
											{" "}
											Giới tính{" "}
										</span>
									}
									rules={[
										{
											required: true,
											message:
												"Hãy chọn giới tính của bạn",
										},
									]}
									className="form-item"
								>
									<Input
										className="input fs-16"
										placeholder="Giới tính"
										disabled
									/>
								</Form.Item>
							) : (
								<Form.Item
									name="gender"
									rules={[
										{
											required: true,
											message: "Hãy chọn giới tính",
										},
									]}
									label={
										<span className="fs-17 fw-600 d-flex justify-content-start">
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
							)}

							{!isEdit ? (
								<div className="d-flex align-items-center">
									<div
										className="fs-17 fw-600"
										style={{ marginRight: "50px" }}
									>
										Ngày sinh:
									</div>
									<div className="fs-15">
										{dayjs(user?.dob).format("DD-MM-YYYY")}
									</div>
								</div>
							) : (
								<Form.Item
									name="dob"
									rules={[
										{
											required: true,
											message: "Hãy chọn ngày sinh",
										},
									]}
									label={
										<span className="fs-17 fw-600 d-flex justify-content-start">
											Ngày sinh
										</span>
									}
								>
									<DatePicker format="DD-MM-YYYY" />
								</Form.Item>
							)}

							{isEdit && (
								<Form.Item>
									<div className="d-flex justify-content-start">
										<Button
											className="save mr-15"
											shape="round"
											onClick={handleEditInfo}
										>
											Lưu
										</Button>
										<Button
											shape="round"
											className="cancel"
											onClick={() => setIsEdit(false)}
										>
											Thoát
										</Button>
									</div>
								</Form.Item>
							)}
						</Form>
					</SpinCustom>
				</div>
			</ProfileContainer>
		</ProfileUserLayout>
	);
};

export default Profile;
