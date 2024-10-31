import { MangementMenuContainer } from "./styled";
import RestaurantLayout from "../../../../components/Layouts/RestaurantLayout";
import { Tabs } from "antd";
import Menu from "../ManageMenu/Menu";
import CategoryMenu from "../ManageMenu/CategoryMenu";

const ManageMenu = () => {
	return (
		<RestaurantLayout>
			<MangementMenuContainer>
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
								label: "Thực đơn",
								key: "1",
								children: <Menu />,
							},
							{
								label: "Loại thực đơn",
								key: "2",
								children: <CategoryMenu />,
							},
						]}
					/>
				</div>
			</MangementMenuContainer>
		</RestaurantLayout>
	);
};
export default ManageMenu;
