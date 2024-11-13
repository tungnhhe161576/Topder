import { Button, message } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import UserService from "../../services/UserService";
import { useEffect } from "react";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { TransactionContainer } from "./styled";
import { useSelector } from "react-redux";
import { userInfor } from "../../redux/Slice/userSlice";

const VNPayDepositOrWithdraw = () => {
	const user = useSelector(userInfor)
	const location = useLocation();
	const nav = useNavigate();
	const { transactionId } = useParams();

	const queryParams = new URLSearchParams(location.search);
	const statusTransaction = queryParams.get("vnp_TransactionStatus");
	const statusResponse = queryParams.get("vnp_ResponseCode");

	const paymentType = queryParams.get("paymentType");

	// vnp_ResponseCode == "00" && vnp_TransactionStatus == "00" ---- thanh cong
	const isSuccess = statusTransaction === "00" && statusResponse === "00";
	const deposit = async () => {
		try {
			if (statusTransaction === "00" && statusResponse === "00") {
				await UserService.checkRecharge({
					transactionId,
					status: "Successful",
				});
				message.open({
					content: "Nạp tiền thành công.",
					type: "success",
					style: {
						marginTop: "10vh",
					},
				});
			} else {
				await UserService.checkRecharge({
					transactionId,
					status: "Cancelled",
				});
				message.open({
					content: "Nạp tiền thất bại.",
					type: "error",
					style: {
						marginTop: "10vh",
					},
				});
			}
		} catch (error) {
			console.log(error);
		}
	};

	const order = async () => {
		try {
			if (statusTransaction === "00" && statusResponse === "00") {
				await UserService.checkPaymentOrder(
					transactionId,
					"Successful"
				);
				message.open({
					content: "Thanh toán thành công.",
					type: "success",
					style: {
						marginTop: "10vh",
					},
				});
			} else {
				await UserService.checkPaymentOrder(transactionId, "Cancelled");
				message.open({
					content: "Thanh toán thất bại.",
					type: "error",
					style: {
						marginTop: "10vh",
					},
				});
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		paymentType === "order" ? order() : deposit();
	});

	return (
		<TransactionContainer>
			<div className="transaction-container">
				<div className="transaction-status">
					{isSuccess ? (
						<CheckCircleOutlined className="icon success" />
					) : (
						<CloseCircleOutlined className="icon failure" />
					)}
					<h2 className={isSuccess ? "success" : "failure"}>
						{isSuccess
							? "GIAO DỊCH THÀNH CÔNG"
							: "GIAO DỊCH THẤT BẠI"}
					</h2>
					<p>
						Mã giao dịch:{" "}
						<span style={{ fontWeight: "bold", color: "#ff7c08" }}>
							#{transactionId}
						</span>
					</p>
					<p>
						Hình thức:{" "}
						<span style={{ fontWeight: "bold", color: "#ff7c08" }}>
							{paymentType === "order"
								? "Thanh toán đơn hàng"
								: "Nạp tiền"}
						</span>
					</p>
					<Button
						onClick={() => 
							user?.role === 'Restaurant' 
							 ? nav("/restaurant/wallet")
							 : nav('/user-profile/user-wallet')
						}
						type="primary"
						shape="round"
						className="back-button"
					>
						Quay trở lại ví
					</Button>
				</div>
			</div>
		</TransactionContainer>
	);
};

export default VNPayDepositOrWithdraw;
