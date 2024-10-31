import AdminLayout from "../../../components/Layouts/AdminLayout";
import { OrderManagementContainer } from "./styled";

const OrderManagement = () => {
    return (  
        <AdminLayout>
            <OrderManagementContainer>
                Order management
            </OrderManagementContainer>
        </AdminLayout>
    );
}
 
export default OrderManagement;