import AdminLayout from "../../../components/Layouts/AdminLayout";
import { OrderManagementContainer } from "./styled";
import React, { useEffect, useState } from "react";
import { Button, Col, Row, Table, Tag, DatePicker, Select, Input } from "antd";
import { FileAddOutlined } from "@ant-design/icons";
import AdminService from "../../../services/AdminService";
import SpinCustom from "../../../components/Common/SpinCustom";
import { formatNumberToK } from "../../../lib/stringUtils";
import dayjs from "dayjs";
import ModalViewDetail from "./Modal";
const { Option } = Select;
const OrderManagement = () => {
	const [loading, setLoading] = useState(false);
	const [orders, setOrders] = useState([]);
	const [statusOrder, setStatusOrder] = useState("");
	const [nameReceiver, setNameReceiver] = useState("");
	const [selectedDate, setSelectedDate] = useState();
	const [openModalDetail, setOpenModalDetail] = useState(false);

	const getAllOrders = async () => {
		try {
			setLoading(true);
			const res = await AdminService.getAllOrder();
			statusOrder
				? nameReceiver
					? selectedDate
						? setOrders(
								res.filter((o) => {
									return (
										o?.statusOrder === statusOrder &&
										o.nameReceiver
											.toLowerCase()
											.includes(
												nameReceiver.toLowerCase()
											) &&
										dayjs(o?.dateReservation).isSame(
											dayjs(selectedDate)
										)
									);
								})
						  )
						: setOrders(
								res.filter((o) => {
									return (
										o?.statusOrder === statusOrder &&
										o.nameReceiver
											.toLowerCase()
											.includes(
												nameReceiver.toLowerCase()
											)
									);
								})
						  )
					: selectedDate
					? setOrders(
							res.filter((o) => {
								return (
									o?.statusOrder === statusOrder &&
									dayjs(o?.dateReservation).isSame(
										dayjs(selectedDate)
									)
								);
							})
					  )
					: setOrders(
							res.filter((o) => o?.statusOrder === statusOrder)
					  )
				: nameReceiver
				? selectedDate
					? setOrders(
							res.filter((o) => {
								return (
									o.nameReceiver
										.toLowerCase()
										.includes(nameReceiver.toLowerCase()) &&
									dayjs(o?.dateReservation).isSame(
										dayjs(selectedDate)
									)
								);
							})
					  )
					: setOrders(
							res.filter((o) => {
								return o.nameReceiver
									.toLowerCase()
									.includes(nameReceiver.toLowerCase());
							})
					  )
				: selectedDate
				? setOrders(
						res.filter((o) => {
							return dayjs(o?.dateReservation).isSame(
								selectedDate
							);
						})
				  )
				: setOrders(res);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getAllOrders();
	}, [statusOrder, nameReceiver, selectedDate]);

	const columns = [
		{
			title: "Tên Người Đặt",
			key: "nameReceiver",
			dataIndex: "nameReceiver",
			align: "center",
			width: 150,
		},
		{
			title: "SĐT Người Đặt",
			dataIndex: "phoneReceiver",
			align: "center",
			key: "phoneReceiver",
		},
		{
			title: "Thời gian nhận bàn",
			align: "center",
			dataIndex: "orderDate",
			key: "orderDate",
			sorter: (a, b) =>
				dayjs(a.dateReservation).unix() -
				dayjs(b.dateReservation).unix(),
			render: (_, record) => (
				<div>
					<div>
						<span className="fw-500"> Ngày: </span>
						<span>
							{dayjs(record?.dateReservation).format(
								"DD-MM-YYYY"
							)}
						</span>
					</div>
					<div>
						<span className="fw-500">Thời gian: </span>
						<span>{record?.timeReservation}</span>
					</div>
				</div>
			),
		},
		{
			title: "Số lượng",
			dataIndex: "number",
			key: "number",
			align: "center",
			render: (_, record) => (
				<div>
					<div>
						<span className="fw-500"> Người lớn: </span>
						<span>{record?.numberPerson}</span>
					</div>
					<div>
						<span className="fw-500">Trẻ em: </span>
						<span>{record?.numberChild}</span>
					</div>
				</div>
			),
		},
		{
			title: "Lời nhắc",
			dataIndex: "contentReservation",
			key: "contentReservation",
			align: "center",
			wdith: 300,
		},
		{
			title: "Tổng tiền",
			dataIndex: "totalAmount",
			align: "center",
			key: "totalAmount",
			render: (value) => (
				<div className="fw-500 fs-16">{formatNumberToK(value)}</div>
			),
		},
		{
			title: "Trạng Thái",
			align: "center",
			dataIndex: "statusOrder",
			key: "",
			render: (value) => {
				let className;
				let status;
				if (value === "Pending") {
					className = "tag-waiting";
					status = "Đang chờ";
				} else if (value === "Confirm") {
					className = "tag-accepted";
					status = "Đã chấp nhận";
				} else if (value === "Paid") {
					className = "tag-received";
					status = "Đã thanh toán";
				} else if (value === "Complete") {
					className = "tag-success";
					status = "Đã hoàn thành";
				} else if (value === "Cancel") {
					className = "tag-cancelled";
					status = "Đã hủy";
				}
				return <Tag className={className}>{status}</Tag>;
			},
		},
		{
			title: "Chi tiết",
			align: "center",
			dataIndex: "update",
			key: "update",
			render: (_, record) => (
				<div className="d-flex justify-content-center align-items-center">
					<Button
						className="mb-5 mr-5"
						type="primary"
						shape="round"
						onClick={() => setOpenModalDetail(record)}
					>
						Chi tiết
					</Button>
				</div>
			),
			width: 100,
		},
	];

	return (
		<AdminLayout>
			<OrderManagementContainer>
				<SpinCustom spinning={loading}>
					<div className="d-flex justify-content-space-between align-items-center">
						<div>
							<h3 className="card-title card-title-dash">
								Đơn Hàng
							</h3>
						</div>
					</div>

					<div>
						<Row
							justify="center"
							gutter={[16, 16]}
							className="search-container"
						>
							<Col span={12} className="input-search">
								<label className="pl-10">Tên người đặt</label>
								<Input
									allowClear
									className="w-100 mt-5 input"
									placeholder="Tên người đặt"
									onChange={(e) =>
										setNameReceiver(e.target.value)
									}
								/>
							</Col>

							<Col span={6} className="picker">
								<label className="pl-10">Ngày/Tháng/Năm</label>
								<DatePicker
									allowClear
									className="mt-5"
									placeholder="----/--/--"
									onChange={(e) => setSelectedDate(e)}
								/>
							</Col>

							<Col className="d-flex flex-column" span={6}>
								<label className="pl-10">
									Trạng thái đơn hàng
								</label>
								<div className="select">
									<Select
										className="nice-select w-100 mt-5"
										allowClear
										placeholder="Trạng thái"
										onChange={(e) => setStatusOrder(e)}
									>
										<Option key={1} value="Pending">
											Đang chờ
										</Option>
										<Option key={2} value="Confirm">
											Đã chấp nhận
										</Option>
										<Option key={3} value="Paid">
											Đã thanh toán
										</Option>
										<Option key={4} value="Complete">
											Đã hoàn thành
										</Option>
										<Option key={5} value="Cancel">
											Đã hủy
										</Option>
									</Select>
								</div>
							</Col>
						</Row>
					</div>

					<div>
						<div className="pl-30">
							{!statusOrder ? (
								<div className="fs-18 fw-500">Danh sách:</div>
							) : (
								<div>
									<span className="fs-18 fw-500">
										{statusOrder === "Pending"
											? "Đang chờ"
											: statusOrder === "Confirm"
											? "Đã chấp nhận"
											: statusOrder === "Paid"
											? "Đã thanh toán"
											: statusOrder === "Complete"
											? "Đã hoàn thành"
											: "Đã hủy"}
										:
									</span>
									<span className="fs-19 fw-500 primary ml-10">
										{orders.length}
									</span>
								</div>
							)}
						</div>
						<div className="mt-30">
							<Table
								columns={columns}
								dataSource={orders}
								pagination={{
									pageSize: 5,
									position: ["bottomCenter"],
								}}
							/>
						</div>
					</div>
				</SpinCustom>

				{!!openModalDetail && (
					<ModalViewDetail
						open={openModalDetail}
						onCancel={() => setOpenModalDetail(false)}
					/>
				)}
			</OrderManagementContainer>
		</AdminLayout>
	);
};

export default OrderManagement;
