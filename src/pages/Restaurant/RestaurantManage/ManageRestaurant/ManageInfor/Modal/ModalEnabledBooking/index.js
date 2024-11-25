import { Button, message } from "antd";
import CustomModal from "../../../../../../../components/Common/ModalCustom";
import { useState } from "react";
import UserService from "../../../../../../../services/UserService";
import { useDispatch } from "react-redux";
import { updateUserInformation } from "../../../../../../../redux/Slice/userSlice";

const ModalEnabledBooking = ({open, onCancel, active, user}) => {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    console.log(active);
    

    const handleEnabled = async () => {
        try {
            setLoading(true)
            await UserService.enableBooking(user?.uid, active === false ? true : false)
            message.open({
                content: 'Cập nhật thành công!',
                type: 'success',
                style: {
                    marginTop: '10vh',
                },
            })
            // setActive(!active)
            dispatch(updateUserInformation({ isBookingEnabled: !active }));
            onCancel()
        } catch (error) {
            message.open({
                content: 'Cập nhật thất bại!',
                type: 'error',
                style: {
                    marginTop: '10vh',
                },
            })
        } finally {
            setLoading(false)
        }
    }
    
    const footer = () => {
        return (
            <div className="d-flex justify-content-center">
                <Button className="mr-10 fw-600 bg-gray" type="primary" shape='round' onClick={() => onCancel()}>
                    Đóng
                </Button>
                <Button className="mr-10 fw-600" type="primary" shape='round' loading={loading} onClick={() => handleEnabled()}>
                    Đồng ý
                </Button>
            </div>
        )
    }
    
    return (  
        <CustomModal
            open={!!open}
            onCancel={onCancel}
            footer={footer}
            width={600}
            style={{marginTop: '200px'}}
        >
            <div>
                <div className="title-type-1">
                    Trạng thái đặt bàn
                </div>
                <div className="mt-20 mb-30">
                    {
                        active === true 
                            ? 'Bạn có chắc muốn tắt trạng thái đặt bàn của nhà hàng không?'
                            : 'Bạn có chắc muốn bật trạng thái đặt bàn không?'
                    }
                </div>
            </div>
        </CustomModal>
    );
}
 
export default ModalEnabledBooking;