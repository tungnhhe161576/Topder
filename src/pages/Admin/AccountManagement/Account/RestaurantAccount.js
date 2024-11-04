import SpinCustom from '../../../../components/Common/SpinCustom'

const RestaurantAccount = ({loading, accounts, getAccount}) => {
    return (  
        <div>
            <div className="mt-20 ml-30 fw-500 fs-20">
                Các nhà hàng
            </div>
            <div className="mt-20">
                <SpinCustom spinning={loading}>
                    restaurant
                </SpinCustom>
            </div>
        </div>
    );
}
 
export default RestaurantAccount;