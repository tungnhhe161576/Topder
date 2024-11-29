import { Button, Form, Input, message } from "antd";
import { useEffect, useState } from "react";
import AdminService from "../../../../../services/AdminService";
import CustomModal from "../../../../../components/Common/ModalCustom";

const ModalUpdateOrCreate = ({open, onCancel, onOk, isEdit}) => {
    const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);

    useEffect(() => {
        form.setFieldsValue({
            ...open,
        })
    }, [form, open])

	const handleCreate = async () => {
		try {
			setLoading(true);
			const values = await form.validateFields();
            !isEdit 
                ? await  AdminService.createCategoryRestaurant({
                    categoryRestaurantId: 0,
                    categoryRestaurantName: values?.categoryRestaurantName
                })
                : await AdminService.updateCategoryRestaurant({
                    categoryRestaurantId: open?.categoryRestaurantId,
                    categoryRestaurantName: values?.categoryRestaurantName
                })
			message.open({
				content: isEdit ? "Cập nhật loại nhà hàng thành công!" : "Tạo loại nhà hàng thành công!",
				type: "success",
				style: {
					marginTop: "10vh",
				},
			});
			onOk();
			onCancel();
		} catch (error) {
			message.open({
				content: isEdit ? "Cập nhật loại nhà hàng thất bại!" : "Tạo loại nhà hàng thất bại!",
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
				<Button
					className="mr-10 fw-600"
					type="primary"
					shape="round"
					onClick={() => handleCreate()}
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
			width={600}
			style={{ marginTop: "100px" }}
		>
			<div className="title-type-1">{isEdit ? 'Cập nhật' : 'Tạo mới'}</div>
			<div className="mt-20">
				<Form form={form} layout="vertical">
					<Form.Item
						name="categoryRestaurantName"
						label={
							<span className="fs-17 fw-600 d-flex justify-content-start">
								Loại nhà hàng
							</span>
						}
						rules={[
							{
								required: true,
								message: "Vui lòng nhập tên loại nhà hàng!",
							},
						]}
					>
						<Input placeholder="Loại nhà hàng" />
					</Form.Item>
				</Form>
			</div>
		</CustomModal>
	);
}
 
export default ModalUpdateOrCreate;