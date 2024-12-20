import { Button, Form, Input, message, InputNumber } from "antd";
import CustomModal from "../../../../../../../components/Common/ModalCustom";
import { useEffect, useState } from "react";
import UserService from "../../../../../../../services/UserService";
import TextArea from "antd/es/input/TextArea";

const ModalUpdateRoom = ({ open, onCancel, onOk, getAllTables }) => {
	const [loading, setLoading] = useState(false);
	const [form] = Form.useForm();

	useEffect(() => {
		form.setFieldsValue({
			...open,
		});
	}, [open, form]);

	const handleUpdateRoom = async () => {
		try {
			setLoading(true);
			const formValues = await form.validateFields();
			await UserService.updateRoom({
				roomId: open?.roomId,
				categoryRoomId: null,
				...formValues,
			});
			message.open({
				content: "Cập nhật phòng thành công!",
				type: "success",
				style: {
					marginTop: "10vh",
				},
			});
			getAllTables();
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
					onClick={() => handleUpdateRoom()}
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
			style={{ marginTop: "100px" }}
		>
			<div className="title-type-1">Cập nhật phòng</div>
			<div className="mt-20">
				<Form
					form={form}
					labelCol={{ span: 6 }}
					wrapperCol={{ span: 14 }}
				>
					<Form.Item
						name="roomName"
						label={
							<span className="fs-17 fw-600 d-flex justify-content-start">
								Tên phòng
							</span>
						}
						rules={[
							{
								required: true,
								message: "Vui lòng đặt tên phòng!",
							},
						]}
					>
						<Input placeholder="Tên phòng" />
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
					<Form.Item
						name="description"
						label={
							<span className="fs-17 fw-600 d-flex justify-content-start">
								Mô tả phòng
							</span>
						}
					>
						<TextArea rows={4} placeholder="Mô tả phòng" />
					</Form.Item>
				</Form>
			</div>
		</CustomModal>
	);
};

export default ModalUpdateRoom;
