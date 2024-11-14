import { useState } from "react"
import UserService from "../../../../../../services/UserService"
import { Button, message } from "antd"
import CustomModal from "../../../../../../components/Common/ModalCustom"

const ModalCancelBooking = ({open, onCancel, onOk}) => {
    const [loading, setLoading] = useState(false)
    
    const handleCancel = async () => {
        try {
            setLoading(true)
            await UserService.cancelBookingAds(open?.bookingId, 'Cancelled')
            
            message.open({
                content: 'Hủy thành công!',
                type: 'success',
                style: {
                    marginTop: '10vh',
                },
            })
            onOk()
            onCancel()
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }
    
    
    const footer = () => {
        return (
            <div className="d-flex justify-content-center">
                <Button className="mr-10 fw-600" shape='round' onClick={() => onCancel()}>
                    Đóng
                </Button>
                <Button className="mr-10 fw-600" type="primary" shape='round' loading={loading} onClick={() => handleCancel()}>
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
            <div className="mt-20 mb-30 d-flex justify-content-center fs-18 fw-500">
                Bạn có chắc muốn hủy đặt quảng cáo này không ?
            </div>
        </CustomModal>
    );
}
 
export default ModalCancelBooking;