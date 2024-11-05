import { Avatar, Button, InputNumber, message, Radio, Steps, Tabs } from "antd";
import { CheckOutlined, StopOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { formatNumberToK } from "../../../../../lib/stringUtils";
import UserService from "../../../../../services/UserService";
import { ModalChooseFoodContainer } from "../../../../Guest/Restaurant/RestaurantDetail/Modal/ChooseFood/styled";
import SpinCustom from "../../../../../components/Common/SpinCustom";

const OrderDetail = ({ setIsDetail, detail }) => {
	const [isEdit, setIsEdit] = useState(false);
	const [menu, setMenu] = useState([]);
	const [loading, setLoading] = useState(false);
	const [selectedFoods, setSelectedFoods] = useState(
		detail?.orderMenus?.map((menu) => ({
			menuId: menu.menuId,
			name: menu.menuName,
			image: menu.menuImage,
			quantity: menu.quantity,
			price: menu.price,
		})) || []
	);

	const getMenu = async () => {
		try {
			setLoading(true);
			const res = await UserService.getMenu(detail?.restaurantId);
			setMenu(res);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		getMenu();
	}, []);

	const handleSelectFood = (food) => {
		setSelectedFoods((prev) => {
			const exists = prev.find((f) => f.menuId === food.menuId);
			if (exists) {
				return prev.filter((f) => f.menuId !== food.menuId);
			} else {
				return [...prev, { ...food, quantity: 1 }];
			}
		});
	};

	const handleQuantityChange = (foodId, quantity) => {
		setSelectedFoods((prev) =>
			prev.map((f) => (f.menuId === foodId ? { ...f, quantity } : f))
		);
	};

	const chooseMenu = menu?.map((m) => {
		return {
			key: m?.categoryMenuId,
			label: <div className="fs-18 fw-500">{m?.categoryMenuName}</div>,
			children: (
				<div>
					<Radio.Group
						block
						optionType="button"
						buttonStyle="solid"
						value={selectedFoods.map((f) => f.menuId)}
						onChange={(e) => handleSelectFood(e.target.value)}
					>
						{m?.menusOfCategoryMenu?.map((f) => (
							<div
								className="d-flex flex-column"
								style={{ flex: 1 }}
								key={f?.menuId}
							>
								<div className="item">
									<Radio
										className={`ml-5 mb-10 ${
											selectedFoods?.find(
												(i) => i?.menuId === f?.menuId
											)
												? "selected"
												: ""
										}`}
										value={f}
										// key={f?.menuId}
										style={{ height: "120px" }}
									>
										<div className="food-detail w-100">
											<div className="food-img">
												<Avatar
													size={110}
													src={
														<img
															src={f?.image}
															alt="food"
														/>
													}
												/>
											</div>
											<div className="w-100">
												<div className="d-flex justify-content-space-between pt-20 mb-10">
													<div className="food-name">
														{" "}
														{f?.dishName}{" "}
													</div>
													<div className="food-price">
														{" "}
														{formatNumberToK(
															f?.price
														)}{" "}
													</div>
												</div>
												<div className="food-des">
													{" "}
													{f?.description}{" "}
												</div>
											</div>
										</div>
									</Radio>
								</div>
								<div className="pl-30">
									{selectedFoods?.some(
										(i) => i?.menuId === f?.menuId
									) ? (
										<div>
											<div>Số lượng</div>
											<InputNumber
												className="d-flex align-items-center"
												min={1}
												value={
													selectedFoods.find(
														(i) =>
															i?.menuId ===
															f?.menuId
													)?.quantity || 1
												}
												onChange={(value) =>
													handleQuantityChange(
														f.menuId,
														value
													)
												}
											/>
										</div>
									) : (
										<></>
									)}
								</div>
							</div>
						))}
					</Radio.Group>
				</div>
			),
		};
	});

	const handleUpdate = async () => {
		if (!detail?.createdAt || detail.completedAt || detail.cancelledAt) {
			message.error("Bạn không thể chỉnh sửa đơn hàng này.", 2);
			return;
		}

		if (selectedFoods.length === 0) {
			message.error("Bạn cần chọn món ăn trước khi cập nhật.", 2);
			return;
		}
		try {
			setLoading(false);
			const updateData = {
				orderId: detail.orderId,
				customerId: detail.customerId,
				restaurantId: detail.restaurantId,
				orderMenus: selectedFoods,
			};
			await UserService.changeMenus(updateData);
			message.success("Cập nhật thành công", 2);
			setIsEdit(false);
		} catch (error) {
			console.error("Failed to update order menus:", error);
		} finally {
			setLoading(false);
		}
	};

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
	const canEdit = detail?.statusOrder === "Pending";
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
					<span className="fs-13">{detail?.phoneReceiver}</span>
				</div>
				<div>
					<span className="fs-14 mr-10">Ngày đặt:</span>
					<span className="fs-13 primary">
						{dayjs(detail?.dateReservation).format("DD-MM-YYYY")}
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
							<th>Ghi chú</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								{" "}
								{dayjs(detail?.dateReservation).format(
									"DD-MM-YYYY"
								)}{" "}
							</td>
							<td>
								{" "}
								{dayjs(
									detail?.timeReservation,
									"HH:mm:ss"
								).format("HH:mm")}{" "}
							</td>
							<td> {detail?.numberPerson} </td>
							<td> {detail?.numberChild} </td>
							<td>
								{detail?.orderTables?.length > 0
									? detail.orderTables
											.map(
												(table) =>
													`${table.tableName} (${table.roomName})`
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
							<td>
								{" "}
								{detail?.contentReservation
									? detail?.contentReservation
									: "Không có"}{" "}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div className="form-order-detail">
				{!isEdit === false ? (
					<Button
						shape="round"
						className="fs-14 fw-500 return-button "
						onClick={() => setIsEdit(false)}
					>
						Đóng
					</Button>
				) : null}

				<div className="mt-20">
					{!isEdit && canEdit ? (
						<div className="update-menu pl-20">
							<Button
								type="primary"
								shape="round"
								onClick={() => setIsEdit(true)}
							>
								Thay đổi món ăn
							</Button>
						</div>
					) : null}

					{isEdit && (
						<ModalChooseFoodContainer>
							<SpinCustom spinning={loading}>
								<div className="menu mb-40">
									{detail?.orderMenus?.length === 0 && (
										<span
											style={{
												color: "red",
												fontWeight: "bold",
												fontSize: "20px",
												display: "flex",
												justifyContent: "center",
												alignItems: "center",
												textAlign: "center",
											}}
										>
											Đơn hàng này bạn chưa chọn món ăn,
											nếu bạn muốn chọn thì hãy chọn ngay
											phía dưới.
										</span>
									)}
									<Tabs
										className="d-flex-center"
										items={chooseMenu}
									/>
								</div>
							</SpinCustom>
							<div
								style={{
									display: "flex",
									justifyContent: "center",
									marginTop: "20px",
								}}
							>
								<Button
									className="update-menu pl-20"
									type="primary"
									onClick={handleUpdate} // Gọi hàm update API của bạn ở đây
								>
									Cập nhật
								</Button>
							</div>
						</ModalChooseFoodContainer>
					)}
				</div>
			</div>
		</div>
	);
};

export default OrderDetail;
