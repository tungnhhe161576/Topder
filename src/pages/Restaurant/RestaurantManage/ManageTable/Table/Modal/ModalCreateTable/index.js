import {
	Button,
	Form,
	Input,
	message,
	Row,
	Col,
	Select,
	InputNumber,
} from "antd";
import CustomModal from "../../../../../../../components/Common/ModalCustom";
import { useEffect, useState } from "react";
import UserService from "../../../../../../../services/UserService";
import TextArea from "antd/es/input/TextArea";
const { Option } = Select;

const ModalCreateTable = ({ open, onCancel, onOk, userId }) => {
	const [loading, setLoading] = useState(false);
	const [rooms, setRooms] = useState([]);
	const [form] = Form.useForm();

	const getAllRooms = async () => {
		try {
			const res = await UserService.getAllRoom(userId);
			setRooms(res.items.filter((i) => i?.isBookingEnabled === true));
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getAllRooms();
	}, []);

	const handleCreateTable = async () => {
		try {
			setLoading(true);
			const formValues = await form.validateFields();
			await UserService.createTable({
				...formValues,
				roomId: formValues?.roomId === 0 ? null : formValues?.roomId,
				tableId: 0,
				restaurantId: userId,
				isBookingEnabled: true,
			});
			message.open({
				content: "Tạo bàn thành công!",
				type: "success",
				style: {
					marginTop: "10vh",
				},
			});
			onOk();
			onCancel();
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const footer = () => {
		return (
			<div className="d-flex justify-content-center">
				<Button
					className="mr-10 fw-600"
					shape="round"
					onClick={() => onCancel()}
				>
					Đóng
				</Button>
				<Button
					className="mr-10 fw-600"
					type="primary"
					shape="round"
					onClick={() => handleCreateTable()}
					loading={loading}
				>
					Đồng ý
				</Button>
			</div>
		);
	};

	return (
		<CustomModal
			open={!!open}
			onCancel={onCancel}
			footer={footer}
			width={900}
			// style={{marginTop: '200px'}}
		>
			<div className="title-type-1">Tạo bàn</div>
			<div className="mt-20">
				<Form
					form={form}
					labelCol={{ span: 6 }}
					wrapperCol={{ span: 18 }}
				>
					<Row gutter={[16, 16]}>
						<Col span={12}>
							<Form.Item
								name="roomId"
								label={
									<span className="fs-17 fw-600 d-flex justify-content-start">
										Chọn phòng
									</span>
								}
								rules={[
									{
										required: true,
										message: "Vui lòng chọn phòng!",
									},
								]}
							>
								<Select allowClear placeholder="Chọn phòng">
									<Option value={0} key={"abc"}>
										Bàn tự do
									</Option>
									{rooms.map((r) => (
										<Option
											key={r?.roomId}
											value={r?.roomId}
										>
											{r?.roomName}
										</Option>
									))}
								</Select>
							</Form.Item>

							<Form.Item
								name="tableName"
								label={
									<span className="fs-17 fw-600 d-flex justify-content-start">
										Tên bàn
									</span>
								}
								rules={[
									{
										required: true,
										message: "Vui lòng đặt tên bàn!",
									},
								]}
							>
								<Input placeholder="Tên bàn" />
							</Form.Item>

							<Form.Item
								name="maxCapacity"
								label={
									<span className="fs-17 fw-600 d-flex justify-content-start">
										Sức chứa
									</span>
								}
								rules={[
									{
										required: true,
										message: "Vui lòng chọn sức chứa!",
									},
								]}
							>
								<InputNumber
									placeholder="Sức chứa"
									min={1}
									className="w-100"
								/>
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								name="description"
								label={
									<span className="fs-17 fw-600 d-flex justify-content-start">
										Mô tả bàn
									</span>
								}
							>
								<TextArea rows={4} placeholder="Mô tả bàn" />
							</Form.Item>
						</Col>
					</Row>
				</Form>
			</div>
		</CustomModal>
	);
};

export default ModalCreateTable;
