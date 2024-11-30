import { Button, message } from "antd";
import CustomModal from "../../../../../components/Common/ModalCustom";
import { useState } from "react";
import AdminService from "../../../../../services/AdminService";

const ModalDelete = ({open, onCancel, onOk}) => {
	const [loading, setLoading] = useState(false);

	const handleDelete = async () => {
		try {
			setLoading(true);
            await AdminService.deleteCategory(open?.categoryRestaurantId)
			message.open({
				content: 'Xóa thành công',
				type: "success",
				style: {
					marginTop: "10vh",
				},
			});
			onOk();
			onCancel();
		} catch (error) {
			message.open({
				content: 'Xóa thất bại!',
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
					onClick={() => handleDelete()}
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
			<div className="fs-18 fw-500 w-90 m-auto mb-30">
                Bạn có chắc muốn xóa loại nhà hàng này không?
            </div>
		</CustomModal>
	);
}
 
export default ModalDelete;