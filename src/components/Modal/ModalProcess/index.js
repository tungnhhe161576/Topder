import { Button } from "antd";
import CustomModal from "../../Common/ModalCustom";
import { ModalSuccessContainer } from "../ModalSuccess/styled";
import process from "../../../assets/images/process2.png";
const ModalProcess = ({ open, onCancel, text }) => {
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
							src={process}
							alt="process"
						/>
					</div>
					<div className="fs-22 fw-500 mb-20">{text}</div>
				</div>
			</ModalSuccessContainer>
		</CustomModal>
	);
};

export default ModalProcess;
