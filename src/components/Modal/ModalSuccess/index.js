import { Button } from "antd";
import CustomModal from "../../Common/ModalCustom";
import { ModalSuccessContainer } from "../ModalSuccess/styled";
import succes from "../../../assets/images/success.png";
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
			<ModalSuccessContainer>
				<div>
					<div>
						<img
							width={100}
							style={{ alignSelf: "center" }}
							// src="https://www.pngitem.com/pimgs/m/526-5264359_check-mark-icon-transparent-hd-png-download.png"
							src={succes}
							alt="success"
						/>
					</div>
					<div className="fs-22 fw-500 mb-20">{text}</div>
				</div>
			</ModalSuccessContainer>
		</CustomModal>
	);
};

export default ModalSuccess;
