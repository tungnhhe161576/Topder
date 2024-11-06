import React, { useEffect, useState } from "react";
import { Button, Col, Row, Table, Tag, Select, DatePicker, Dropdown } from "antd";
import RestaurantLayout from "../../../../components/Layouts/RestaurantLayout";
import {  } from "@ant-design/icons";
import { ManageOrderContainer } from "./styled";
import SpinCustom from "../../../../components/Common/SpinCustom";
import UserService from '../../../../services/UserService'
import { useSelector } from "react-redux";
import { userInfor } from "../../../../redux/Slice/userSlice";
import dayjs from "dayjs";
import { formatNumberToK } from "../../../../lib/stringUtils";
import ModalDetail from "./Modal/ModalDetail";
import ModalUpdateOrder from "./Modal/ModalUpdateOrder";
const { Option } = Select;

const ManageOrder = () => {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(false);
	const [statusOrder, setStatusOrder] = useState('')
	const [openModalDetail, setOpenModalDetail] = useState(false)
	const [openModalUpdateOrder, setOpenModalUpdateOrder] = useState(false)
	const [text, setText] = useState('')
	const [status, setStatus] = useState('')
	const user = useSelector(userInfor)

	const getAllOrders = async () => {
		try {
			setLoading(true)
			const res = await UserService.getAllOrderByRestaurant(user?.uid)
			statusOrder ?  setOrders(res?.items.filter(o => o?.statusOrder === statusOrder)) : setOrders(res?.items)
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		if (!!user) {
			getAllOrders()
		}
	}, [user, statusOrder])

	const items = (order) => [
		{
			key: '1',
            label: (
				order?.statusOrder === 'Pending'
					? <span 
						className="fs-12" 
						onClick={() => {
							setOpenModalUpdateOrder(order); 
							setText('Bạn có chắc chắn muốn xác nhận đơn hàng này không ?')
							setStatus('Confirm')
						}}> Xác nhận đơn </span>
					: (order?.statusOrder === 'Confirm' && order?.totalAmount === 0) || order?.statusOrder === 'Paid'
						? <span 
							onClick={() => 
								{setOpenModalUpdateOrder(order); 
								setText('Bạn có chắc chắn muốn hoàn thành đơn hàng này không ?')
								setStatus('Complete')
							}}
						>Hoàn thành đơn</span> 
						: <></>
            ),
        },
		{
			key: '2',
			label: (
				<span 
					className="fs-12" 
					onClick={() => {
						setOpenModalUpdateOrder(order); 
						setText(`${order?.statusOrder !== 'Paid' 
							? 'Bạn có chắc chắn muốn hủy đơn hàng này không ?' 
							: 'Bạn sẽ mất đi 100% số tiền đơn hàng này và sẽ hoàn về ví của khách hàng!'
						}`)
						setStatus('Cancel')
					}}
				>
					Hủy
				</span>
			)
		}
    ];


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
		},
		{
			title: "Thời gian nhận bàn",
			dataIndex: "orderDate",
			key: "orderDate",
			sorter: (a, b) => dayjs(a.dateReservation).unix() - dayjs(b.dateReservation).unix(),
			render: (_, record) => (
				<div>
					<div> 
						<span className="fw-500"> Ngày: </span> 
						<span>{dayjs(record?.dateReservation).format('DD-MM-YYYY')}</span>  
					</div>
					<div> 
						<span className="fw-500">Thời gian: </span> 
						<span>{record?.timeReservation}</span> 
					</div>
				</div>
			)
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
			)
		},
		{
			title: "Lời nhắc",
            dataIndex: "contentReservation",
            key: "contentReservation",
			wdith: 300
		},
		{
			title: "Tổng tiền",
            dataIndex: "totalAmount",
            key: "totalAmount",
			render: (value) => (
				<div className="fw-500 fs-16">{formatNumberToK(value)}</div>
			)
		},
		{
			title: "Trạng Thái",
			dataIndex: "statusOrder",
			key: "",
			render: (value) => {
				let className;
				let status;
				if (value === "Pending") {className = "tag-waiting"; status = "Đang chờ"}
				else if (value === "Confirm") {className = "tag-accepted"; status="Đã chấp nhận"}
				else if (value === "Paid") {className = "tag-received"; status="Đã thanh toán"}
				else if (value === "Complete") {className = "tag-success"; status="Đã hoàn thành"}
				else if (value === "Cancel") {className = "tag-cancelled"; status="Đã hủy"}
				return <Tag className={className}>{status}</Tag>;
			},
		},
		{
			title: "Chi tiết",
			dataIndex: "update",
			key: "update",
			render: (_, record) => (
				<>
					<Button className="mb-5" type="primary" shape='round' onClick={() => setOpenModalDetail(record)} >
						Chi tiết
					</Button>
					{
						record?.statusOrder === 'Complete' || record?.statusOrder === 'Cancel'
							? <></>
							: <Button type="primary" shape='round' >
								<Dropdown
									menu={{
										items: items(record),
									}}
									trigger={['click']}
								>
									<span>
										Cập nhật đơn
									</span>
								</Dropdown>
							</Button>
					}
				</>
			),
			width: 100
		},
	];

	return (
		<RestaurantLayout>
			<ManageOrderContainer>
				<div className="body">
					<SpinCustom spinning={loading}>
						<div className="d-flex justify-content-space-between align-items-center mb-20">
							<div className="fw-600 fs-22"> Đơn đặt bàn </div>
						</div>
						<div>
							<Row
								justify="space-evenly"
								gutter={[16, 16]}
								className="search-container"
							>
								<Col>
									<div style={{ marginBottom: "8px" }}>
										<label>Tháng/Năm</label>
									</div>
									<DatePicker
										picker="month"
										style={{ marginRight: "10px" }}
										placeholder="----/--"
									/>
									<Button
										className="btn"
										type="primary"
									>
										Tìm Kiếm
									</Button>
								</Col>
								<Col>
									<div style={{ marginBottom: "8px" }}>
										<label>Ngày/Tháng/Năm</label>
									</div>
									<DatePicker
										style={{ marginRight: "10px" }}
										placeholder="mm/dd/yyyy"
									/>
									<Button
										className="btn"
										type="primary"
									>
										Tìm Kiếm
									</Button>
								</Col>
								<Col>
									<div className="mb-8 fs-16 fw-600 pl-10">
										Trạng thái
									</div>
									<div className="select">
										<Select
											className="nice-select w-100" 
											allowClear  
											placeholder="Trạng thái"
											onChange={(e) => setStatusOrder(e)}
										>
											<Option key={1} value="Pending"> Đang chờ </Option>
											<Option key={2} value="Confirm"> Đã chấp nhận </Option> 
											<Option key={3} value="Paid"> Đã thanh toán </Option>
											<Option key={4} value="Complete"> Đã hoàn thành </Option>
											<Option key={5} value="Cancel"> Đã hủy </Option>
										</Select>
									</div>
								</Col>
							</Row>
						</div>

						<Row justify="center">
							<Col xs={24} sm={24} md={24} lg={24} xl={24}>
								<div className="pl-30">
									{
										!statusOrder 
											? <div className="fs-18 fw-500">Danh sách: </div>
											: <div>
												<span className="fs-18 fw-500"> {
													statusOrder === 'Pending' ? 'Đang chờ'
													: statusOrder === 'Confirm' ? 'Đã chấp nhận'
													: statusOrder === 'Paid' ? 'Đã thanh toán'
													: statusOrder === 'Complete' ? 'Đã hoàn thành'
													: 'Đã hủy'
												}: </span>
												<span className="fs-19 fw-500 primary"> {orders.length} </span>
											</div>
									}
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
					</SpinCustom>
				</div>
			</ManageOrderContainer>
		</RestaurantLayout>
	);
};

export default ManageOrder;
