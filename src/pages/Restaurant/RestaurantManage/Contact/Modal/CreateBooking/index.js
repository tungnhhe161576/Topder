import { useState } from "react";
import { Button, DatePicker, message, Form } from "antd";
import CustomModal from "../../../../../../components/Common/ModalCustom";
import TextArea from "antd/es/input/TextArea";
import UserService from "../../../../../../services/UserService";
import dayjs from "dayjs";
const { RangePicker } = DatePicker;

const ModalCreateBooking = ({ open, onCancel, onOk, user }) => {
	const [loading, setLoading] = useState(false);
	const [form] = Form.useForm();

	const handleCreate = async () => {
		try {
			setLoading(true);
			const values = await form.validateFields();
			await UserService.cretaeAdsBooking({
				restaurantId: user?.uid,
				title: values?.title,
				startTime: dayjs(values?.time[0].$d).format(),
				endTime: dayjs(values?.time[1].$d).format(),
			});

			message.open({
				content: "Tạo thành công!",
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
					loading={loading}
					onClick={() => handleCreate()}
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
			width={600}
			style={{ marginTop: "100px" }}
		>
			<div className="title-type-1">Tạo yêu cầu quảng cáo</div>
			<div className="mt-20 mb-30">
				<Form form={form} layout="vertical">
					<Form.Item
						name="title"
						label="Nội dung muốn hiển thị"
						rules={[
							{
								required: true,
								message: "Vui lòng nhập nội dung!",
							},
						]}
					>
						<TextArea rows={4} placeholder="Nhập nội dung" />
					</Form.Item>

					<Form.Item
						name="time"
						label="Khoảng thời gian"
						rules={[
							{
								required: true,
								message: "Vui lòng chọn khoảng thời gian!",
							},
						]}
					>
						<RangePicker
							showTime={{
								format: "HH",
							}}
							format="YYYY-MM-DD HH"
							disabledDate={(current) => {
								return (
									current && current < dayjs().startOf("day")
								);
							}}
						/>
					</Form.Item>
				</Form>
			</div>
		</CustomModal>
	);
};

export default ModalCreateBooking;
