import { Tabs } from "antd";
import AdminLayout from "../../../components/Layouts/AdminLayout";
import { AccountManagementContainer } from "./styled";
import CustomerAccount from "./Account/CustomerAccount";
import RestaurantAccount from "./Account/RestaurantAccount";
import { useEffect, useState } from "react";

const AccountManagement = () => {
    const [loading, setLoading] = useState(false)
    const [accounts, setAccounts] = useState([])


    const getAccount = async () => {
        try {
            setLoading(true)
            
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getAccount()
    }, [])


    const items=[
        {
            key: "1",
            label: "Khách hàng",
            children: <CustomerAccount loading={loading} accounts={accounts} getAccount={getAccount}/>,
        },
        {
            key: "2",
            label: "Nhà hàng",
            children: <RestaurantAccount loading={loading} accounts={accounts} getAccount={getAccount}/>,
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