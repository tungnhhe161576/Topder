import { MangementMenuContainer } from "./styled";
import RestaurantLayout from "../../../../components/Layouts/RestaurantLayout";
import { Tabs } from "antd";
import CategoryMenu from "../ManageMenu/CategoryMenu";
import { useSelector } from "react-redux";
import { userInfor } from "../../../../redux/Slice/userSlice";
import { useEffect, useState } from "react";
import UserService from "../../../../services/UserService";
import RestaurantMenu from "../ManageMenu/Menu";

const ManageMenu = () => {
	const user = useSelector(userInfor)
	const [menus, setMenus] = useState([])
	const [loading, setLoading] = useState(false)
	const [status, setStatus] = useState('Active')
	
	const getMenus = async () => {
		try {
			setLoading(true)
			const res = await UserService.getAllMenu(user?.uid)
			status
			 	? setMenus(res.items.filter(i => i?.status === status))
				: setMenus(res.items)
		} catch (error) {
            console.log(error)
		}finally {
			setLoading(false)
		}
	}

	useEffect(() => {
        if (!!user) {
            getMenus()
        }
    }, [user, status])

	return (
		<RestaurantLayout>
			<MangementMenuContainer>
				<div className="body">
					<div className="title">
						<h3 className="card-title card-title-dash">
							Quản lý thực đơn
						</h3>
					</div>
					<Tabs
						type="card"
						items={[
							{
								label: "Thực đơn",
								key: "1",
								children: <RestaurantMenu user={user} getMenus={getMenus} loading={loading} setLoading={setLoading} menus={menus} status={status} setStatus={setStatus}/>,
							},
							{
								label: "Loại thực đơn",
								key: "2",
								children: <CategoryMenu user={user} getMenus={getMenus}/>,
							},
						]}
					/>
				</div>
			</MangementMenuContainer>
		</RestaurantLayout>
	);
};
export default ManageMenu;
