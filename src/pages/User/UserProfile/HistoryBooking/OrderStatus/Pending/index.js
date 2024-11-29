import { Space, Table } from "antd";
import SpinCustom from "../../../../../../components/Common/SpinCustom";
import dayjs from "dayjs";
import OrderDetail from "../../OrderDetail";
import { useState } from "react";
import ModalCancelOrder from "../../Modal/CancelOrder";
import { formatNumberToK } from "../../../../../../lib/stringUtils";
import { SiGooglemaps } from "react-icons/si";

const Pending = ({
	getHistoryOrder,
	orderHistory,
	loading,
	orderDetail,
	isDetail,
	setIsDetail,
	handleViewDetail,
}) => {
	const [openModalCancelOrder, setOpenModalCancelOrder] = useState(false);

	const columns = [
		{
			title: "Tên Cửa Hàng",
			dataIndex: "restaurantName",
			key: "restaurantName",
			width: 250,
			render: (text, record) => (
				<span className="fs-15">
					<a
						href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
							record.address
						)}`}
						target="_blank"
						rel="noopener noreferrer"
						style={{ marginLeft: 8 }}
					>
						<SiGooglemaps
							style={{ color: "red", fontSize: "20px" }}
						/>
					</a>
					{text}{" "}
				</span>
			),
		},

		{
			title: "SDT Cửa Hàng",
			dataIndex: "restaurantPhone",
			key: "restaurantPhone",
			width: 150,
			render: (phone) => (
				<a
					href={`tel:${phone}`}
					style={{ color: "inherit", textDecoration: "none" }}
				>
					{phone}
				</a>
			),
		},
		{
			title: "Thời Gian Đặt",
			dataIndex: "createdAt",
			key: "createdAt",
			width: 200,
			render: (value) => (
				<span> {dayjs(value).format("DD-MM-YYYY HH:mm")} </span>
			),
		},
		{
			title: "Giá trị cọc bàn",
			dataIndex: "depositAmount",
			key: "depositAmount",
			width: 150,
			render: (value) => <span> {formatNumberToK(value)} </span>,
		},
		{
			title: "Giá trị món ăn",
			dataIndex: "foodAmount",
			key: "foodAmount",
			width: 150,
			render: (value) => <span> {formatNumberToK(value)} </span>,
		},
		{
			title: "Tổng giá trị đơn hàng",
			dataIndex: "totalAmount",
			key: "totalAmount",
			width: 150,
			render: (value) => <span> {formatNumberToK(value)} </span>,
		},
		{
			title: "Trạng Thái",
			dataIndex: "statusOrder",
			key: "statusOrder",
			width: 120,
			render: (value) => (
				<Space size="middle d-flex">
					<div className="status pending">Đang chờ</div>
				</Space>
			),
		},
		{
			title: "Chi Tiết",
			dataIndex: "statusOrder",
			key: "statusOrder",
			width: 200,
			render: (_, record) => (
				<Space size="middle d-flex">
					<button
						onClick={() => handleViewDetail(record)}
						className="btn detail-btn"
					>
						Chi Tiết
					</button>
					<button
						className="btn cancel-btn"
						onClick={() => setOpenModalCancelOrder(record)}
					>
						Hủy
					</button>
				</Space>
			),
		},
	];

	return (
		<div>
			<SpinCustom spinning={loading}>
				<div className="fs-22 fw-600 mb-20 mt-30">
					{isDetail === false
						? "Danh sách đặt bàn"
						: "Chi tiết đơn đặt bàn"}
				</div>
				{!isDetail ? (
					<Table
						columns={columns}
						dataSource={orderHistory.filter(
							(o) => o.statusOrder === "Pending"
						)}
						pagination={{ pageSize: 5 }}
						bordered
					/>
				) : (
					<OrderDetail
						setIsDetail={setIsDetail}
						detail={orderDetail}
						getHistoryOrder={getHistoryOrder}
						handleViewDetail={handleViewDetail}
					/>
				)}
			</SpinCustom>

			{!!openModalCancelOrder && (
				<ModalCancelOrder
					open={openModalCancelOrder}
					onCancel={() => setOpenModalCancelOrder(false)}
					onOk={getHistoryOrder}
				/>
			)}
		</div>
	);
};

export default Pending;
