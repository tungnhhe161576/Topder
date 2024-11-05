import { MangementTableContainer } from "./styled";
import RestaurantLayout from "../../../../components/Layouts/RestaurantLayout";
import { Tabs } from "antd";
import Room from "../ManageTable/Room";
import Table from "../ManageTable/Table";
import CategoryRoom from "../ManageTable/CategoryRoom";
import TableBookingSchedule from "../ManageTable/TableBookingSchedule";

const ManageTable = () => {
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
								children: <Table />,
							},
							{
								label: "Phòng",
								key: "2",
								children: <Room />,
							},
							{
								label: "Kiểu phòng",
								key: "3",
								children: <CategoryRoom />,
							},
							{
								label: "Đặt lịch bận bàn",
								key: "4",
								children: <TableBookingSchedule />,
							},
						]}
					/>
				</div>
			</MangementTableContainer>
		</RestaurantLayout>
	);
};
export default ManageTable;
