import { Avatar, Button, Col, Row } from "antd";
import CustomModal from "../../../../../components/Common/ModalCustom";
import table2 from "../../../../../../src/assets/images/table2.jpg";

const ModalDetail = ({ open, onCancel, onOk }) => {
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

	return (
		<CustomModal
			open={!!open}
			onCancel={onCancel}
			footer={footer}
			width={800}
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
									<div className="fs-14 fw-500">
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
											open?.orderTables.map(
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
																	Tên phòng:{" "}
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
																	Sức chứa:{" "}
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
									<div
										className="pl-20 fw-500 fs-18 mb-10"
										style={{ color: "gray" }}
									>
										- Danh sách món ăn
									</div>
									<Row gutter={[16, 16]} className="w-100">
										{open?.orderMenus.length === 0 ? (
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
											open?.orderMenus.map((t, index) => (
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
