import { Avatar, Button, Col, Row } from "antd";
import CustomModal from "../../../../components/Common/ModalCustom";
import { ModalViewDetailContainer } from "./styled";
import table2 from "../../../../assets/images/table2.jpg";
import { formatNumberToK } from "../../../../lib/stringUtils";
import dayjs from "dayjs";

const ModalViewDetail = ({ open, onCancel }) => {
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
			</div>
		);
	};

	console.log(open);

	return (
		<CustomModal
			open={!!open}
			onCancel={onCancel}
			footer={footer}
			width={800}
			// style={{marginTop: '-80px'}}
		>
			<ModalViewDetailContainer>
				<div className="title-type-1">Chi tiết đơn hàng</div>
				<div className="mt-20 mb-30">
					<Row gutter={[16, 16]}>
						<Col span={24}>
							<div className="d-flex">
								<div
									className="fs-16 fw-500 w-40 d-flex flex-column"
									style={{ color: "gray" }}
								>
									<span> Tên nhà hàng: </span>
									<span> Người nhận: </span>
									<span> SĐT người nhận: </span>
									<span> Tổng tiền: </span>
									<span> Thời gian đặt: </span>
									<span> Số người: </span>
									<span> Lời nhắc: </span>
								</div>
								<div className="fs-16 fw-500 d-flex flex-column">
									<span> abc </span>
									<span> {open?.nameReceiver} </span>
									<span> {open?.phoneReceiver} </span>
									<span>
										{" "}
										{formatNumberToK(
											open?.totalAmount
										)}{" "}
									</span>
									<span>
										{" "}
										Ngày:{" "}
										{dayjs(open?.dateReservation).format(
											"DD-MM-YYYY"
										)}{" "}
										{open?.timeReservation}
									</span>
									<span>
										Người lớn: {open?.numberPerson}, Trẻ
										nhỏ: {open?.numberChild}
									</span>
									<span>
										{" "}
										{open?.contentReservation
											? open?.contentReservation
											: "Không có"}{" "}
									</span>
								</div>
							</div>
							<div className="pl-20 fw-500 fs-18 mb-10 mt-20">
								<Row gutter={[16, 16]}>
									<Col span={12}>
										<div className="pl-20 fw-500 fs-18 mb-10">
											- Danh sách bàn
										</div>
										<Row
											gutter={[16, 16]}
											className="w-100 "
										>
											{open?.orderTables.length === 0 ? (
												<div
													className="w-100 text-center"
													style={{
														color: "red",
														fontSize: "20px",
													}}
												>
													Chưa chọn bàn
												</div>
											) : (
												open?.orderTables
													.slice(0, 10)
													.map((t, index) => (
														<Col
															span={12}
															key={index}
															className="w-100"
														>
															<div className="table-item d-flex flex-column justify-content-center align-items-center">
																<Avatar
																	size={100}
																	src={
																		<img
																			src={
																				table2
																			}
																			alt="table2"
																		/>
																	}
																/>
																<div className="des">
																	<div className="fs-16 fw-500">
																		Tên
																		phòng:
																		{
																			t?.roomName
																		}
																	</div>
																	<div
																		className="fs-16 fw-500"
																		style={{
																			color: "gray",
																		}}
																	>
																		Tên bàn:{" "}
																		{
																			t?.tableName
																		}
																	</div>
																	<div
																		className="quantity"
																		style={{
																			color: "gray",
																		}}
																	>
																		Sức
																		chứa:{" "}
																		{
																			t?.maxCapacity
																		}{" "}
																		người
																	</div>
																	<div
																		className="description"
																		style={{
																			color: "gray",
																		}}
																	>
																		{
																			t?.description
																		}
																	</div>
																</div>
															</div>
														</Col>
													))
											)}
										</Row>
									</Col>
									<Col span={12}>
										<div className="pl-20 fw-500 fs-18 mb-10">
											- Danh sách món ăn
										</div>
										<Row
											gutter={[16, 16]}
											className="w-100"
										>
											{open?.orderMenus.length === 0 ? (
												<div className="w-100 text-center red fs-20">
													Chưa chọn món ăn
												</div>
											) : (
												open?.orderMenus
													.slice(0, 20)
													.map((t, index) => (
														<Col
															span={10}
															key={index}
															className="w-100"
														>
															<div className="table-item d-flex flex-column justify-content-center align-items-center">
																<Avatar
																	size={100}
																	src={
																		<img
																			src={
																				t?.menuImage
																			}
																			alt={
																				t?.menuName
																			}
																		/>
																	}
																/>
																<div className="des">
																	<div className="fs-16 fw-500">
																		{
																			t?.menuName
																		}
																	</div>
																	<div
																		className="fs-16 fw-500"
																		style={{
																			color: "gray",
																		}}
																	>
																		Số
																		lượng:{" "}
																		{
																			t?.quantity
																		}
																	</div>
																	<div
																		className="quantity"
																		style={{
																			color: "gray",
																		}}
																	>
																		Giá:{" "}
																		{formatNumberToK(
																			t?.price
																		)}
																	</div>
																</div>
															</div>
														</Col>
													))
											)}
										</Row>
									</Col>
								</Row>
							</div>
						</Col>
					</Row>
				</div>
			</ModalViewDetailContainer>
		</CustomModal>
	);
};

export default ModalViewDetail;
