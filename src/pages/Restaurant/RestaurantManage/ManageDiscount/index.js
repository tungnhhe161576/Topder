import { Button, Table, Form } from "antd";
import { useEffect, useState } from "react";
import RestaurantLayout from "../../../../components/Layouts/RestaurantLayout";
import { ManagementDiscountContainer } from "./styled";
import CreateDiscountModal from "./ModalCreateDiscount";
import { useSelector } from "react-redux";
import { userInfor } from "../../../../redux/Slice/userSlice";
import UserService from '../../../../services/UserService'
import dayjs from "dayjs";
import SpinCustom from "../../../../components/Common/SpinCustom";
import { formatNumberToK } from "../../../../lib/stringUtils";
import ModalDeleteDiscount from "./Modal/ModalDeleteDiscount";
import ModalUpdateDiscount from "./Modal/ModalUpdateDiscount";

const ManagementDiscount = () => {
	// const [form] = Form.useForm();
	const [loading, setLoading] = useState(false)
	const [openModalDeleteDiscount, setOpenModalDeleteDiscount] = useState(false)
	const [openModalUpdateDiscount, setOpenModalUpdateDiscount] = useState(false)
	// const [isModalOpen, setIsModalOpen] = useState(false);
	// const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
	// const [selectedMenuItems, setSelectedMenuItems] = useState([]);
	// const [applyType, setApplyType] = useState("");
	// const [scope, setScope] = useState("");
	const [discounts, setDiscounts] = useState([])
	const user = useSelector(userInfor)
	console.log(discounts);
	

	const getDiscounts = async () => {
		try {
			setLoading(true)
			const res = await UserService.getDiscountByRestaurant(user?.uid)
			setDiscounts(res)
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false)
		}
	}
	useEffect(() => {
		if(!!user?.uid) {
			getDiscounts();
		}
	}, [])


	const handleActiveOrDisActive = async (record) => {
		try {
			await UserService.updateActiveDiscount({
				id: record?.discountId,
				restaurantId: user?.uid,
				isActive: !record?.isActive
			})
			getDiscounts()
		} catch (error) {
			console.log(error);
		} finally {

		}
	}


	const columns = [
		{
			title: "Mã giảm giá",
			key: "discountName",
			dataIndex: "discountName",
			// width: 150,
			align: 'center'
		},
		{
			title: "Ngày bắt đầu",
			key: "startDate",
			dataIndex: "startDate",
			// width: 150,
			align: 'center',
			render: (value) => (
				<div> {dayjs(value).format('DD-MM-YYYY')} </div>
			)
		},
		{
			title: "Ngày kết thúc",
			key: "endDate",
			dataIndex: "endDate",
			// width: 150,
			align: 'center',
			render: (value) => (
				<div> {dayjs(value).format('DD-MM-YYYY')} </div>
			)
		},
		{
			title: "Đối tượng áp dụng",
			key: "applicableTo",
			dataIndex: "applicableTo",
			// width: 150,
			align: 'center',
			render: (value) => (
				<div>
					{
						value === 'New Customer'
							? 'Cho khách hàng mới'
							: value === 'All Customers'
								? 'Tất cả khách hàng'
								: 'Khách hàng thân thiết'
					}
				</div>
			)
		},
		{
			title: "Loại áp dụng",
			key: "applyType",
			dataIndex: "applyType",
			// width: 150,
			align: 'center',
			render: (_, record) => (
				<div>
					{
						record?.applyType === "Order Value Range"
							? <>
								<div>Cho đơn từ: {formatNumberToK(record?.minOrderValue)} </div>
								<div>đến: {formatNumberToK(record?.maxOrderValue)} </div>
							</>
							: <> Áp dụng cho mọi đơn </>
					}
				</div>
			)
		},
		{
			title: "Phạm vi",
			key: "scope",
			dataIndex: "scope",
			// width: 150,
			align: 'center',
			render: (_, record) => (
				<div>
					{
						record?.scope === "Entire Order"
							? <>
								<div> {record?.discountPercentage}% tổng đơn </div>
							</>
							: <>
								<div> Xem chi tiết menu </div>
							</>
					}
				</div>
			)
		},
		{
			title: "Giá trị",
			key: "quantity",
			dataIndex: "quantity",
			width: 80,
			align: 'center',
		},
		{
			title: "Mô tả",
			key: "description",
			dataIndex: "description",
			// width: 150,
			align: 'center'
		},
		{
			title: "Mô tả",
			key: "isActive",
			dataIndex: "isActive",
			// width: 150,
			align: 'center',
			render: (_, record) => (
				<div>
					{
						!record?.isActive
							? <Button onClick={() => handleActiveOrDisActive(record)}>Kích hoạt</Button>
							: <Button onClick={() => handleActiveOrDisActive(record)}>Hủy kích hoạt</Button>
					}
				</div>
			)
		},
		{
			title: "Mô tả",
			key: "isActive",
			dataIndex: "isActive",
			// width: 150,
			align: 'center',
			render: (_, record) => (
				<div className="d-flex">
					<Button className="ml-10" onClick={() => setOpenModalDeleteDiscount(record)}>Xóa</Button>
					<Button onClick={() => setOpenModalUpdateDiscount(record)}>Chỉnh sửa</Button>
				</div>
			)
		},

	];


	return (
		<RestaurantLayout>
			<ManagementDiscountContainer>
				<Button
					type="primary"
					// onClick={() => setIsModalOpen(true)}
					style={{ marginBottom: 16 }}
				>
					Tạo mã giảm giá
				</Button>

				<SpinCustom spinning={loading}>
					<Table
						columns={columns}
						dataSource={discounts}
						pagination={{
							pageSize: 8,
							position: ["bottomCenter"],
						}}
					/>
				</SpinCustom>

				{!!openModalDeleteDiscount && (
					<ModalDeleteDiscount
						open={openModalDeleteDiscount}
						onCancel={() => setOpenModalDeleteDiscount(false)}
						onOk={getDiscounts}
						userId={user?.uid}
					/>
				)}
				{!!openModalUpdateDiscount && (
					<ModalUpdateDiscount
						open={openModalUpdateDiscount}
						onCancel={() => setOpenModalUpdateDiscount(false)}
						onOk={getDiscounts}
						userId={user?.uid}
					/>
				)}

{/* 
				<CreateDiscountModal
					isModalOpen={isModalOpen}
					setIsModalOpen={setIsModalOpen}
					selectedMenuItems={selectedMenuItems}
					setSelectedMenuItems={setSelectedMenuItems}
					isMenuModalOpen={isMenuModalOpen}
					setIsMenuModalOpen={setIsMenuModalOpen}
					form={form}
					applyType={applyType}
					setApplyType={setApplyType}
					scope={scope}
					setScope={setScope}
				/> */}
			</ManagementDiscountContainer>
		</RestaurantLayout>
	);
};

export default ManagementDiscount;
