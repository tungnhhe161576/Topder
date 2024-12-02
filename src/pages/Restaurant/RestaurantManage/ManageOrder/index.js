import React, { useEffect, useState } from "react";
import {
	Button,
	Col,
	Row,
	Table,
	Tag,
	Select,
	DatePicker,
	Input,
	Form,
} from "antd";
import RestaurantLayout from "../../../../components/Layouts/RestaurantLayout";
import {} from "@ant-design/icons";
import { ManageOrderContainer } from "./styled";
import SpinCustom from "../../../../components/Common/SpinCustom";
import UserService from "../../../../services/UserService";
import { useSelector } from "react-redux";
import { userInfor } from "../../../../redux/Slice/userSlice";
import dayjs from "dayjs";
import { formatNumberToK } from "../../../../lib/stringUtils";
import ModalDetail from "./Modal/ModalDetail";
import ModalUpdateOrder from "./Modal/ModalUpdateOrder";
import { FileAddOutlined } from "@ant-design/icons";
import * as XLSX from "xlsx";
import ModalReport from "./Modal/ModalReport";
const { Option } = Select;

const ManageOrder = () => {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(false);
	const [statusOrder, setStatusOrder] = useState("");
	const [openModalDetail, setOpenModalDetail] = useState(false);
	const [openModalUpdateOrder, setOpenModalUpdateOrder] = useState(false);
	const [openModalReport, setOpenModalReport] = useState(false);
	const [text, setText] = useState("");
	const [status, setStatus] = useState("");
	const user = useSelector(userInfor);
	const [form] = Form.useForm();
	const [selectedMonth, setSelectedMonth] = useState(null);
	const [selectedDate, setSelectedDate] = useState(null);
	const [allOrders, setAllOrders] = useState([]);

	const handleMonthSearch = () => {
		if (selectedMonth) {
			const filteredOrders = allOrders.filter((order) =>
				dayjs(order.dateReservation).isSame(
					dayjs(selectedMonth),
					"month"
				)
			);
			setOrders(filteredOrders);
		} else {
			setOrders(allOrders);
		}
	};

	const handleDateSearch = () => {
		if (selectedDate) {
			const filteredOrders = allOrders.filter((order) =>
				dayjs(order.dateReservation).isSame(dayjs(selectedDate), "day")
			);
			setOrders(filteredOrders);
		} else {
			setOrders(allOrders);
		}
	};
	const handleSearch = async () => {
		try {
			const formValues = await form.validateFields();
			getAllOrders(formValues.title);
		} catch (error) {
			console.log(error);
		}
	};
	const getAllOrders = async (nameReceiver = "") => {
		try {
			setLoading(true);
			const res = await UserService.getAllOrderByRestaurant(user?.uid);
			let filteredOrders = res?.items;

			if (statusOrder) {
				filteredOrders = filteredOrders.filter(
					(o) => o?.statusOrder === statusOrder
				);
			}
			if (nameReceiver) {
				filteredOrders = filteredOrders.filter((o) =>
					o?.nameReceiver
						?.toLowerCase()
						.includes(nameReceiver.toLowerCase())
				);
			}
			setOrders(filteredOrders);
			setAllOrders(filteredOrders);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		if (!!user) {
			getAllOrders();
		}
	}, [user, statusOrder]);

	const exportToExcel = () => {
		const table = document.getElementById("myTable");
		if (!table) {
			console.error("Table element not found");
			return;
		}
		const wb = XLSX.utils.table_to_book(table, { sheet: "SheetJS" });
		const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
		saveAsExcelFile(wbout, "excel.xlsx");
	};

	const saveAsExcelFile = (buffer, fileName) => {
		try {
			const data = new Blob([buffer], {
				type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
			});
			const link = document.createElement("a");
			link.href = URL.createObjectURL(data);
			link.download = fileName;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			URL.revokeObjectURL(link.href);
		} catch (error) {
			console.error("File download failed:", error);
		}
	};

	const columns = [
		{
			title: "Tên Người Đặt",
			key: "nameReceiver",
			dataIndex: "nameReceiver",
			width: 150,
		},
		{
			title: "SĐT Người Đặt",
			dataIndex: "phoneReceiver",
			key: "phoneReceiver",
			render: (value) => (
				<span>
					{" "}
					<a
						href={`tel:${value}`}
						style={{
							color: "inherit",
							textDecoration: "none",
						}}
					>
						{value}
					</a>{" "}
				</span>
			),
		},
		{
			title: "Thời gian nhận bàn",
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
			wdith: 300,
		},
		{
			title: "Tổng tiền",
			dataIndex: "totalAmount",
			key: "totalAmount",
			render: (value) => (
				<div className="fw-500 fs-16">{formatNumberToK(value)}</div>
			),
		},
		{
			title: "Hình thức thanh toán",
			dataIndex: "paidType",
			key: "paidType",
			render: (value, record) => (
				<div>
					{record?.totalAmount === 0 ? (
						"Không cần thanh toán"
					) : (
						<div className="">
							{value === "Deposit"
								? "Thanh toán tiền cọc"
								: value === "Entire Order"
								? "Thanh toán toàn bộ đơn hàng"
								: "Chưa thanh toán"}
						</div>
					)}
				</div>
			),
		},
		{
			title: "Trạng Thái",
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
		{
			title: "",
			dataIndex: "a",
			key: "a",
			render: (_, record) => (
				<div className="d-flex-center">
					{record?.statusOrder === "Pending" && (
						<Button
							className="mr-5"
							onClick={() => {
								setOpenModalUpdateOrder(record);
								setText(
									"Bạn có chắc chắn muốn xác nhận đơn hàng này không ?"
								);
								setStatus("Confirm");
							}}
							shape="round"
							type="primary"
						>
							Xác nhận đơn
						</Button>
					)}

					{(record?.statusOrder === "Confirm" &&
						record?.totalAmount === 0) ||
					(record?.statusOrder === "Paid" &&
						dayjs(
							`${record?.dateReservation} ${record?.timeReservation}`,
							"YYYY-MM-DD HH:mm:ss"
						).isBefore(dayjs())) ? (
						<Button
							onClick={() => {
								setOpenModalUpdateOrder(record);
								setText(
									"Bạn có chắc chắn muốn hoàn thành đơn hàng này không ?"
								);
								setStatus("Complete");
							}}
							shape="round"
							type="primary"
							className="mr-5"
						>
							Hoàn thành đơn
						</Button>
					) : null}
					{record?.statusOrder === "Pending" ||
					record?.statusOrder === "Confirm" ||
					record?.statusOrder === "Paid" ? (
						<Button
							className="huydon mr-5"
							onClick={() => {
								setOpenModalUpdateOrder(record);
								setText(
									`${
										record?.statusOrder !== "Paid"
											? "Bạn có chắc chắn muốn hủy đơn hàng này không ?"
											: "Bạn sẽ mất đi 100% số tiền đơn hàng này và sẽ hoàn về ví của khách hàng!"
									}`
								);
								setStatus("Cancel");
							}}
							shape="round"
						>
							Hủy
						</Button>
					) : null}
					{record?.paidType === "Deposit" &&
					record?.statusOrder === "Paid" &&
					!record?.isReport ? (
						<Button
							onClick={() => setOpenModalReport(record)}
							shape="round"
							type="primary"
							danger
						>
							Báo cáo
						</Button>
					) : null}
				</div>
			),
			// width: 200
		},
	];

	return (
		<RestaurantLayout>
			<ManageOrderContainer>
				<div className="body">
					<SpinCustom spinning={loading}>
						<div className="d-flex justify-content-space-between">
							<div className="d-flex justify-content-space-between align-items-center mb-20">
								<div className="fw-600 fs-22">
									{" "}
									Đơn đặt bàn{" "}
								</div>
							</div>
							<div>
								<Button
									type="primary"
									className="white fs-15"
									onClick={() => exportToExcel()}
								>
									<FileAddOutlined /> Tải về file Excel
									<div style={{ display: "none" }}>
										<table id="myTable">
											<thead>
												<tr>
													<th>Tên Người Đặt</th>
													<th>SĐT</th>
													<th>Thời gian nhận bàn</th>
													<th>Số lượng</th>
													<th>Tổng tiền</th>
													<th>Lời nhắc</th>
													<th>Trạng thái</th>
												</tr>
											</thead>
											<tbody>
												{orders.map((i) => (
													<tr key={i?.orderId}>
														<td>
															{i?.nameReceiver}
														</td>
														<td>
															{i?.phoneReceiver}
														</td>
														<td>
															<span>
																Ngày:{" "}
																{dayjs(
																	i?.dateReservation
																).format(
																	"DD-MM-YYYY"
																)}
															</span>
															<span>
																Giờ:{" "}
																{
																	i?.timeReservation
																}
															</span>
														</td>
														<td>
															<div>
																<span className="fw-500">
																	{" "}
																	Người lớn:{" "}
																</span>
																<span>
																	{
																		i?.numberPerson
																	}
																</span>
															</div>
															<div>
																<span className="fw-500">
																	Trẻ em:{" "}
																</span>
																<span>
																	{
																		i?.numberChild
																	}
																</span>
															</div>
														</td>
														<td>
															{formatNumberToK(
																i?.totalAmount
															)}
														</td>
														<td>
															{
																i?.contentReservation
															}
														</td>
														<td>
															{i?.statusOrder ===
															"Pending"
																? "Đang chờ"
																: i?.statusOrder ===
																  "Confirm"
																? "Đã chấp nhận"
																: i?.statusOrder ===
																  "Paid"
																? "Đã Thanh toán"
																: i?.statusOrder ===
																  "Complete"
																? "Đã hoàn thành"
																: "Đã hủy"}
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								</Button>
							</div>
						</div>
						<div>
							<Row
								justify="space-evenly"
								gutter={[24, 24]}
								className="search-container"
							>
								<Col>
									<div style={{ marginBottom: "8px" }}>
										<label>Tên người đặt</label>
									</div>
									<Form
										form={form}
										className="d-flex align-items-center"
									>
										<Form.Item
											name="title"
											className="mr-10 search-text"
										>
											<Input
												style={{
													marginRight: "8px",
													width: 400,
												}}
												placeholder="Tên Người Đặt"
												allowClear
												className="input-text w-100"
											/>
										</Form.Item>
										<Form.Item>
											<Button
												type="primary"
												htmlType="submit"
												className="btn menu_search"
												onClick={() => handleSearch()}
											>
												TÌm kiếm
											</Button>
										</Form.Item>
									</Form>
								</Col>
								<Col>
									<div style={{ marginBottom: "8px" }}>
										<label>Tháng-Năm</label>
									</div>
									<DatePicker
										format="MM-YYYY"
										picker="month"
										style={{ marginRight: "10px" }}
										placeholder="--/----"
										onChange={(date) =>
											setSelectedMonth(date)
										}
									/>
									<Button
										className="btn"
										type="primary"
										onClick={handleMonthSearch}
									>
										Tìm Kiếm
									</Button>
								</Col>

								<Col>
									<div style={{ marginBottom: "8px" }}>
										<label>Ngày/Tháng/Năm</label>
									</div>
									<DatePicker
										format="DD-MM-YYYY"
										picker="day"
										style={{ marginRight: "10px" }}
										placeholder="mm-dd-yyyy"
										onChange={(date) =>
											setSelectedDate(date)
										}
									/>
									<Button
										className="btn"
										type="primary"
										onClick={handleDateSearch}
									>
										Tìm Kiếm
									</Button>
								</Col>
							</Row>
							<Col className="d-flex-end">
								<div className="select">
									<Select
										className="nice-select w-100"
										allowClear
										placeholder="Trạng thái"
										onChange={(e) => setStatusOrder(e)}
									>
										<Option key={1} value="Pending">
											{" "}
											Đang chờ{" "}
										</Option>
										<Option key={2} value="Confirm">
											{" "}
											Đã chấp nhận{" "}
										</Option>
										<Option key={3} value="Paid">
											{" "}
											Đã thanh toán{" "}
										</Option>
										<Option key={4} value="Complete">
											{" "}
											Đã hoàn thành{" "}
										</Option>
										<Option key={5} value="Cancel">
											{" "}
											Đã hủy{" "}
										</Option>
									</Select>
								</div>
							</Col>
						</div>

						<Row justify="center">
							<Col xs={24} sm={24} md={24} lg={24} xl={24}>
								<div className="pl-30">
									{!statusOrder ? (
										<div className="fs-18 fw-500">
											Danh sách:{" "}
										</div>
									) : (
										<div>
											<span className="fs-18 fw-500">
												{" "}
												{statusOrder === "Pending"
													? "Đang chờ"
													: statusOrder === "Confirm"
													? "Đã chấp nhận"
													: statusOrder === "Paid"
													? "Đã thanh toán"
													: statusOrder === "Complete"
													? "Đã hoàn thành"
													: "Đã hủy"}
												:{" "}
											</span>
											<span className="fs-19 fw-500 primary">
												{" "}
												{orders.length}{" "}
											</span>
										</div>
									)}
								</div>
								<div>
									<Table
										columns={columns}
										dataSource={orders}
										pagination={{
											pageSize: 5,
											position: ["bottomCenter"],
										}}
									/>
								</div>
							</Col>
						</Row>

						{!!openModalDetail && (
							<ModalDetail
								open={openModalDetail}
								onCancel={() => setOpenModalDetail(false)}
								onOk={getAllOrders}
							/>
						)}

						{!!openModalUpdateOrder && (
							<ModalUpdateOrder
								open={openModalUpdateOrder}
								onCancel={() => setOpenModalUpdateOrder(false)}
								onOk={getAllOrders}
								text={text}
								status={status}
								userId={user?.uid}
							/>
						)}
						{!!openModalReport && (
							<ModalReport
								open={openModalReport}
								onCancel={() => setOpenModalReport(false)}
								onOk={getAllOrders}
								userId={user?.uid}
							/>
						)}
					</SpinCustom>
				</div>
			</ManageOrderContainer>
		</RestaurantLayout>
	);
};

export default ManageOrder;
