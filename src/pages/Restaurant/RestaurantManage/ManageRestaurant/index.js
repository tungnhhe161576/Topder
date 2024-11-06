import { Tabs } from "antd";
import RestaurantLayout from "../../../../components/Layouts/RestaurantLayout";
import { ManageRestaurantContainer } from "./styled";
import ManageDescription from "../ManageRestaurant/ManageDes";
import ManageImages from "../ManageRestaurant/ManageImg";
import ManageInformation from "../ManageRestaurant/ManageInfor";
import ChangePassword from "../ManageRestaurant/ChangePassword";
import ManagePolicy from "../ManageRestaurant/MangePolicy";
import { useSelector } from "react-redux";
import { userInfor } from "../../../../redux/Slice/userSlice";
const ManageRestaurant = () => {
	const user = useSelector(userInfor)

	return (
		<RestaurantLayout>
			<ManageRestaurantContainer>
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
								label: "Thông tin",
								key: "1",
								children: <ManageInformation user={user}/>,
							},
							{
								label: "Mô tả | Chi tiết",
								key: "2",
								children: <ManageDescription />,
							},
							{
								label: "Ảnh",
								key: "3",
								children: <ManageImages />,
							},
							{
								label: "Quản lý chính sách nhà hàng",
								key: "5",
								children: <ManagePolicy />,
							},
							{
								label: "Đổi mật khẩu",
								key: "4",
								children: <ChangePassword />,
							},
						]}
					/>
				</div>
			</ManageRestaurantContainer>
		</RestaurantLayout>
	);
};

export default ManageRestaurant;
