import { Button, Space, Table } from "antd";
import SpinCustom from "../../../../../../components/Common/SpinCustom";
import OrderDetail from "../../OrderDetail";
import dayjs from "dayjs";
import { formatNumberToK } from "../../../../../../lib/stringUtils";
import { SiGooglemaps } from "react-icons/si";
import { useState } from "react";
import ModalViewReason from "../../Modal/ModalViewReason";

const Cancel = ({
	orderHistory,
	loading,
	orderDetail,
	isDetail,
	setIsDetail,
	handleViewDetail,
}) => {
	const [openModalViewReason, setOpenModalViewReason] = useState(false)

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
			title: "Giá trị món ăn thêm",
			dataIndex: "foodAddAmount",
			key: "foodAddAmount",
			width: 150,
			render: (value) => (
				<span> {!!value ? formatNumberToK(value) : "0đ"} </span>
			),
		},
		{
			title: "Tổng giá trị đơn hàng",
			dataIndex: "totalAmount",
			key: "totalAmount",
			width: 150,
			render: (value) => <span> {formatNumberToK(value)} </span>,
		},
		{
			title: "Hình thức thanh toán",
			dataIndex: "paidType",
			key: "paidType",
			width: 150,
			render: (value, record) => (
				<span>
					{!!value === "Entire Order"
						? `hanh toán toàn bộ đơn hàng: ${formatNumberToK(record?.totalPaymentAmount)}`
						: `Thanh toán tiền cọc: ${formatNumberToK(record?.totalPaymentAmount)}`}
				</span>
			),
		},
		{
			title: "Trạng Thái",
			dataIndex: "statusOrder",
			key: "statusOrder",
			width: 120,
			render: (value) => (
				<Space size="middle d-flex">
					<div className="status cancel">Đã hủy</div>
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
						className="ml-5 btn cancel-btn"
						onClick={() => setOpenModalViewReason(record)}
					>
						Xem lý do
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
							(o) => o.statusOrder === "Cancel"
						)}
						pagination={{ pageSize: 5 }}
						bordered
					/>
				) : (
					<OrderDetail
						setIsDetail={setIsDetail}
						detail={orderDetail}
					/>
				)}
			</SpinCustom>

				{
					openModalViewReason && (
						<ModalViewReason
							open={openModalViewReason}
							onCancel={() => setOpenModalViewReason(false)}
						/>
					)
				}

		</div>
	);
};

export default Cancel;
