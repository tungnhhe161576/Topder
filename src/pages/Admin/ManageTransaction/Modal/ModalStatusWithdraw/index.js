import { Button, message } from "antd";
import CustomModal from "../../../../../components/Common/ModalCustom";
import { useState } from "react";
import AdminService from "../../../../../services/AdminService";

const ModalStatusWithDraw = ({open, value, onCancel, onOk}) => {
    const [loading, setLoading] = useState(false)

    const handleSubmit = async () => {
        try {
            setLoading(true)
            await AdminService.changeStatusWithdraw(open?.transactionId, value)
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
            message.open({
                content: 'Cập nhật thất bại!',
                type: 'success',
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
                <Button className="mr-10 fw-600" shape='round' onClick={() => onCancel()}>
                    Đóng
                </Button>
                <Button className="mr-10 fw-600" shape='round' type="primary" loading={loading} onClick={() => handleSubmit()}>
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
            width={600}
            style={{marginTop: '100px'}}
        >
            <div className="title-type-1">
                Cập nhật trạng thái giao dịch
            </div>
            <div className="mt-20 mb-30 d-flex justify-content-center">
                {
                    value === 'Successful'
                        ? <span className="fw-500 fs-18">Bạn có chắc muốn xác nhận giao dịch này không?</span>
                        : <span className="fw-500 fs-18">Bạn có chắc muốn hủy giao dịch này không?</span>
                }
            </div>
        </CustomModal>
    );
}
 
export default ModalStatusWithDraw;