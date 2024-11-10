import { Button, message } from "antd";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserService from "../../services/UserService";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { TransactionContainer } from "./styled";

const DepositOrWithdraw = () => {
	const location = useLocation();
	const nav = useNavigate();

	const queryParams = new URLSearchParams(location.search);
	const status = queryParams.get("status");
	const transactionId = parseInt(queryParams.get("transactionId"));

	const paymentType = queryParams.get("paymentType");

	const deposit = async () => {
		try {
			if (status === "PAID") {
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
			if (status === "PAID") {
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
					{status === "PAID" ? (
						<CheckCircleOutlined className="icon success" />
					) : (
						<CloseCircleOutlined className="icon failure" />
					)}
					<h2 className={status === "PAID" ? "success" : "failure"}>
						{status === "PAID"
							? "THANH TOÁN THÀNH CÔNG"
							: "THANH TOÁN THẤT BẠI"}
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
						onClick={() => nav("/user-profile/user-wallet")}
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

export default DepositOrWithdraw;
