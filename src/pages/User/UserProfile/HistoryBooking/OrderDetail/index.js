import { Button, Steps } from "antd";
import { CheckOutlined, StopOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useState } from "react";
import ModalUpdateFoods from "./ModalUpdateFoods";

const OrderDetail = ({
	setIsDetail,
	detail,
	getHistoryOrder,
	handleViewDetail,
}) => {
	const [foods, setFoods] = useState(
		detail?.statusOrder === "Pending"
			? detail?.orderMenus
			: detail?.orderMenusAdd
	);
	const [openModalChooseFood, setOpenModalChooseFood] = useState(false);

	const items = [
		{
			title: <span className="fs-15 fw-600">Đang chờ</span>,
			status: detail?.createdAt ? "finish" : "wait",
			icon: (
				<div className="step-icon">
					<CheckOutlined className="white fw-600" />
				</div>
			),
		},
		{
			title: <span className="fs-15 fw-600">Chấp nhận</span>,
			status: detail?.confirmedAt ? "finish" : "wait",
			icon: (
				<div className="step-icon">
					<CheckOutlined className="white fw-600" />
				</div>
			),
		},
		{
			title: <span className="fs-15 fw-600">Đã nhận bàn</span>,
			status: detail?.paidAt ? "finish" : "wait",
			icon: (
				<div className="step-icon">
					<CheckOutlined className="white fw-600" />
				</div>
			),
		},
		{
			title: <span className="fs-15 fw-600">Hoàn thành</span>,
			status: detail?.completedAt ? "complete" : "wait",
			icon: (
				<div className="step-icon">
					<CheckOutlined className="white fw-600" />
				</div>
			),
		},
		{
			title: <span className="fs-15 fw-600">Hủy</span>,
			status: detail?.cancelledAt ? "finish" : "wait",
			icon: (
				<div className="step-icon">
					<StopOutlined className="white fw-600" />
				</div>
			),
		},
	];
	// const canEdit = detail?.statusOrder === "Pending";
	return (
		<div className="form-order-detail">
			<Button
				shape="round"
				className="fs-14 fw-500 return-button"
				onClick={() => setIsDetail(false)}
			>
				Trở về
			</Button>

			<div className="step mt-20 mb-20">
				<Steps labelPlacement="vertical" items={items} />
			</div>

			<div className="fs-18 fw-600 ml-20 mb-10">Thông tin người nhận</div>

			<div className="info">
				<div>
					<span className="fs-14 mr-50">Tên:</span>
					<span className="fs-13 primary">
						{detail?.nameReceiver}
					</span>
				</div>
				<div>
					<span className="fs-14 mr-48">SĐT:</span>
					<span className="fs-13">
						<a
							href={`tel:${detail?.phoneReceiver}`}
							style={{
								color: "inherit",
								textDecoration: "none",
							}}
						>
							{detail?.phoneReceiver}
						</a>
					</span>
				</div>
				<div>
					<span className="fs-14 mr-10">Ngày đặt:</span>
					<span className="fs-13 primary">
						{dayjs(detail?.createdAt).format("DD-MM-YYYY")}
					</span>
				</div>
			</div>

			<div className="pl-20 pr-20">
				<table className="order-table">
					<thead>
						<tr>
							<th>Ngày/Tháng/Năm nhận bàn</th>
							<th>Thời gian nhận bàn</th>
							<th>Số người lớn</th>
							<th>Số trẻ nhỏ</th>
							<th>Bàn</th>
							<th>Món ăn đã chọn</th>
							{detail?.orderMenusAdd.length > 0 && (
								<th>Món ăn đã thêm</th>
							)}
							<th>Ghi chú</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								{dayjs(detail?.createdAt).format("DD-MM-YYYY")}
							</td>
							<td>
								{dayjs(
									detail?.timeReservation,
									"HH:mm:ss"
								).format("HH:mm")}
							</td>
							<td> {detail?.numberPerson} </td>
							<td> {detail?.numberChild} </td>
							<td>
								{detail?.orderTables?.length > 0
									? detail.orderTables
											.map(
												(table) =>
													`${table.tableName} (${
														table.roomName ??
														"Bàn tự do"
													})`
											)
											.join(", ")
									: "Chưa chọn bàn"}
							</td>
							<td>
								{detail?.orderMenus?.length > 0
									? detail.orderMenus
											.map(
												(menu) =>
													`${menu.menuName} (x${menu.quantity})`
											)
											.join(", ")
									: "Chưa chọn món ăn"}
							</td>
							{detail?.orderMenusAdd.length > 0 && (
								<td>
									{detail.orderMenusAdd
										.map(
											(menu) =>
												`${menu.menuName} (x${menu.quantity})`
										)
										.join(", ")}
								</td>
							)}

							<td>
								{detail?.contentReservation
									? detail?.contentReservation
									: "Không có"}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			{detail?.statusOrder === "Pending" && (
				<div className="mt-20">
					<div className="update-menu pl-20">
						<Button
							type="primary"
							shape="round"
							onClick={() => setOpenModalChooseFood(true)}
						>
							Thay đổi món ăn
						</Button>
					</div>
				</div>
			)}
			{detail?.statusOrder === "Confirm" && (
				<div className="mt-20">
					<div className="update-menu pl-20">
						<Button
							type="primary"
							shape="round"
							onClick={() => setOpenModalChooseFood(true)}
						>
							Thêm món ăn
						</Button>
					</div>
				</div>
			)}

			{!!openModalChooseFood && (
				<ModalUpdateFoods
					open={openModalChooseFood}
					onCancel={() => setOpenModalChooseFood(false)}
					setFoods={setFoods}
					foods={foods}
					detail={detail}
					restaurantId={detail?.restaurantId}
					getHistoryOrder={getHistoryOrder}
					handleViewDetail={handleViewDetail}
					orderId={detail?.orderId}
					customerId={detail?.customerId}
				/>
			)}
		</div>
	);
};

export default OrderDetail;
