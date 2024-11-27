import { MangementTableContainer } from "./styled";
import RestaurantLayout from "../../../../components/Layouts/RestaurantLayout";
import { Tabs } from "antd";
import TableBookingSchedule from "../ManageTable/TableBookingSchedule";
import { useSelector } from "react-redux";
import { userInfor } from "../../../../redux/Slice/userSlice";
import AllTable from "../ManageTable/Table";
import RestaurantRoom from "./Room";
import UserService from "../../../../services/UserService";
import { useEffect, useState } from "react";

const ManageTable = () => {
	const user = useSelector(userInfor)
	const [loading, setLoading] = useState(false)
	const [tables, setTables] = useState([])
	const [type, setType] = useState()
	const [status, setStatus] = useState(true)
	

	const getAllTables = async () => {
		try {
			setLoading(true)
			const res = await UserService.getAllRestaurantTable(user?.uid)

			if (type) {
				type === 'free' 
					? status !== undefined
						? setTables(res.items.filter(i => {return(i?.roomId === null && i?.isBookingEnabled === status)}))
						: setTables(res.items.filter(i => {return(i?.roomId === null)}))
					: status !== undefined
						? setTables(res.items.filter(i => {return(i?.roomId !== null && i?.isBookingEnabled === status)}))
						: setTables(res.items.filter(i => {return(i?.roomId !== null)}))
			} else {
				status !== undefined
					? setTables(res.items.filter(i => {return(i?.isBookingEnabled === status)}))
					: setTables(res.items)
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false)
		}
	}
	useEffect(() => {
		if (!!user?.uid) {
			getAllTables()
		}
	}, [user, type, status])
	
	return (
		<RestaurantLayout>
			<MangementTableContainer>
				<div className="body">
					<div className="title">
						<h3 className="card-title card-title-dash">
							Quản lý nhà hàng
						</h3>
					</div>
					<Tabs
						type="card"
						items={[
							{
								label: "Bàn",
								key: "1",
								children: <AllTable user={user} getAllTables={getAllTables} loading={loading} setLoading={setLoading} tables={tables} setType={setType} setStatus={setStatus}/>,
							},
							{
								label: "Phòng",
								key: "2",
								children: <RestaurantRoom user={user} getAllTables={getAllTables}/>,
							},
							{
								label: "Đặt lịch bận bàn",
								key: "3",
								children: <TableBookingSchedule user={user}/>,
							},
						]}
					/>
				</div>
			</MangementTableContainer>
		</RestaurantLayout>
	);
};
export default ManageTable;
