import { useEffect, useState } from "react";
import { Button, Col, Row, Table, Form, InputNumber, message } from "antd";
import { MangementPolicyContainer } from "./styled";
import { useSelector } from "react-redux";
import { userInfor } from "../../../../../redux/Slice/userSlice";
import ModalCustom from "../../../../../components/Common/ModalCustom";
import UserService from "../../../../../services/UserService";
import { getRegexNumber } from "../../../../../lib/stringUtils";

const ManagePolicy = () => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [form] = Form.useForm();
	const [dataSource, setDataSource] = useState([]);
	const user = useSelector(userInfor);

	useEffect(() => {
		const initialDataSource = [
			{
				key: user.uid,
				discount: user.discount,
				firstFeePercent: user.firstFeePercent || "N/A",
				returningFeePercent: user.returningFeePercent || "N/A",
				cancellationFeePercent: user.cancellationFeePercent || "N/A",
			},
		];
		setDataSource(initialDataSource);
	}, [user]);

	const columns = [
		{
			title: "Chiết khấu tiền đặt cọc(%)",
			dataIndex: "discount",
			key: "discount",
		},
		{
			title: "Chiết khấu số tiền đặt bàn lần đầu(%)",
			dataIndex: "firstFeePercent",
			key: "firstFeePercent",
		},
		{
			title: "Phí hoàn trả(%)",
			dataIndex: "returningFeePercent",
			key: "returningFeePercent",
		},
		{
			title: "Phí hủy bỏ(%)",
			dataIndex: "cancellationFeePercent",
			key: "cancellationFeePercent",
		},
	];

	const showModal = () => {
		setIsModalVisible(true);

		form.setFieldsValue({
			discount: user.discount,
			firstFeePercent: user.firstFeePercent,
			returningFeePercent: user.returningFeePercent,
			cancellationFeePercent: user.cancellationFeePercent,
		});
	};
	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const handleOk = async () => {
		try {
			// Lấy giá trị từ form sau khi đã xác thực thành công
			const values = await form.validateFields();

			// Cập nhật dữ liệu hiện tại trong dataSource với dữ liệu từ form
			const updatedData = {
				...dataSource[0],
				...values,
			};

			// Gọi API để cập nhật thông tin nhà hàng
			const result = await UserService.updateRestaurantInfor({
				uid: user.uid,
				...values,
			});

			// Kiểm tra phản hồi từ API, nếu thành công thì hiển thị thông báo
			if (result && result.success) {
				message.open({
					content: result.message || "Cập nhật thành công!",
					type: "success",
					style: {
						marginTop: "20vh",
					},
				});

				setDataSource([updatedData]);

				// Đóng modal
				setIsModalVisible(false);
			} else {
				// Nếu API trả về lỗi, thông báo lỗi
				message.open({
					content: result.message || "Cập nhật thất bại!",
					type: "error",
					style: {
						marginTop: "20vh",
					},
				});
			}
		} catch (err) {
			message.open({
				content: "Có lỗi xảy ra khi cập nhật thông tin!",
				type: "error",
				style: {
					marginTop: "20vh",
				},
			});
		}
	};

	return (
		<MangementPolicyContainer>
			<div>
				<div style={{ marginBottom: "20px", textAlign: "right" }}>
					<Button
						type="primary"
						style={{ height: 40 }}
						onClick={showModal}
					>
						Chỉnh Sửa Chính Sách
					</Button>
				</div>
				<Table
					dataSource={dataSource}
					columns={columns}
					rowKey="key"
					// pagination={{ pageSize: 4, position: ["bottomCenter"] }}
					pagination={false}
				/>

				<ModalCustom
					title="Chỉnh Sửa Chính sách"
					visible={isModalVisible}
					onOk={handleOk}
					onCancel={handleCancel}
					okText="Chỉnh sửa"
					cancelText="Hủy"
				>
					<Form form={form} layout="vertical">
						<Row gutter={[24, 16]}>
							<Col
								xs={24}
								sm={24}
								md={12}
								lg={12}
								style={{ padding: "0 16px" }}
							>
								<Form.Item
									name="discount"
									label="Chiết khấu tiền đặt cọc(%)"
									rules={[
										{
											required: true,
											message: "Vui lòng nhập số (%)",
										},
										{
											type: "number",
											min: 0,
											max: 100,
											message:
												"(%) lớn hơn 0 và nhỏ hơn 100",
										},
									]}
								>
									<InputNumber
										style={{
											width: "100%",
										}}
										placeholder="Giá đặt bàn"
									/>
								</Form.Item>
							</Col>
							<Col
								xs={24}
								sm={24}
								md={12}
								lg={12}
								style={{ padding: "0 16px" }}
							>
								<Form.Item
									name="firstFeePercent"
									label="Chiết khấu số tiền đặt bàn lần đầu(%)"
									rules={[
										{
											required: true,
											message: "Vui lòng nhập số (%)",
										},
										{
											type: "number",
											min: 0,
											max: 100,
											message:
												"(%) lớn hơn 0 và nhỏ hơn 100",
										},
									]}
								>
									<InputNumber
										style={{
											width: "100%",
										}}
										placeholder="Số lượng người"
									/>
								</Form.Item>
							</Col>
						</Row>
						<Row gutter={[24, 16]}>
							<Col
								xs={24}
								sm={24}
								md={12}
								lg={12}
								style={{ padding: "0 16px" }}
							>
								<Form.Item
									name="returningFeePercent"
									label="Phí hoàn trả(%)"
									rules={[
										{
											required: true,
											message: "Vui lòng nhập số (%)",
										},
										{
											type: "number",
											min: 0,
											max: 100,
											message:
												"(%) lớn hơn 0 và nhỏ hơn 100",
										},
										// {
										// 	pattern: getRegexNumber(),
										// 	message: "Vui lòng nhập số!",
										// },
									]}
								>
									<InputNumber
										style={{
											width: "100%",
										}}
										placeholder="Giá đặt bàn"
									/>
								</Form.Item>
							</Col>
							<Col
								xs={24}
								sm={24}
								md={12}
								lg={12}
								style={{ padding: "0 16px" }}
							>
								<Form.Item
									name="cancellationFeePercent"
									label="Phí hủy bỏ(%)"
									rules={[
										{
											required: true,
											message: "Vui lòng nhập số (%)",
										},
										{
											type: "number",
											min: 0,
											max: 100,
											message:
												"(%) lớn hơn 0 và nhỏ hơn 100",
										},
									]}
								>
									<InputNumber
										style={{
											width: "100%",
										}}
										placeholder="Số lượng người"
									/>
								</Form.Item>
							</Col>
						</Row>
					</Form>
				</ModalCustom>
			</div>
		</MangementPolicyContainer>
	);
};

export default ManagePolicy;
