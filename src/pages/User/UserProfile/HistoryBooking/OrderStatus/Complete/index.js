import { Space, Table } from "antd";
import SpinCustom from "../../../../../../components/Common/SpinCustom";
import OrderDetail from "../../OrderDetail";
import dayjs from "dayjs";
import { useState } from "react";
import ModalFeedback from "../../Modal/Feedback";
import { formatNumberToK } from "../../../../../../lib/stringUtils";
import { SiGooglemaps } from "react-icons/si";

const Complete = ({
	orderHistory,
	loading,
	orderDetail,
	isDetail,
	setIsDetail,
	handleViewDetail,
	getHistoryOrder,
}) => {
	const [openModalSendFeedback, setOpenModalSendFeedback] = useState(false);

	const columns = [
		{
			title: "Tên Cửa Hàng",
			dataIndex: "restaurantName",
			key: "restaurantName",
			width: 200,
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
			render: (value) => (
				<span>
					{" "}
					{value === "Entire Order"
						? "Thanh toán toàn bộ đơn hàng"
						: "Thanh toán tiền cọc"}{" "}
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
					<div className="status complete">Hoàn thành</div>
				</Space>
			),
		},
		{
			title: "Chi Tiết",
			dataIndex: "statusOrder",
			key: "statusOrder",
			width: 250,
			render: (_, record) => (
				<Space size="middle d-flex">
					<button
						onClick={() => handleViewDetail(record)}
						className="btn detail-btn"
					>
						Chi Tiết
					</button>
					{!record?.isFeedback ? (
						<button
							style={{
								background: "#8bc34a",
								borderRadius: "25px",
								border: "none",
								cursor: "pointer",
							}}
							className="pt-5 pb-5 pl-10 pr-10"
							onClick={() => setOpenModalSendFeedback(record)}
						>
							Đánh giá
						</button>
					) : (
						<button
							style={{
								background: "#8bc34a",
								borderRadius: "25px",
								border: "none",
								cursor: "pointer",
							}}
							className="pt-5 pb-5 pl-10 pr-10"
							onClick={() => setOpenModalSendFeedback(record)}
						>
							Xem đánh giá
						</button>
					)}
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
							(o) => o.statusOrder === "Complete"
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

			{!!openModalSendFeedback && (
				<ModalFeedback
					open={openModalSendFeedback}
					onCancel={() => setOpenModalSendFeedback(false)}
					onOk={getHistoryOrder}
				/>
			)}
		</div>
	);
};

export default Complete;
