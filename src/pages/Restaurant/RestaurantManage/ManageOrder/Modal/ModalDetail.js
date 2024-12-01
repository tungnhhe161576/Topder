import { Avatar, Button, Col, Row } from "antd";
import CustomModal from "../../../../../components/Common/ModalCustom";
import table2 from "../../../../../../src/assets/images/table2.jpg";
import { formatNumberToK } from "../../../../../lib/stringUtils";
import { useState } from "react";

const ModalDetail = ({ open, onCancel, onOk }) => {
	const [showAllTable, setShowAllTable] = useState(false);
	const [showAllMenus, setShowAllMenus] = useState(false);
	const [showAllMenusAdd, setShowMenusAdd] = useState(false);
	const footer = () => {
		return (
			<div className="d-flex justify-content-center">
				<Button
					className="mr-10 fw-600 bg-gray"
					type="primary"
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
		: open?.orderMenus.slice(0, 3);
	const visibleTables = showAllTable
		? open?.orderTables
		: open?.orderTables.slice(0, 3);
	const visibleMenusAdd = showAllMenusAdd
		? open?.orderMenusAdd
		: open?.orderMenusAdd.slice(0, 3);
	return (
		<CustomModal
			open={!!open}
			onCancel={onCancel}
			footer={footer}
			width={1000}
		>
			<div className="mb-30">
				<div className="title-type-1">Chi tiết đơn hàng</div>
				<div className="mt-10">
					<Row gutter={[16, 16]}>
						<Col span={8}>
							<div>
								<div
									className="pl-20 fw-500 fs-18 mb-10"
									style={{ color: "black" }}
								>
									Thông tin người đặt
								</div>
								<div className="d-flex flex-column align-items-center pl-20 w-60">
									<div>
										<Avatar
											size={80}
											src={
												<img
													src={open?.customerImage}
													alt="avatar"
												/>
											}
										/>
									</div>
									<div className="fs-16 fw-500 mt-8">
										<span style={{ color: "gray" }}>
											Người nhận:{" "}
										</span>
										{open?.nameReceiver}
									</div>
									<div className="fs-16 fw-500">
										<span style={{ color: "gray" }}>
											SĐT:{" "}
										</span>
										<a
											href={`tel:${open?.phoneReceiver}`}
											style={{
												color: "inherit",
												textDecoration: "none",
											}}
										>
											{open?.phoneReceiver}
										</a>
									</div>
									<div className="fs-16 fw-500 mt-8">
										<span style={{ color: "gray" }}>
											Giá trị cọc bàn:{" "}
										</span>
										{formatNumberToK(open?.depositAmount)}
									</div>
									<div className="fs-16 fw-500 mt-8">
										<span style={{ color: "gray" }}>
											Giá trị món ăn:{" "}
										</span>
										{formatNumberToK(open?.foodAmount)}
									</div>
									<div className="fs-16 fw-500 mt-8">
										<span style={{ color: "gray" }}>
											Giá trị món ăn thêm:{" "}
										</span>
										{formatNumberToK(open?.foodAddAmount)}
									</div>
								</div>
							</div>
						</Col>
						<Col span={16}>
							<div
								className="pl-20 fw-500 fs-18 mb-10"
								style={{ color: "black" }}
							>
								<div>Thông tin đơn hàng</div>
								<div>
									<div
										className="pl-20 fw-500 fs-18 mb-10"
										style={{ color: "gray" }}
									>
										- Danh sách bàn
									</div>
									<Row gutter={[16, 16]} className="w-100">
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
											visibleTables.map((t, index) => (
												<Col
													span={8}
													key={index}
													className="w-100"
												>
													<div className="table-item">
														<Avatar
															size={100}
															src={
																<img
																	src={table2}
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
																Tên phòng:{" "}
																{t?.roomName}
															</div>
															<div
																className="fs-16 fw-500"
																style={{
																	color: "gray",
																}}
															>
																Tên bàn:{" "}
																{t?.tableName}
															</div>
															<div
																className="quantity"
																style={{
																	color: "gray",
																}}
															>
																Sức chứa:{" "}
																{t?.maxCapacity}{" "}
																người
															</div>
															<div
																className="description"
																style={{
																	color: "gray",
																}}
															>
																{t?.description}
															</div>
														</div>
													</div>
												</Col>
											))
										)}
									</Row>
									{open?.orderTables.length > 3 && (
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
									<div
										className="pl-20 fw-500 fs-18 mb-10"
										style={{ color: "gray" }}
									>
										- Danh sách món ăn
									</div>
									<Row gutter={[16, 16]} className="w-100">
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
													span={8}
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
																{t?.menuName}
															</div>
															<div
																className="fs-16 fw-500"
																style={{
																	color: "gray",
																}}
															>
																Số lượng:{" "}
																{t?.quantity}
															</div>
															<div
																className="quantity"
																style={{
																	color: "gray",
																}}
															>
																Giá: {t?.price}{" "}
																VNĐ
															</div>
														</div>
													</div>
												</Col>
											))
										)}
									</Row>
									{open?.orderMenus.length > 3 && (
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
									<div
										className="pl-20 fw-500 fs-18 mb-10"
										style={{ color: "gray" }}
									>
										- Danh sách món ăn thêm
									</div>
									<Row gutter={[16, 16]} className="w-100">
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
											visibleMenusAdd.map((t, index) => (
												<Col
													span={8}
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
																{t?.menuName}
															</div>
															<div
																className="fs-16 fw-500"
																style={{
																	color: "gray",
																}}
															>
																Số lượng:{" "}
																{t?.quantity}
															</div>
															<div
																className="quantity"
																style={{
																	color: "gray",
																}}
															>
																Giá: {t?.price}{" "}
																VNĐ
															</div>
														</div>
													</div>
												</Col>
											))
										)}
									</Row>
									{open?.orderMenusAdd.length > 3 && (
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
								</div>
							</div>
						</Col>
					</Row>
				</div>
			</div>
		</CustomModal>
	);
};

export default ModalDetail;
