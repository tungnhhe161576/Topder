import { Avatar, Button, InputNumber, message, Radio, Tabs } from "antd";
import { ModalChooseFoodContainer } from "../../../../../Guest/Restaurant/RestaurantDetail/Modal/ChooseFood/styled";
import CustomModal from "../../../../../../components/Common/ModalCustom";
import { useEffect, useState } from "react";
import UserService from "../../../../../../services/UserService";
import { formatNumberToK } from "../../../../../../lib/stringUtils";
import SpinCustom from "../../../../../../components/Common/SpinCustom";
import ModalWarning from "../../../../../../components/Modal/ModalWarning";

const ModalUpdateFoods = ({
	open,
	onCancel,
	foods,
	setFoods,
	detail,
	restaurantId,
	getHistoryOrder,
	handleViewDetail,
	customerId,
	orderId,
}) => {
	const [menu, setMenu] = useState([]);
	const [loading, setLoading] = useState(false);
	const [selectedFoods, setSelectedFoods] = useState(foods);
	const [showWarningModal, setShowWarningModal] = useState(false);

	const getMenu = async () => {
		try {
			setLoading(true);
			const res = await UserService.getMenu(restaurantId);
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

	const handleUpdate = async () => {
		try {
			setLoading(false);
			const updateData = {
				orderId: orderId,
				customerId: customerId,
				restaurantId: restaurantId,
				orderMenus: selectedFoods,
			};
			await UserService.changeMenus(updateData);
			message.success("Cập nhật thành công", 2);
			handleViewDetail(detail);
			getHistoryOrder();
			onCancel();
		} catch (error) {
			console.error("Failed to update order menus:", error);
		} finally {
			setLoading(false);
		}
	};

	const items = menu?.map((m) => {
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

	const footer = () => {
		return (
			<div className="d-flex justify-content-center">
				<Button className="mr-10 fw-600" onClick={() => onCancel()}>
					Đóng
				</Button>
				<Button
					className="mr-10 fw-600"
					type="primary"
					onClick={() => {
						setShowWarningModal(true);
						setFoods(selectedFoods);
					}}
					loading={loading}
				>
					Đồng ý
				</Button>
			</div>
		);
	};

	return (
		<div>
			<CustomModal
				open={!!open}
				onCancel={onCancel}
				width={800}
				footer={footer}
				style={{ marginTop: "150px" }}
				loading={loading}
			>
				<ModalChooseFoodContainer>
					<div className="fs-22 fw-600 d-flex justify-content-center">
						Chọn món ăn
					</div>
					<SpinCustom spinning={loading}>
						<div className="menu mb-40">
							<Tabs items={items} />
						</div>
					</SpinCustom>
				</ModalChooseFoodContainer>
			</CustomModal>
			{!!showWarningModal && (
				<ModalWarning
					open={showWarningModal}
					onCancel={() => setShowWarningModal(false)}
					text="Bạn chắc chắn có muốn thay đổi lại món ăn đã chọn hay không? Sẽ ảnh hưởng đến giá tiền và mất đi discount mà bạn đã chọn!!!"
					onConfirm={() => {
						setShowWarningModal(false);
						handleUpdate();
					}}
				/>
			)}
		</div>
	);
};

export default ModalUpdateFoods;
