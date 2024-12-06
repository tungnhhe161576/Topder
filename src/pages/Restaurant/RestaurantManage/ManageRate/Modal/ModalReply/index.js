import { Button, Form, message } from "antd";
import { useEffect, useState } from "react";
import UserService from "../../../../../../services/UserService";
import CustomModal from "../../../../../../components/Common/ModalCustom";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";

const ModalReply = ({ open, onCancel, onOk, userId }) => {
	const [loading, setLoading] = useState(false);
	const [form] = Form.useForm();

	useEffect(() => {
		form.setFieldsValue({
			content: open?.feedbackReply?.content,
		});
	}, [form, open]);

	const handleReply = async () => {
		try {
			setLoading(true);
			const value = await form.validateFields();
			await UserService.createReply({
				feedbackId: open?.feedbackId,
				restaurantId: userId,
				content: value?.content,
			});
			message.open({
				content: "Tạo phản hồi thành công!",
				type: "success",
				style: {
					marginTop: "10vh",
				},
			});
			onOk();
			onCancel();
		} catch (error) {
			message.open({
				content: "Tạo phản hồi thất bại!",
				type: "error",
				style: {
					marginTop: "10vh",
				},
			});
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
				{open?.isReply && (
					<Button
						className="mr-10 fw-600"
						type="primary"
						shape="round"
						onClick={() => handleReply()}
						loading={loading}
					>
						Tạo
					</Button>
				)}
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
			<div className="title-type-1">Phản hồi</div>
			<div className="mt-20 mb-30">
				<div className="mb-10">
					{open?.isReply ? (
						<div>
							Ngày tạo:{" "}
							{dayjs(open?.feedbackReply?.createDate).format(
								"DD-MM-YYYY HH:mm"
							)}
						</div>
					) : (
						<></>
					)}
				</div>
				<Form form={form} layout="vertical">
					<Form.Item
						name="content"
						label="Phản hồi"
						rules={[
							{
								required: true,
								message: "Vui lòng nhập nội dung phản hồi!",
							},
						]}
					>
						<TextArea
							rows={6}
							placeholder="Phản hồi"
							disabled={open?.isReply ? true : false}
						/>
					</Form.Item>
				</Form>
			</div>
		</CustomModal>
	);
};

export default ModalReply;
