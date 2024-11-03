import { Button } from "antd";
import CustomModal from "../../Common/ModalCustom";

const ModalSuccess = ({ open, onCancel, text }) => {
	const footer = () => {
		return (
			<div className="d-flex justify-content-center">
				<Button className="mr-10 fw-600" onClick={() => onCancel()}>
					Đóng
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
			style={{ marginTop: "60px" }}
		>
			<div>
				<div className="fs-22 fw-500 mb-20">{text}</div>
				<div>
					<img
						width={100}
						style={{ alignSelf: "center" }}
						src="https://www.pngitem.com/pimgs/m/526-5264359_check-mark-icon-transparent-hd-png-download.png"
						alt="success"
					/>
				</div>
			</div>
		</CustomModal>
	);
};

export default ModalSuccess;
