import React, { useState } from "react";
import {
	Button,
	Col,
	Modal,
	Row,
	Space,
	Table,
	Tag,
	Select,
	DatePicker,
} from "antd";
import RestaurantLayout from "../../../../components/Layouts/RestaurantLayout";
import { FileAddOutlined } from "@ant-design/icons";
import { ManageOrderContainer } from "./styled";

const { Option } = Select;

const ManageOrder = () => {
	const initialData = [
		{
			key: "1",
			id: "1006",
			nameOrderer: "Huân Bá",
			phoneOrderer: "0327765248",
			nameReceiver: "Huân Bá",
			phoneReceiver: "0327765248",
			orderDate: "18/06/2024",
			status: "Chờ Duyệt",
			history: [
				{ status: "Chờ duyệt", time: "18:30 12/06/2024" },
				{ status: "Chấp Nhận", time: "04:29 13/06/2024" },
				{ status: "Đã Nhận Bàn", time: "13:28 14/06/2024" },
			],
			details: {
				dateReceived: "18/06/2024",
				timeReceived: "08:00",
				adults: 4,
				children: 2,
				notes: "Không có ghi chú",
			},
		},
		{
			key: "2",
			id: "1007",
			nameOrderer: "Đỗ Văn Đạt",
			phoneOrderer: "0968519615",
			nameReceiver: "Đỗ Văn Đạt",
			phoneReceiver: "0968519615",
			orderDate: "14/06/2024",
			status: "Chấp Nhận",
			history: [
				{ status: "Chờ duyệt", time: "12:00 14/06/2024" },
				{ status: "Chấp Nhận", time: "13:00 14/06/2024" },
			],
			details: {
				dateReceived: "14/06/2024",
				timeReceived: "09:00",
				adults: 3,
				children: 1,
				notes: "Mang thêm ghế",
			},
		},
		{
			key: "3",
			id: "1008",
			nameOrderer: "Nguyễn Văn An",
			phoneOrderer: "0967778888",
			nameReceiver: "Nguyễn Văn An",
			phoneReceiver: "0967778888",
			orderDate: "13/06/2024",
			status: "Đã Nhận Bàn",
			history: [
				{ status: "Chờ duyệt", time: "11:30 13/06/2024" },
				{ status: "Chấp Nhận", time: "12:30 13/06/2024" },
				{ status: "Đã Nhận Bàn", time: "14:00 13/06/2024" },
			],
			details: {
				dateReceived: "13/06/2024",
				timeReceived: "12:00",
				adults: 2,
				children: 0,
				notes: "Không có ghi chú",
			},
		},
		{
			key: "4",
			id: "1009",
			nameOrderer: "Ngô Quang Huy",
			phoneOrderer: "0967891234",
			nameReceiver: "Ngô Quang Huy",
			phoneReceiver: "0967891234",
			orderDate: "15/06/2024",
			status: "Thành Công",
			history: [
				{ status: "Chờ duyệt", time: "08:00 15/06/2024" },
				{ status: "Chấp Nhận", time: "09:00 15/06/2024" },
				{ status: "Đã Nhận Bàn", time: "10:00 15/06/2024" },
				{ status: "Thành Công", time: "12:00 15/06/2024" },
			],
			details: {
				dateReceived: "15/06/2024",
				timeReceived: "10:30",
				adults: 5,
				children: 2,
				notes: "Đặt tiệc sinh nhật",
			},
		},
		{
			key: "5",
			id: "1010",
			nameOrderer: "Phạm Văn Tân",
			phoneOrderer: "0979999999",
			nameReceiver: "Phạm Văn Tân",
			phoneReceiver: "0979999999",
			orderDate: "16/06/2024",
			status: "Chờ Duyệt",
			history: [{ status: "Chờ duyệt", time: "10:00 16/06/2024" }],
			details: {
				dateReceived: "16/06/2024",
				timeReceived: "11:00",
				adults: 2,
				children: 1,
				notes: "Không có ghi chú",
			},
		},
		{
			key: "6",
			id: "1011",
			nameOrderer: "Trần Thị Mai",
			phoneOrderer: "0968888888",
			nameReceiver: "Trần Thị Mai",
			phoneReceiver: "0968888888",
			orderDate: "17/06/2024",
			status: "Thành Công",
			history: [
				{ status: "Chờ duyệt", time: "08:00 17/06/2024" },
				{ status: "Chấp Nhận", time: "09:00 17/06/2024" },
				{ status: "Đã Nhận Bàn", time: "10:30 17/06/2024" },
				{ status: "Thành Công", time: "12:00 17/06/2024" },
			],
			details: {
				dateReceived: "17/06/2024",
				timeReceived: "12:30",
				adults: 6,
				children: 3,
				notes: "Đặt tiệc gia đình",
			},
		},
	];

	const [data, setData] = useState(initialData);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [selectedOrder, setSelectedOrder] = useState(null);

	const showDetail = (record) => {
		setSelectedOrder(record);
		setIsModalVisible(true);
	};

	const handleOk = () => {
		setIsModalVisible(false);
		setSelectedOrder(null);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
		setSelectedOrder(null);
	};

	const updateStatus = (key) => {
		const newData = data.map((item) => {
			if (item.key === key) {
				const updatedStatus =
					item.status === "Chờ Duyệt"
						? "Chấp Nhận"
						: item.status === "Chấp Nhận"
						? "Đã Nhận Bàn"
						: item.status;
				return { ...item, status: updatedStatus };
			}
			return item;
		});
		setData(newData);
	};

	const statusCounts = {
		"Chờ Duyệt": 7,
		"Chấp Nhận": 1,
		"Đã Nhận Bàn": 1,
		"Thành Công": 1,
		Hủy: 0,
	};

	// Cột cho bảng
	const columns = [
		{
			title: "ID",
			dataIndex: "id",
			key: "id",
		},
		{
			title: "Tên Người Đặt",
			dataIndex: "nameOrderer",
			key: "nameOrderer",
		},
		{
			title: "SĐT Người Đặt",
			dataIndex: "phoneOrderer",
			key: "phoneOrderer",
		},
		{
			title: "Tên Người Nhận",
			dataIndex: "nameReceiver",
			key: "nameReceiver",
		},
		{
			title: "SĐT Người Nhận",
			dataIndex: "phoneReceiver",
			key: "phoneReceiver",
		},
		{
			title: "Thời Gian Tạo Đơn",
			dataIndex: "orderDate",
			key: "orderDate",
		},
		{
			title: "Lịch Sử Trạng Thái",
			dataIndex: "history",
			key: "history",
			render: (history) => (
				<Space direction="vertical">
					{history.map((item, index) => (
						<Tag
							key={index}
							className={
								item.status === "Chấp Nhận"
									? "tag-accepted"
									: item.status === "Đã Nhận Bàn"
									? "tag-received"
									: item.status === "Thành Công"
									? "tag-success"
									: item.status === "Hủy"
									? "tag-cancelled"
									: "tag-default"
							}
						>
							{item.status}: {item.time}
						</Tag>
					))}
				</Space>
			),
		},
		{
			title: "Trạng Thái",
			dataIndex: "status",
			key: "status",
			render: (status) => {
				let className;
				if (status === "Chờ Duyệt") className = "tag-waiting";
				else if (status === "Chấp Nhận") className = "tag-accepted";
				else if (status === "Đã Nhận Bàn") className = "tag-received";
				else if (status === "Thành Công") className = "tag-success";
				else if (status === "Hủy") className = "tag-cancelled";

				return <Tag className={className}>{status}</Tag>;
			},
		},
		{
			title: "Chi Tiết",
			key: "detail",
			render: (_, record) => (
				<Button
					className="btn-detail"
					onClick={() => showDetail(record)}
				>
					Detail
				</Button>
			),
		},
		{
			title: "Cập Nhật Trạng Thái",
			key: "updateStatus",
			render: (_, record) => (
				<span>
					<span style={{ marginRight: 10 }}>{record.status}</span>
					<Button
						className="btn-status"
						type="default"
						onClick={() => updateStatus(record.key)}
					>
						Cập Nhật
					</Button>
				</span>
			),
		},
	];

	const onSearchByMonth = (value) => {
		console.log(
			"Tìm kiếm theo Tháng/Năm:",
			value ? value.format("YYYY-MM") : "No date selected"
		);
	};

	const onSearchByDate = (value) => {
		console.log(
			"Tìm kiếm theo Ngày/Tháng/Năm:",
			value ? value.format("MM/DD/YYYY") : "No date selected"
		);
	};
	return (
		<RestaurantLayout>
			<ManageOrderContainer>
				<div className="d-flex justify-content-space-between align-items-center">
					<div>
						<h3 className="card-title card-title-dash">Đơn Hàng</h3>
					</div>
					<div className="d-flex-end">
						<Button type="primary" className="white fs-15">
							<FileAddOutlined /> Xuất file excel
						</Button>
					</div>
				</div>
				<div>
					<Row
						justify="center"
						gutter={[16, 16]}
						className="search-container"
					>
						<Col>
							<label>Tháng/Năm</label>
							<DatePicker
								picker="month"
								style={{ marginRight: "10px" }}
								placeholder="----/--"
							/>
							<Button onClick={() => onSearchByMonth()}>
								Tìm Kiếm
							</Button>
						</Col>
						<Col>
							<label>Ngày/Tháng/Năm</label>
							<DatePicker
								style={{ marginRight: "10px" }}
								placeholder="mm/dd/yyyy"
							/>
							<Button onClick={() => onSearchByDate()}>
								Tìm Kiếm
							</Button>
						</Col>
					</Row>
				</div>

				<Row justify="center">
					<Col xs={24} sm={24} md={24} lg={24} xl={24}>
						<div className="status-bar">
							{Object.keys(statusCounts).map((status) => (
								<Tag
									key={status}
									className={
										status === "Chờ Duyệt"
											? "tag-waiting"
											: status === "Chấp Nhận"
											? "tag-accepted"
											: status === "Đã Nhận Bàn"
											? "tag-received"
											: status === "Thành Công"
											? "tag-success"
											: "tag-cancelled"
									}
								>
									{status}: {statusCounts[status]}
								</Tag>
							))}
						</div>

						<Table
							columns={columns}
							dataSource={data}
							pagination={{
								pageSize: 4,
								position: ["bottomCenter"],
							}}
						/>

						<Modal
							title="Chi Tiết Đơn Hàng"
							visible={isModalVisible}
							onOk={handleOk}
							onCancel={handleCancel}
							footer={null}
						>
							{selectedOrder && (
								<div className="order-detail">
									<h3>Chi Tiết Đơn Hàng</h3>
									<table>
										<thead>
											<tr>
												<th>Ngày/Tháng/Năm Nhận Bàn</th>
												<th>Thời Gian Nhận Bàn</th>
												<th>Số Người Lớn</th>
												<th>Số Trẻ Nhỏ</th>
												<th>Ghi Chú</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>
													{
														selectedOrder.details
															.dateReceived
													}
												</td>
												<td>
													{
														selectedOrder.details
															.timeReceived
													}
												</td>
												<td>
													{
														selectedOrder.details
															.adults
													}
												</td>
												<td>
													{
														selectedOrder.details
															.children
													}
												</td>
												<td>
													{
														selectedOrder.details
															.notes
													}
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							)}
						</Modal>
					</Col>
				</Row>
			</ManageOrderContainer>
		</RestaurantLayout>
	);
};

export default ManageOrder;
