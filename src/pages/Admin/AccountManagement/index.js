import { Tabs } from "antd";
import AdminLayout from "../../../components/Layouts/AdminLayout";
import { AccountManagementContainer } from "./styled";
import CustomerAccount from "./Account/CustomerAccount";
import RestaurantAccount from "./Account/RestaurantAccount";
import { useEffect, useState } from "react";
import AdminService from "../../../services/AdminService";
import CategoryRestaurant from "./CategoryRestaurant";

const AccountManagement = () => {
    const [loading, setLoading] = useState(false)
    const [accounts, setAccounts] = useState([])

    const getAllAccount = async () => {
        try {
            setLoading(true)
            const res = await AdminService.getAllUser()
            setAccounts(res)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        getAllAccount()
    }, [])




    const items=[
        {
            key: "1",
            label: "Khách hàng",
            children: <CustomerAccount loading={loading} accounts={accounts} getAccount={getAllAccount}/>,
        },
        {
            key: "2",
            label: "Nhà hàng",
            children: <RestaurantAccount loading={loading} accounts={accounts} getAccount={getAllAccount}/>,
        },
        {
            key: "3",
            label: "Loại nhà hàng",
            children: <CategoryRestaurant loading={loading} setLoading={setLoading}/>,
        },
    ]

    return (  
        <AdminLayout>
            <AccountManagementContainer>
                <Tabs items={items} />
            </AccountManagementContainer>
        </AdminLayout>
    );
}
 
export default AccountManagement;