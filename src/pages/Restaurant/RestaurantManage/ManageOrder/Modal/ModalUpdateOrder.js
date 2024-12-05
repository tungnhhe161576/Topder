import { useEffect, useState } from "react";
import CustomModal from "../../../../../components/Common/ModalCustom";
import { Button, Col, Form, Input, message, Radio, Row, Tabs } from "antd";
import UserService from "../../../../../services/UserService";
import table1 from "../../../../../assets/images/table1.jpg";
import table2 from "../../../../../assets/images/table2.jpg";
import dayjs from "dayjs";
import { ModalUpdateOrderContainer } from "./styled";
import SpinCustom from "../../../../../components/Common/SpinCustom";

const ModalUpdateOrder = ({ open, onCancel, onOk, text, status, userId }) => {
	const [loading, setLoading] = useState(false);
	const [tableTudo, setTableTodu] = useState([]);
	const [tablePhong, setTablePhong] = useState([]);
	const [selectedTable, setSelectedTable] = useState([]);
	const [form] = Form.useForm();

	const dateChooseTable = dayjs(open?.dateReservation).format("YYYY-MM-DD");
	const timeChooseTable = dayjs(open?.timeReservation, "HH:mm:ss").format(
		"HH:mm"
	);

	console.log(selectedTable);

	const getTable = async () => {
		try {
			setLoading(true);
			const res = await UserService.getTable(
				userId,
				timeChooseTable,
				dateChooseTable
			);
			const room1 = res?.filter((item) => item?.roomId !== null);
			const room2 = res?.filter((item) => item?.roomId === null);
			setTableTodu(room2);
			setTablePhong(room1);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		getTable();
	}, []);

	const handleUpdate = async () => {
		try {
			setLoading(true);
			const value = await form.validateFields();
			if (
				open?.statusOrder === "Pending" &&
				status === "Confirm" &&
				open?.isTableBooking === false
			) {
				const table = selectedTable.map((t) => t.tableId);
				await UserService.createTableOrder({
					orderId: open?.orderId,
					tableIds: table,
				});
			}

			status === "Confirm" || status === "Complete"
				? await UserService.updateOrderForConfirm(open?.orderId, status)
				: await UserService.cancelOrder({
						orderId: open?.orderId,
						userId: userId,
						cancelReason: value?.reason,
				  });
			message.open({
				content: "Cập nhật trạng thái thành công!",
				type: "success",
				style: {
					marginTop: "10vh",
				},
			});
			onOk();
			onCancel();
		} catch (error) {
			console.log(error);
			// message.open({
			//     content: 'Cập nhật trạng thái không thành công!',
			//     type: 'error',
			//     style: {
			//         marginTop: '10vh',
			//     },
			// })
		} finally {
			setLoading(false);
		}
	};

	const items = [
		{
			key: "1",
			label: "Bàn trong phòng",
			children: (
				<div>
					<Radio.Group
						block
						optionType="button"
						value={selectedTable.map((t) => t.tableId)}
						onChange={(e) => handleSelectTable(e.target.value)}
					>
						<Row gutter={[16, 16]} className="w-100">
							{tablePhong?.map((t, index) => (
								<Col span={12} key={index} className="w-100">
									<Radio
										className={`w-100 ${
											selectedTable?.find(
												(i) => i?.tableId === t?.tableId
											)
												? "selected"
												: ""
										}`}
										style={{ height: "200px" }}
										value={t}
									>
										<div className="table-item">
											<div className="table-image">
												{selectedTable?.find(
													(i) =>
														i?.tableId ===
														t?.tableId
												) ? (
													<img
														src={table2}
														alt="table2"
													/>
												) : (
													<img
														src={table1}
														alt="table1"
													/>
												)}
											</div>
											<div className="des">
												<div className="fs-18 fw-500">
													{" "}
													Tên phòng: {
														t?.roomName
													}{" "}
												</div>
												<div className="fs-16 fw-500">
													{" "}
													Tên bàn: {t?.tableName}{" "}
												</div>
												<div className="quantity">
													{" "}
													Sức chứa: {
														t?.maxCapacity
													}{" "}
													người
												</div>
												<div className="description">
													{" "}
													{t?.description}{" "}
												</div>
											</div>
										</div>
									</Radio>
								</Col>
							))}
						</Row>
					</Radio.Group>
				</div>
			),
		},
		{
			key: "2",
			label: "Bàn tự do",
			children: (
				<div>
					<Radio.Group
						block
						optionType="button"
						value={selectedTable.map((t) => t.tableId)}
						onChange={(e) => handleSelectTable(e.target.value)}
					>
						<Row gutter={[16, 16]} className="w-100">
							{tableTudo?.map((t) => (
								<Col
									span={12}
									key={t?.tableId}
									className="w-100"
								>
									<Radio
										className={`w-100 ${
											selectedTable?.find(
												(i) => i?.tableId === t?.tableId
											)
												? "selected"
												: ""
										}`}
										style={{ height: "200px" }}
										value={t}
									>
										<div className="table-item">
											<div className="table-image">
												{selectedTable?.find(
													(i) =>
														i?.tableId ===
														t?.tableId
												) ? (
													<img
														src={table2}
														alt="table2"
													/>
												) : (
													<img
														src={table1}
														alt="table1"
													/>
												)}
											</div>
											<div className="des">
												<div className="name">
													{" "}
													Tên bàn: {t?.tableName}{" "}
												</div>
												<div className="quantity">
													{" "}
													Sức chứa: {
														t?.maxCapacity
													}{" "}
													người
												</div>
												<div className="description">
													{" "}
													{t?.description}{" "}
												</div>
											</div>
										</div>
									</Radio>
								</Col>
							))}
						</Row>
					</Radio.Group>
				</div>
			),
		},
	];

	const handleSelectTable = (table) => {
		setSelectedTable((prev) => {
			const exists = prev.find((f) => f.tableId === table.tableId);
			if (exists) {
				return prev.filter((f) => f.tableId !== table.tableId);
			} else {
				return [...prev, { ...table }];
			}
		});
	};

	const footer = () => {
		return (
			<div className="d-flex justify-content-center">
				<Button
					className="mr-10 fw-600"
					shape="round"
					onClick={() => onCancel()}
				>
					Đóng
				</Button>
				<Button
					className="mr-10 fw-600"
					type="primary"
					shape="round"
					onClick={() => handleUpdate()}
					loading={loading}
				>
					Đồng ý
				</Button>
			</div>
		);
	};

	return (
		<div className="mt-50">
			<CustomModal
				open={!!open}
				onCancel={onCancel}
				footer={footer}
				width={1000}
				// className="mt-100"
				style={{marginTop: '-50px'}}
			>
				<div>
					<div className=" d-flex-center mb-30 fs-16 fw-500">
						{text}
					</div>
					{status === "Cancel" ? (
						<div className="mt-20">
							<Form form={form}>
								<Form.Item name="reason">
									<Input.TextArea
										rows={4}
										placeholder="Nhập lý do hủy đơn"
									/>
								</Form.Item>
							</Form>
						</div>
					) : (
						<></>
					)}
					{open?.statusOrder === "Pending" &&
					status === "Confirm" &&
					open?.isTableBooking === false ? (
						<ModalUpdateOrderContainer>
							<div className="fs-22 fw-600 d-flex justify-content-center">
								Chọn bàn
							</div>
							<SpinCustom spinning={loading}>
								<Form form={form}>
									<Form.Item
										name="table"
										rules={[
											// {
											//     required: true,
											//     message: "Vui lòng chọn bàn",
											// },
											({ getFieldValue }) => ({
												validator: (_, value) =>
													selectedTable.length === 0
														? Promise.reject(
																"Vui lòng chọn bàn!"
														  )
														: Promise.resolve(),
											}),
										]}
									>
										<div
											className="menu mb-40"
											style={{
												maxHeight: "500px",
												overflow: "scroll",
											}}
										>
											<Tabs
												defaultActiveKey="1"
												items={items}
											/>
										</div>
									</Form.Item>
								</Form>
							</SpinCustom>
						</ModalUpdateOrderContainer>
					) : (
						<></>
					)}
				</div>
			</CustomModal>
		</div>
	);
};

export default ModalUpdateOrder;
