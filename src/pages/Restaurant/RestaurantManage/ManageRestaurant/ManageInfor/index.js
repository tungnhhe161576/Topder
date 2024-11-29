import { useEffect, useState } from "react";
import { CameraOutlined } from "@ant-design/icons";
import { Button, Col, Row, Form, Upload, message, Switch } from "antd";

import { formatNumberToK } from "../../../../../lib/stringUtils";
import { ManageInfoContainer } from "./styled";
import UserService from "../../../../../services/UserService";
import ModalUpdateInfo from "./Modal/ModalUpdateInfo";
import ImageService from "../../../../../services/ImageService";
import { useDispatch } from "react-redux";
import { updateUserInformation } from "../../../../../redux/Slice/userSlice";
import ModalEnabledBooking from "./Modal/ModalEnabledBooking";

const ManageInfomation = ({ user }) => {
	const [openModalUpdate, setOpenModalUpdate] = useState(false);
	const [loading, setLoading] = useState(false);
	const [logo, setLogo] = useState(null);
	const [wallet, setWallet] = useState();
	const [openModalActive, setOpenModalActive] = useState(false);
	// const [active, setActive] = useState(user?.isBookingEnabled);
	const [form] = Form.useForm();
	const dispatch = useDispatch();

	const getWalletInfo = async () => {
		try {
			setLoading(true);
			const res = await UserService.getWalletInfo(user?.uid);
			setWallet(res);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		if (!!user?.uid) {
			getWalletInfo();
		}
	}, [user]);

	console.log(user);

	const handleBeforeUpload = (file) => {
		const allowedImageTypes = ["image/jpeg", "image/png", "image/gif"];
		const isAllowedType = allowedImageTypes.includes(file.type);
		if (!isAllowedType) {
			message.open({
				content:
					"Vui lòng chọn file hình ảnh đúng định dạng (JPG, PNG, GIF).",
				type: "error",
				style: {
					marginTop: "20vh",
				},
			});
		} else {
			setLogo(URL.createObjectURL(file));
		}
		return isAllowedType ? false : Upload.LIST_IGNORE;
	};

	const handleUpdateAvatar = async () => {
		try {
			setLoading(true);
			const values = await form.validateFields();
			const file = values.avatar.file;
			const formData = new FormData();
			formData.append("file", file);

			const getImage = await ImageService.uploadImage(formData);
			setLogo(getImage.url);

			UserService.updateRestaurantProfile({
				...user,
				logo: getImage.url,
			});
			message.open({
				content: "Cập nhật ảnh thành công!",
				type: "success",
				style: {
					marginTop: "10vh",
				},
			});

			dispatch(updateUserInformation({ logo: getImage.url }));
		} catch (error) {
			console.error("Error updating avatar:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (user && user?.logo) {
			setLogo(user.logo);
		}
	}, [user]);

	return (
		<ManageInfoContainer>
			<div>
				<div style={{ marginBottom: "20px", textAlign: "right" }}>
					<div className="d-flex align-items-center justify-content-flex-end">
						<div className="mr-10">
							<Switch
								checked={user?.isBookingEnabled}
								onChange={() => setOpenModalActive(true)}
								title="Bật/Tắt trạng thái đặt bàn"
							/>
						</div>
						<div>
							<Button
								type="primary"
								shape="round"
								onClick={() => setOpenModalUpdate(user)}
							>
								Chỉnh Sửa Thông Tin
							</Button>
						</div>
					</div>
				</div>
				<div className="des mt-20">
					<Row gutter={[16, 16]}>
						<Col span={14}>
							<div className="pl-20 title-type-1 mb-20">
								Thông tin cơ bản
							</div>
							<div className="w-100 d-flex">
								<div style={{ width: "40%" }}>
									<div className="image">
										<img src={logo} alt="logo" />
									</div>
									<div>
										<Form form={form}>
											<Form.Item
												name="avatar"
												className="m-0 p-0"
											>
												<Upload.Dragger
													className="dragger"
													beforeUpload={(file) =>
														handleBeforeUpload(file)
													}
													style={{
														width: "100%",
														height: "150px",
														border: "none",
													}}
													accept="image/*"
													multiple={false}
													maxCount={1}
													fileList={[]}
												>
													<CameraOutlined className="fs-20" />
												</Upload.Dragger>
											</Form.Item>
										</Form>
									</div>
									{logo !== user?.logo ? (
										<div className="d-flex justify-content-center mt-15">
											<Button
												className="mr-5 fs-12 fw-500 pl-20 pr-20"
												shape="round"
												type="primary"
												onClick={() =>
													handleUpdateAvatar()
												}
												loading={loading}
											>
												Lưu
											</Button>
											<Button
												onClick={() =>
													setLogo(user?.logo)
												}
												className="fs-12 fw-500 white out-image"
												style={{
													backgroundColor: "gray",
													border: "none",
												}}
												shape="round"
											>
												Thoát
											</Button>
										</div>
									) : (
										<></>
									)}
									<div className="mt-10 pl-20">
										<span className="fw-500 fs-16">
											Số dư:{" "}
										</span>
										<span className="red fs-18 fw-500">
											{" "}
											{formatNumberToK(
												wallet?.walletBalance
											)}{" "}
										</span>
									</div>
								</div>
								<div className="ml-10 w-100">
									<div className="d-flex">
										<div className="mb-5 fs-16 w-50">
											{" "}
											Tên nhà hàng:{" "}
										</div>
										<div className="mb-5 fs-16 w-100">
											{" "}
											{user?.nameRes}{" "}
										</div>
									</div>
									<div className="d-flex">
										<div className="mb-5 fs-16 w-50">
											{" "}
											Loại nhà hàng:{" "}
										</div>
										<div className="mb-5 fs-16 w-100">
											{" "}
											{user?.categoryRestaurantName}{" "}
										</div>
									</div>
									<div className="d-flex">
										<div className="mb-5 fs-16 w-50">
											{" "}
											Số điện thoại:{" "}
										</div>
										<div className="mb-5 fs-16 w-100">
											<a
												href={`tel:${user?.phone}`}
												style={{
													color: "inherit",
													textDecoration: "none",
												}}
											>
												{user?.phone}
											</a>
										</div>
									</div>
									<div className="d-flex">
										<div className="mb-5 fs-16 w-50">
											{" "}
											Địa chỉ:{" "}
										</div>
										<div className="mb-5 fs-16 w-100">
											{" "}
											{user?.address}{" "}
										</div>
									</div>
									<div className="d-flex">
										<div className="mb-5 fs-16 w-50">
											{" "}
											Giá đặt bàn:{" "}
										</div>
										<div className="mb-5 fs-16 w-100">
											{" "}
											{formatNumberToK(user?.price)}{" "}
										</div>
									</div>
									<div className="d-flex">
										<div className="mb-5 fs-16 w-50">
											{" "}
											Thời gian hoạt động:{" "}
										</div>
										<div className="w-100">
											<div>
												{" "}
												Mở cửa:{" "}
												<span className="fs-16">
													{" "}
													{user?.openTime}{" "}
												</span>{" "}
											</div>
											<div>
												{" "}
												Đóng cửa:{" "}
												<span className="fs-16">
													{" "}
													{user?.closeTime}{" "}
												</span>{" "}
											</div>
										</div>
									</div>
								</div>
							</div>
						</Col>
						<Col span={10}>
							<div>
								<div className="pl-20 title-type-1">
									Mô tả chi tiết
								</div>
								<div className="">
									<div className="primary fs-16 fw-500">
										Mô tả ngắn gọn
									</div>
									<div>
										{user?.subdescription ? (
											<div
												dangerouslySetInnerHTML={{
													__html: user?.subdescription,
												}}
											/>
										) : (
											"Chưa có mô tả"
										)}
									</div>
									<div className="primary fs-16 fw-500">
										Mô tả chi tiết
									</div>
									<div>
										{user?.description ? (
											<div
												dangerouslySetInnerHTML={{
													__html: user?.description,
												}}
											/>
										) : (
											"Chưa có mô tả"
										)}
									</div>
								</div>
							</div>
						</Col>
					</Row>
				</div>

				{!!openModalUpdate && (
					<ModalUpdateInfo
						open={openModalUpdate}
						onCancel={() => setOpenModalUpdate(false)}
					/>
				)}
				{!!openModalActive && (
					<ModalEnabledBooking
						open={openModalActive}
						onCancel={() => setOpenModalActive(false)}
						// setActive={setActive}
						active={user?.isBookingEnabled}
						user={user}
					/>
				)}
			</div>
		</ManageInfoContainer>
	);
};

export default ManageInfomation;
