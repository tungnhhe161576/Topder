import { Button, message } from "antd"
import CustomModal from "../../../../components/Common/ModalCustom"
import { useState } from "react"
import UserService from "../../../../services/UserService"
import AdminService from "../../../../services/AdminService"

const ModalDelete = ({open, onCancel, onOk}) => {
    const [loading, setLoading] = useState(false)

    const handleReport = async () => {
        try {
            setLoading(true)
            open?.reportType === 'Feedback'
                ? await UserService.deleteFeedback(open?.feedbackId)
                : await AdminService.handleOrderReport(open?.orderId)
            message.open({
                content: 'Xử lý thành công!',
                type: 'success',
                style: {
                    marginTop: '10vh',
                },
            })
            // onOk()
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
                <Button className="mr-10 fw-600" shape='round' type="primary" loading={loading} onClick={() => handleReport()}>
                    Xác nhận
                </Button>
            </div>
        )
    }

    return (  
        <CustomModal
            open={!!open}
            onCancel={onCancel}
            footer={footer}
            width={500}
            style={{marginTop: '130px'}}
        >
            <div className="d-flex justify-content-center align-items-center fw-500 fs-18">
                {
                    open?.reportType === 'Feedback'
                        ? <div>Bạn có chắc muốn ẩn đánh giá này không?</div>
                        : <div>Bạn có chắc muốn hủy đơn hàng này không?</div>
                }
            </div>
        </CustomModal>
    );
}
 
export default ModalDelete;