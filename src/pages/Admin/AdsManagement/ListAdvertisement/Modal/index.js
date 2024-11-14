import { Button, message } from "antd"
import { useState } from "react"
import AdminService from "../../../../../services/AdminService"
import CustomModal from "../../../../../components/Common/ModalCustom"

const ModalActiveAds = ({open, onCancel, onOk, value}) => {
    const [loading, setLoading] = useState(false)
    
    const handleAvtive = async () => {
        try {
            setLoading(true)
            await AdminService.updateBookingAds(open?.bookingId, value)
            
            message.open({
                content: 'Cập nhật thành công!',
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
                <Button className="mr-10 fw-600" type="primary" shape='round' loading={loading} onClick={() => handleAvtive()}>
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
                {
                    value === 'Active'
                        ? <span>Bạn có chắc chắn muốn chấp nhận quảng cáo này không ?</span>
                        : <span>Bạn có chắc chắn muốn hủy quảng cáo này không ?</span>
                }
                
            </div>
        </CustomModal>
    );
}
 
export default ModalActiveAds;