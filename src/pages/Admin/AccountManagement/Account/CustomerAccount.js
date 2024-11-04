import SpinCustom from "../../../../components/Common/SpinCustom";

const CustomerAccount = ({loading, accounts, getAccount}) => {
    return (  
        <div>
            <div className="mt-20 ml-30 fw-500 fs-20">
                Các tài khoản người dùng
            </div>
            <div className="mt-20">
                <SpinCustom spinning={loading}>
                    customer
                </SpinCustom>
            </div>
        </div>
    );
}
 
export default CustomerAccount;