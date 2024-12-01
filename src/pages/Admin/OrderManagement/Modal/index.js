import { Avatar, Button, Col, Row } from "antd";
import CustomModal from "../../../../components/Common/ModalCustom";
import { ModalViewDetailContainer } from "./styled";
import table2 from "../../../../assets/images/table2.jpg";
import { formatNumberToK } from "../../../../lib/stringUtils";
import dayjs from "dayjs";
import { useState } from "react";

const ModalViewDetail = ({ open, onCancel }) => {
	const [showAllTable, setShowAllTable] = useState(false);
	const [showAllMenus, setShowAllMenus] = useState(false);
	const [showAllMenusAdd, setShowMenusAdd] = useState(false);
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

	const visibleItems = showAllMenus
		? open?.orderMenus
		: open?.orderMenus.slice(0, 2);
	const visibleTables = showAllTable
		? open?.orderTables
		: open?.orderTables.slice(0, 2);
	const visibleMenusAdd = showAllMenusAdd
		? open?.orderMenusAdd
		: open?.orderMenusAdd.slice(0, 2);

	return (
		<CustomModal
			open={!!open}
			onCancel={onCancel}
			footer={footer}
			width={1200}
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
									<span> Giá trị cọc bàn: </span>
									<span> Giá trị món ăn: </span>
									<span> Giá trị món ăn thêm: </span>
									<span> Thời gian đặt: </span>
									<span> Số người: </span>
									<span> Lời nhắc: </span>
								</div>
								<div className="fs-16 fw-500 d-flex flex-column">
									<span> {open?.nameRes} </span>
									<span> {open?.nameReceiver} </span>
									<span> {open?.phoneReceiver} </span>
									<span>
										{" "}
										{formatNumberToK(
											open?.depositAmount
										)}{" "}
									</span>
									<span>
										{" "}
										{formatNumberToK(open?.foodAmount)}{" "}
									</span>
									<span>
										{" "}
										{formatNumberToK(
											open?.foodAddAmount
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
									<Col span={8}>
										<div className="pl-20 fw-500 fs-18 mb-10">
											- Danh sách bàn
										</div>
										<Row
											gutter={[16, 16]}
											className="w-100"
										>
											{visibleTables.length === 0 ? (
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
												visibleTables.map(
													(t, index) => (
														<Col
															span={12}
															key={index}
															className="w-100"
														>
															<div className="table-item">
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
																	<div
																		className="fs-18 fw-500"
																		style={{
																			color: "gray",
																		}}
																	>
																		Tên
																		phòng:{" "}
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
													)
												)
											)}
										</Row>
										{open?.orderTables.length > 2 && (
											<div className="w-100 text-center mt-16">
												<button
													onClick={() =>
														setShowAllTable(
															!showAllTable
														)
													}
													style={{
														backgroundColor:
															"transparent",
														border: "none",
														color: "black",
														cursor: "pointer",
														fontSize: "16px",
														fontWeight: "500",
													}}
												>
													{showAllTable
														? "Ẩn bớt"
														: "Xem thêm"}
												</button>
											</div>
										)}
									</Col>
									<Col span={8}>
										<div className="pl-20 fw-500 fs-18 mb-10">
											- Danh sách món ăn
										</div>
										<Row
											gutter={[16, 16]}
											className="w-100"
										>
											{visibleItems.length === 0 ? (
												<div
													className="w-100 text-center"
													style={{
														color: "red",
														fontSize: "20px",
													}}
												>
													Chưa chọn món ăn
												</div>
											) : (
												visibleItems.map((t, index) => (
													<Col
														span={12}
														key={index}
														className="w-100"
													>
														<div className="table-item">
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
																<div
																	className="fs-18 fw-500"
																	style={{
																		color: "gray",
																	}}
																>
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
																	Số lượng:{" "}
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
																	{t?.price}{" "}
																	VNĐ
																</div>
															</div>
														</div>
													</Col>
												))
											)}
										</Row>
										{open?.orderMenus.length > 2 && (
											<div className="w-100 text-center mt-16">
												<button
													onClick={() =>
														setShowAllMenus(
															!showAllMenus
														)
													}
													style={{
														backgroundColor:
															"transparent",
														border: "none",
														color: "black",
														cursor: "pointer",
														fontSize: "16px",
														fontWeight: "500",
													}}
												>
													{showAllMenus
														? "Ẩn bớt"
														: "Xem thêm"}
												</button>
											</div>
										)}
									</Col>
									<Col span={8}>
										<div className="pl-20 fw-500 fs-18 mb-10">
											- Danh sách món ăn
										</div>
										<Row
											gutter={[16, 16]}
											className="w-100"
										>
											{visibleMenusAdd.length === 0 ? (
												<div
													className="w-100 text-center"
													style={{
														color: "red",
														fontSize: "20px",
													}}
												>
													Chưa chọn món ăn
												</div>
											) : (
												visibleMenusAdd.map(
													(t, index) => (
														<Col
															span={12}
															key={index}
															className="w-100"
														>
															<div className="table-item">
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
																	<div
																		className="fs-18 fw-500"
																		style={{
																			color: "gray",
																		}}
																	>
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
																		{
																			t?.price
																		}{" "}
																		VNĐ
																	</div>
																</div>
															</div>
														</Col>
													)
												)
											)}
										</Row>
										{open?.orderMenusAdd.length > 2 && (
											<div className="w-100 text-center mt-16">
												<button
													onClick={() =>
														setShowMenusAdd(
															!showAllMenusAdd
														)
													}
													style={{
														backgroundColor:
															"transparent",
														border: "none",
														color: "black",
														cursor: "pointer",
														fontSize: "16px",
														fontWeight: "500",
													}}
												>
													{showAllMenusAdd
														? "Ẩn bớt"
														: "Xem thêm"}
												</button>
											</div>
										)}
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
