import Header from "./Header.js";
import LeftSide from "./LeftSide";
import { AdminLayoutContainer } from "./styled";

const AdminLayout = ( {children} ) => {
    return (  
        <AdminLayoutContainer>
            <Header/> 
            <div className="body-layout">
                <LeftSide/> 
                <div className="children"> 
                    {children} 
                </div>
            </div>
        </AdminLayoutContainer>
    );
}
 
export default AdminLayout;