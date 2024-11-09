import { Button, Table, Form, Select } from "antd";
import { useEffect, useState } from "react";
import RestaurantLayout from "../../../../components/Layouts/RestaurantLayout";
import { ManagementDiscountContainer } from "./styled";
import { useSelector } from "react-redux";
import { userInfor } from "../../../../redux/Slice/userSlice";
import UserService from '../../../../services/UserService'
import dayjs from "dayjs";
import SpinCustom from "../../../../components/Common/SpinCustom";
import { formatNumberToK } from "../../../../lib/stringUtils";
import ModalDeleteDiscount from "./Modal/ModalDeleteDiscount";
import ModalUpdateDiscount from "./Modal/ModalUpdateDiscount";
import ModalDetailMenu from "./Modal/ModalDetailMenu";
import ModalCreateDiscount from "./ModalCreateDiscount";
const { Option } = Select;

const ManagementDiscount = () => {
	const [loading, setLoading] = useState(false)
	const [openModalDeleteDiscount, setOpenModalDeleteDiscount] = useState(false)
	const [openModalUpdateDiscount, setOpenModalUpdateDiscount] = useState(false)
	const [openModalCreateDiscount, setOpenModalCreateDiscount] = useState(false)
	const [openModalViewDetailMenu, setOpenModalViewDetailMenu] = useState(false)
	const [active, setActive] = useState()
	const [applyType, setApplyType] = useState()
	const [applicableTo, setApplicableTo] = useState()
	const [discounts, setDiscounts] = useState([])
	const user = useSelector(userInfor)

	console.log(user);
	

	const getDiscounts = async () => {
		try {
			setLoading(true)
			const res = await UserService.getDiscountByRestaurant(user?.uid)
			applyType 
				? applicableTo 
					? active !== undefined
						? setDiscounts(res.filter((i) => {return i.isActive === active && i.applicableTo === applicableTo && i.applyType === applyType}))
						: setDiscounts(res.filter((i) => {return i.applicableTo === applicableTo && i.applyType === applyType}))
					: active !== undefined
						? setDiscounts(res.filter((i) => {return !!i.isActive === active && i.applyType === applyType}))
						: setDiscounts(res.filter((i) => {return i.applyType === applyType}))
				: applicableTo 
					? active !== undefined
						? setDiscounts(res.filter((i) => {return i.isActive === active && i.applicableTo === applicableTo}))
						: setDiscounts(res.filter((i) => {return i.applicableTo === applicableTo}))
					: active !== undefined
						? setDiscounts(res.filter((i) => {return !!i.isActive === active}))
						: setDiscounts(res)
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false)
		}
	}
	useEffect(() => {
		if(!!user) {
			getDiscounts();
		}
	}, [active, applicableTo, applyType, user])


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
			width: 120,
			align: 'center',
			sorter: (a, b) => dayjs(a.startDate).unix() - dayjs(b.startDate).unix(),
			render: (value) => (
				<div> {dayjs(value).format('DD-MM-YYYY')} </div>
			)
		},
		{
			title: "Ngày kết thúc",
			key: "endDate",
			dataIndex: "endDate",
			width: 120,
			align: 'center',
			sorter: (a, b) => dayjs(a.endDate).unix() - dayjs(b.endDate).unix(),
			render: (value) => (
				<div> {dayjs(value).format('DD-MM-YYYY')} </div>
			)
		},
		{
			title: "Đối tượng áp dụng",
			key: "applicableTo",
			dataIndex: "applicableTo",
			width: 120,
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
			width: 100,
			align: 'center',
			render: (_, record) => (
				<div>
					{
						record?.scope === "Entire Order"
							? <>
								<div> {record?.discountPercentage}% tổng đơn </div>
							</>
							: <>
								<Button className="button-detail" shape="round" onClick={() => setOpenModalViewDetailMenu(record)}> Chi tiết </Button>
							</>
					}
				</div>
			)
		},
		{
			title: "Số lượng",
			key: "quantity",
			dataIndex: "quantity",
			width: 80,
			align: 'center',
			sorter: (a, b) => a.quantity - b.quantity,
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
			align: 'center',
			render: (_, record) => (
				<div>
					{
						!record?.isActive
							? <Button className="button-active" onClick={() => handleActiveOrDisActive(record)}>Kích hoạt</Button>
							: <Button className="button-active" onClick={() => handleActiveOrDisActive(record)}>Hủy kích hoạt</Button>
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
					<Button className="mr-5 delete-button" shape="round" onClick={() => setOpenModalDeleteDiscount(record)}>Xóa</Button>
					<Button className="update-button" shape="round" onClick={() => setOpenModalUpdateDiscount(record)}>Chỉnh sửa</Button>
				</div>
			)
		},

	];


	return (
		<RestaurantLayout>
			<ManagementDiscountContainer>
				<div className="d-flex justify-content-space-between mt-20">
					<div>
						<Button
							type="primary"
							onClick={() => setOpenModalCreateDiscount(true)}
							style={{ marginBottom: 16 }}
						>
							Tạo mã giảm giá
						</Button>
					</div>
					<div className="d-flex">
						<div className="mr-10 select">
							<Select 
								className="nice-select w-100" 
								allowClear  
								placeholder="Loại áp dụng"
								onChange={(e) => setApplyType(e)}
								>
								<Option key={1} value="All Orders">
									Tất cả đơn hàng
								</Option>
								<Option key={2} value="Order Value Range">
									Có khoảng giá
								</Option>
							</Select>
						</div>
						<div className="select mr-10"> 
							<Select 
								className="nice-select w-100" 
								allowClear  
								placeholder="Đối tượng áp dụng"
								onChange={(e) => setApplicableTo(e)}
							>
								<Option key={1} value="New Customer">
									Khách hàng mới
								</Option>
								<Option key={2} value="All Customers">
									Tất cả khách hàng
								</Option>
								<Option key={3} value="Loyal Customer">
									Khách hàng thân thiết
								</Option>
							</Select>
						</div>
						<div className="select pr-40 "> 
							<Select 
								className="nice-select w-100" 
								allowClear  
								placeholder="Trạng thái"
								onChange={(e) => setActive(e)}
							>
								<Option key={1} value={true}>
									Đã kích hoạt
								</Option>
								<Option key={2} value={false}>
									Chưa kích hoạt
								</Option>
							</Select>
						</div>
					</div>
				</div>

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
				{!!openModalCreateDiscount && (
					<ModalCreateDiscount
						open={openModalCreateDiscount}
						onCancel={() => setOpenModalCreateDiscount(false)}
						onOk={getDiscounts}
						userId={user?.uid}
					/>
				)}
				{!!openModalViewDetailMenu && (
					<ModalDetailMenu
						open={openModalViewDetailMenu}
						onCancel={() => setOpenModalViewDetailMenu(false)}
					/>
				)}
			</ManagementDiscountContainer>
		</RestaurantLayout>
	);
};

export default ManagementDiscount;
