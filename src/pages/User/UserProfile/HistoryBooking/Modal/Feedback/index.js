import { Button, Form, message, Rate } from "antd";
import CustomModal from "../../../../../../components/Common/ModalCustom";
import SpinCustom from "../../../../../../components/Common/SpinCustom";
import { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import UserService from "../../../../../../services/UserService";
import { useSelector } from "react-redux";
import { userInfor } from "../../../../../../redux/Slice/userSlice";

const ModalFeedback = ({ open, onCancel, onOk }) => {
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);
	const [detail, setDetail] = useState();

	const user = useSelector(userInfor);

	const getFeedback = async () => {
		try {
			const res = await UserService.viewFeedback(open?.orderId);
			setDetail(res);
			form.setFieldsValue({
				rate: res?.star,
				content: res?.content,
			});
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getFeedback();
	}, [open, form]);

	const handleSendFeedback = async () => {
		try {
			setLoading(true);
			const formValue = await form.validateFields();

			await UserService.createFeedback({
				customerId: user?.uid,
				orderId: open?.orderId,
				restaurantId: open?.restaurantId,
				star: formValue?.rate,
				content: formValue?.content,
			});

			message.open({
				content: "Tạo đánh giá thành công!",
				type: "success",
				style: {
					marginTop: "10vh",
				},
			});
			onCancel();
			onOk();
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const footer = () => {
		return (
			<div className="d-flex justify-content-center">
				<Button className="mr-10 fw-600" onClick={() => onCancel()}>
					Đóng
				</Button>
				{open?.isFeedback && (
					<Button
						className="mr-10 fw-600"
						type="primary"
						onClick={() => handleSendFeedback()}
						loading={loading}
					>
						Đồng ý
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
			<SpinCustom spinning={loading}>
				<Form form={form} layout="vertical" className="p-20">
					{open?.isFeedback ? (
						<div className="mb-15">
							<div>Số sao: </div>
							<Rate
								className="primary"
								disabled
								value={detail?.star}
							/>
						</div>
					) : (
						<Form.Item
							name="rate"
							rules={[
								{ required: true, message: "Hãy chọn số sao!" },
							]}
						>
							<span className="fs-18">Xếp hạng:</span>{" "}
							<Rate
								className="primary"
								onChange={(value) =>
									form.setFieldsValue({ rate: value })
								}
							/>
						</Form.Item>
					)}

					<Form.Item
						name="content"
						label="Nội dung đánh giá"
						rules={[
							{ required: true, message: "Hãy viết đánh giá!" },
						]}
					>
						<TextArea
							disabled={open?.isFeedback ? true : false}
							rows={4}
							placeholder="Đánh giá của bạn"
						/>
					</Form.Item>
				</Form>
			</SpinCustom>
		</CustomModal>
	);
};

export default ModalFeedback;
