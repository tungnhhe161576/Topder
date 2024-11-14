import { useEffect, useState } from "react";
import CustomModal from "../../../../../../components/Common/ModalCustom";
import SpinCustom from "../../../../../../components/Common/SpinCustom";
import { Button, message } from "antd";
import dayjs from "dayjs";
import UserService from "../../../../../../services/UserService";
import { formatNumberToK } from "../../../../../../lib/stringUtils";
import ModalDiscount from "../ModalDiscount";
import { ModalTotalContainer } from "./styled";

const ModalCalFee = ({
	open,
	onCancel,
	restaurantId,
	userId,
	totalPrice,
	form,
}) => {
	const [loading, setLoading] = useState(false);
	const [discounts, setDiscounts] = useState([]);
	const [selectedVoucher, setSelectedVoucher] = useState();
	const [openModalDiscounts, setOpenModalDiscount] = useState(false);

	const getAllDiscount = async () => {
		try {
			setLoading(true);
			const res = await UserService.getAllDiscount(
				restaurantId,
				userId,
				totalPrice
			);
			setDiscounts(res);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		getAllDiscount();
	}, []);

	const handleCreateOrder = async () => {
		try {
			setLoading(true);
			const data = {
				customerId: userId,
				restaurantId: restaurantId,
				discountId: selectedVoucher?.discountId,
				categoryRoomId: null,
				nameReceiver: open.nameReceiver,
				phoneReceiver: open.phoneReceiver,
				timeReservation: dayjs(open?.timeReservation).format(
					"HH:mm:ss"
				),
				dateReservation: dayjs(open?.dateReservation),
				numberPerson: open?.numberPerson,
				numberChild: open?.numberChild,
				contentReservation: open?.contentReservation,
				orderMenus: open?.orderMenus,
				tableIds: open?.tableIds,
			};

			await UserService.createOrder(data);
			message.open({
				content: "Đặt bàn thành công",
				type: "success",
				style: {
					marginTop: "10vh",
				},
			});
			onCancel();
			form.resetFields();
		} catch (error) {
			message.open({
				content: "Đặt bàn thất bại",
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
				<Button className="mr-10 fw-600" onClick={() => onCancel()}>
					Đóng
				</Button>
				<Button
					className="mr-10 fw-600"
					type="primary"
					onClick={() => {
						handleCreateOrder();
					}}
				>
					Đồng ý
				</Button>
			</div>
		);
	};

	return (
		<ModalTotalContainer>
			<CustomModal
				open={!!open}
				onCancel={onCancel}
				width={600}
				footer={footer}
				style={{ marginTop: "150px" }}
			>
				<SpinCustom spinning={loading}>
					<div>
						<div className="fs-22 fw-600 d-flex justify-content-center">
							Thông tin đơn đặt bàn
						</div>
						<div>
							<div>
								<span className="fs-16 fw-500">Họ tên: </span>
								<span> {open?.nameReceiver} </span>
							</div>
							<div>
								<span className="fs-16 fw-500">
									Số điện thoại:{" "}
								</span>
								<span> {open?.phoneReceiver} </span>
							</div>
							<div>
								<span className="fs-16 fw-500">
									Thời gian:{" "}
								</span>
								<span>
									{" "}
									{dayjs(open?.timeReservation).format(
										"HH:mm"
									)}{" "}
								</span>
							</div>
							<div>
								<span className="fs-16 fw-500">
									Ngày/Tháng/Năm:{" "}
								</span>
								<span>
									{" "}
									{dayjs(open?.dateReservation).format(
										"DD-MM-YYYY"
									)}{" "}
								</span>
							</div>
							<div>
								<span className="fs-16 fw-500">
									Số người lớn:{" "}
								</span>
								<span> {open?.numberPerson} </span>
							</div>
							<div>
								<span className="fs-16 fw-500">
									Số trẻ em:{" "}
								</span>
								<span> {open?.numberChild} </span>
							</div>
							<div>
								<span className="fs-16 fw-500">Yêu cầu: </span>
								<span>
									{" "}
									{open?.contentReservation
										? open?.contentReservation
										: "Không có"}{" "}
								</span>
							</div>
							<div>
								<span className="mt-20 fs-16 fw-500">
									Tổng tiền:{" "}
								</span>
								<span> {formatNumberToK(totalPrice)} </span>
							</div>
						</div>
					</div>
					<div className="mt-20 mb-40">
						<div>
							<Button
								type="primary"
								onClick={() => setOpenModalDiscount(discounts)}
							>
								{" "}
								Chọn Voucher{" "}
							</Button>
						</div>
						{totalPrice !== 0 ? (
							<div>
								{selectedVoucher && (
									<div>
										<span className="red fw-500">
											Voucher đã chọn:{" "}
										</span>
										<span>
											{" "}
											{selectedVoucher?.discountName}{" "}
										</span>
									</div>
								)}
							</div>
						) : (
							<></>
						)}
					</div>
				</SpinCustom>
			</CustomModal>

			{!!openModalDiscounts && (
				<ModalDiscount
					open={openModalDiscounts}
					onCancel={() => setOpenModalDiscount(false)}
					setSelectedVoucher={setSelectedVoucher}
					selectedVoucher={selectedVoucher}
				/>
			)}
		</ModalTotalContainer>
	);
};

export default ModalCalFee;
