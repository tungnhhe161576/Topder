import AdminLayout from "../../../components/Layouts/AdminLayout";
import { OrderManagementContainer } from "./styled";
import React, { useState } from "react";
import { Button, Col, Row, Table, Tag, DatePicker } from "antd";
import ModalCustom from "../../../components/Common/ModalCustom";
import { FileAddOutlined } from "@ant-design/icons";
const OrderManagement = () => {
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
			orderDate: "13/07/2024",
			status: "Đã Nhận Bàn",
			history: [
				{ status: "Chờ duyệt", time: "11:30 13/07/2024" },
				{ status: "Chấp Nhận", time: "12:30 13/07/2024" },
				{ status: "Đã Nhận Bàn", time: "14:00 13/07/2024" },
			],
			details: {
				dateReceived: "13/07/2024",
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
			status: "Hoàn Thành",
			history: [
				{ status: "Chờ duyệt", time: "08:00 15/06/2024" },
				{ status: "Chấp Nhận", time: "09:00 15/06/2024" },
				{ status: "Đã Nhận Bàn", time: "10:00 15/06/2024" },
				{ status: "Hoàn Thành", time: "12:00 15/06/2024" },
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
			status: "Hoàn Thành",
			history: [
				{ status: "Chờ duyệt", time: "08:00 17/06/2024" },
				{ status: "Chấp Nhận", time: "09:00 17/06/2024" },
				{ status: "Đã Nhận Bàn", time: "10:30 17/06/2024" },
				{ status: "Hoàn Thành", time: "12:00 17/06/2024" },
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
	const [filteredData, setFilteredData] = useState(initialData);
	//const [selectedStatuses, setSelectedStatuses] = useState({});
	const [selectedStatus, setSelectedStatus] = useState(null);

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

	// const updateStatus = (key, newStatus) => {
	// 	const newData = data.map((item) => {
	// 		if (item.key === key) {
	// 			return { ...item, status: newStatus };
	// 		}
	// 		return item;
	// 	});
	// 	setData(newData);
	// 	setFilteredData(newData);
	// };

	// Cột cho bảng
	const columns = [
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
		// {
		// 	title: "Lịch Sử Trạng Thái",
		// 	dataIndex: "history",
		// 	key: "history",
		// 	render: (history) => (
		// 		<Space direction="vertical">
		// 			{history.map((item, index) => (
		// 				<Tag
		// 					key={index}
		// 					className={
		// 						item.status === "Chấp Nhận"
		// 							? "tag-accepted"
		// 							: item.status === "Đã Nhận Bàn"
		// 							? "tag-received"
		// 							: item.status === "Thành Công"
		// 							? "tag-success"
		// 							: item.status === "Hủy"
		// 							? "tag-cancelled"
		// 							: "tag-default"
		// 					}
		// 				>
		// 					{item.status}: {item.time}
		// 				</Tag>
		// 			))}
		// 		</Space>
		// 	),
		// },
		{
			title: "Trạng Thái",
			dataIndex: "status",
			key: "status",
			render: (status) => {
				let className;
				if (status === "Chờ Duyệt") className = "tag-waiting";
				else if (status === "Chấp Nhận") className = "tag-accepted";
				else if (status === "Đã Nhận Bàn") className = "tag-received";
				else if (status === "Hoàn Thành") className = "tag-success";
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
		// {
		// 	title: "Cập Nhật Trạng Thái",
		// 	key: "updateStatus",
		// 	render: (_, record) => {
		// 		const handleSelectChange = (value) => {
		// 			setSelectedStatuses((prev) => ({
		// 				...prev,
		// 				[record.key]: value, // Cập nhật trạng thái đã chọn cho từng đơn hàng
		// 			}));
		// 		};

		// 		return (
		// 			<span>
		// 				<Select
		// 					style={{ marginRight: 10, width: 150 }}
		// 					value={
		// 						selectedStatuses[record.key] || record.status
		// 					} // Lấy giá trị từ selectedStatuses
		// 					onChange={handleSelectChange}
		// 				>
		// 					{renderOptions(record.status)}
		// 				</Select>
		// 				<Button
		// 					className="btn"
		// 					type="primary"
		// 					onClick={() =>
		// 						updateStatus(
		// 							record.key,
		// 							selectedStatuses[record.key] ||
		// 								record.status
		// 						)
		// 					}
		// 				>
		// 					Cập Nhật
		// 				</Button>
		// 			</span>
		// 		);
		// 	},
		// },
	];

	// const renderOptions = (status) => {
	// 	switch (status) {
	// 		case "Chờ Duyệt":
	// 			return (
	// 				<>
	// 					<Select.Option value="Hủy">Hủy</Select.Option>
	// 					<Select.Option value="Chấp Nhận">
	// 						Chấp Nhận
	// 					</Select.Option>
	// 				</>
	// 			);
	// 		case "Chấp Nhận":
	// 			return (
	// 				<>
	// 					<Select.Option value="Hủy">Hủy</Select.Option>
	// 					<Select.Option value="Đã Nhận Bàn">
	// 						Đã Nhận Bàn
	// 					</Select.Option>
	// 					<Select.Option value="Chờ Duyệt">
	// 						Chờ Duyệt
	// 					</Select.Option>
	// 				</>
	// 			);
	// 		case "Đã Nhận Bàn":
	// 			return (
	// 				<>
	// 					<Select.Option value="Hủy">Hủy</Select.Option>
	// 					<Select.Option value="Hoàn Thành">
	// 						Thành Công
	// 					</Select.Option>
	// 				</>
	// 			);
	// 		default:
	// 			return null; // Trạng thái Hủy hoặc Thành Công sẽ không có tùy chọn
	// 	}
	// };
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
	const onSearchByStatus = (status) => {
		if (selectedStatus === status) {
			setFilteredData(data);
			setSelectedStatus(null);
		} else {
			const newFilteredData = data.filter(
				(item) => item.status === status
			);
			setFilteredData(newFilteredData);
			setSelectedStatus(status);
		}
	};

	return (
		<AdminLayout>
			<OrderManagementContainer>
				<div className="body">
					<div className="d-flex justify-content-space-between align-items-center">
						<div>
							<h3 className="card-title card-title-dash">
								Đơn Hàng
							</h3>
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
								<Button
									className="btn"
									type="primary"
									onClick={() => onSearchByMonth()}
								>
									Tìm Kiếm
								</Button>
							</Col>
							<Col>
								<label>Ngày/Tháng/Năm</label>
								<DatePicker
									style={{ marginRight: "10px" }}
									placeholder="mm/dd/yyyy"
								/>
								<Button
									className="btn"
									type="primary"
									onClick={() => onSearchByDate()}
								>
									Tìm Kiếm
								</Button>
							</Col>
						</Row>
					</div>

					<Row justify="center">
						<Col xs={24} sm={24} md={24} lg={24} xl={24}>
							<div className="status-bar">
								<div
									className="status-item tag-waiting"
									onClick={() =>
										onSearchByStatus("Chờ Duyệt")
									}
								>
									Chờ Duyệt: 7
								</div>
								<div
									className="status-item tag-accepted"
									onClick={() =>
										onSearchByStatus("Chấp Nhận")
									}
								>
									Chấp Nhận: 1
								</div>
								<div
									className="status-item tag-received"
									onClick={() =>
										onSearchByStatus("Đã Nhận Bàn")
									}
								>
									Đã Nhận Bàn: 1
								</div>
								<div
									className="status-item tag-success"
									onClick={() =>
										onSearchByStatus("Hoàn Thành")
									}
								>
									Hoàn Thành: 1
								</div>
								<div
									className="status-item tag-cancelled"
									onClick={() => onSearchByStatus("Hủy")}
								>
									Hủy: 0
								</div>
							</div>

							<Table
								columns={columns}
								dataSource={filteredData}
								pagination={{
									pageSize: 4,
									position: ["bottomCenter"],
								}}
							/>

							<ModalCustom
								title="Chi Tiết Đơn Hàng"
								visible={isModalVisible}
								onOk={handleOk}
								onCancel={handleCancel}
								footer={null}
								width={1000}
								style={{ textAlign: "center" }}
							>
								{selectedOrder && (
									<div className="order-detail">
										<table className="w-100">
											<thead>
												<tr>
													<th>
														Ngày/Tháng/Năm Nhận Bàn
													</th>
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
															selectedOrder
																.details
																.dateReceived
														}
													</td>
													<td>
														{
															selectedOrder
																.details
																.timeReceived
														}
													</td>
													<td>
														{
															selectedOrder
																.details.adults
														}
													</td>
													<td>
														{
															selectedOrder
																.details
																.children
														}
													</td>
													<td>
														{
															selectedOrder
																.details.notes
														}
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								)}
							</ModalCustom>
						</Col>
					</Row>
				</div>
			</OrderManagementContainer>
		</AdminLayout>
	);
};

export default OrderManagement;
