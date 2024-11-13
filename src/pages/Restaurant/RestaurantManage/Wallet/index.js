import { Tabs } from "antd";
import RestaurantLayout from "../../../../components/Layouts/RestaurantLayout";
import { ResrauratWalletContainer } from "./styled";
import WalletManagement from "./WalletManagement";
import TransaactionManagement from "./TransactionManagement";
import { useSelector } from "react-redux";
import { userInfor } from "../../../../redux/Slice/userSlice";

const RestaurantWallet = () => {
    const user = useSelector(userInfor)
    
    return (  
        <RestaurantLayout>
            <ResrauratWalletContainer>
                <Tabs
                    defaultActiveKey="1"
                    type="card"
                    items={[
                        {
                            label: "Thông tin ví",
                            key: "1",
                            children: <WalletManagement user={user}/>,
                        },
                        {
                            label: "Lịch sử giao dịch",
                            key: "2",
                            children: <TransaactionManagement user={user}/>,
                        },
                    ]}
                />
            </ResrauratWalletContainer>
        </RestaurantLayout>
    );
}
 
export default RestaurantWallet;