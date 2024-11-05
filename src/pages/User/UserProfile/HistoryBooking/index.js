import { message, Tabs } from "antd";
import ProfileUserLayout from "../../../../components/Layouts/ProfileUserLayout";
import { HistoryContainer } from "./styled";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userInfor } from "../../../../redux/Slice/userSlice";
import UserService from "../../../../services/UserService";
import Pending from "./OrderStatus/Pending";
import Confirm from "./OrderStatus/Confirm";
import Complete from "./OrderStatus/Complete";
import Cancel from "./OrderStatus/Cancel";
import Paid from "./OrderStatus/Paid";

const HistoryBooking = () => {
	const [loading, setLoading] = useState(false);
	const [orderHistory, setOrderHistory] = useState([]);
	const [orderDetail, setOrderDetail] = useState();
	const [isDetail, setIsDetail] = useState(false);
	const user = useSelector(userInfor);

	const getHistoryOrder = async () => {
		try {
			setLoading(true);
			const res = await UserService.getOrderHistory(user?.uid);
			setOrderHistory(res?.items);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		if (user?.uid) {
			getHistoryOrder();
		}
	}, [user]);

	const handleViewDetail = async (order) => {
		try {
			const res = await UserService.getOrderDetail(
				user?.uid,
				order?.orderId
			);
			setOrderDetail(res);
			setIsDetail(true);
		} catch (error) {
			message.open({
				content: "Lấy thông tin thất bại",
				type: "error",
				style: {
					marginTop: "10vh",
				},
			});
		}
	};
	const items = [
		{
			key: "1",
			label: <span className="fw-500 fs-18"> Đang chờ </span>,
			children: (
				<Pending
					getHistoryOrder={getHistoryOrder}
					orderHistory={orderHistory}
					loading={loading}
					orderDetail={orderDetail}
					isDetail={isDetail}
					setIsDetail={setIsDetail}
					handleViewDetail={handleViewDetail}
				/>
			),
		},
		{
			key: "2",
			label: <span className="fw-500 fs-18"> Đã chấp nhận </span>,
			children: (
				<Confirm
					getHistoryOrder={getHistoryOrder}
					orderHistory={orderHistory}
					loading={loading}
					orderDetail={orderDetail}
					isDetail={isDetail}
					setIsDetail={setIsDetail}
					handleViewDetail={handleViewDetail}
				/>
			),
		},
		{
			key: "3",
			label: <span className="fw-500 fs-18"> Đã thanh toán </span>,
			children: (
				<Paid
					getHistoryOrder={getHistoryOrder}
					orderHistory={orderHistory}
					loading={loading}
					orderDetail={orderDetail}
					isDetail={isDetail}
					setIsDetail={setIsDetail}
					handleViewDetail={handleViewDetail}
				/>
			),
		},
		{
			key: "4",
			label: <span className="fw-500 fs-18"> Hoàn thành </span>,
			children: (
				<Complete
					orderHistory={orderHistory}
					loading={loading}
					orderDetail={orderDetail}
					isDetail={isDetail}
					setIsDetail={setIsDetail}
					handleViewDetail={handleViewDetail}
				/>
			),
		},
		{
			key: "5",
			label: <span className="fw-500 fs-18"> Đã hủy </span>,
			children: (
				<Cancel
					orderHistory={orderHistory}
					loading={loading}
					orderDetail={orderDetail}
					isDetail={isDetail}
					setIsDetail={setIsDetail}
					handleViewDetail={handleViewDetail}
				/>
			),
		},
	];

	return (
		<ProfileUserLayout>
			<HistoryContainer>
				<Tabs defaultActiveKey="1" items={items} />
			</HistoryContainer>
		</ProfileUserLayout>
	);
};

export default HistoryBooking;
