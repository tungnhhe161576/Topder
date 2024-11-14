import { Button } from "antd";
import CustomModal from "../../Common/ModalCustom";
import { ModalSuccessContainer } from "../ModalSuccess/styled";
import warning from "../../../assets/images/warning.png";

const ModalWarning = ({ open, onCancel, text, onConfirm }) => {
	const footer = () => {
		return (
			<div className="d-flex justify-content-center">
				<Button className="mr-10 fw-600" onClick={() => onCancel()}>
					Đóng
				</Button>
				<Button
					className="mr-10 fw-600"
					type="primary"
					onClick={onConfirm}
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
			style={{ marginTop: "60px" }}
		>
			<ModalSuccessContainer>
				<div>
					<div>
						<img
							width={100}
							style={{ alignSelf: "center" }}
							src={warning}
							alt="warning"
						/>
					</div>
					<div className="fs-22 fw-500 mb-20">{text}</div>
				</div>
			</ModalSuccessContainer>
		</CustomModal>
	);
};

export default ModalWarning;
