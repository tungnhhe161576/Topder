import { Button, message } from "antd";
import CustomModal from "../../../../../components/Common/ModalCustom";
import { useState } from "react";
import UserService from "../../../../../services/UserService";

const ModalDeleteFeedback = ({open, onCancel, onOk}) => {
    const [loading, setLoading] = useState(false)
    
    const handleDeleteFeedback = async () => {
        try {
            setLoading(false)
            await UserService.deleteFeedback(open?.feedbackId)
            onCancel()
            onOk()
            message.open({
                content: 'Xóa thành công',
                type: 'success',
                style: {
                    marginTop: '10vh',
                },
            })
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(true)
        }
    }
    
    
    const footer = () => {
        return (
            <div className="d-flex justify-content-center">
                <Button className="mr-10 fw-600" onClick={() => onCancel()}>
                    Đóng
                </Button>
                <Button className="mr-10 fw-600" type='primary' 
                    onClick={() => handleDeleteFeedback()}
                    loading={loading}
                >
                    Đồng ý
                </Button>
            </div>
        )
    }
    
    return (  
        <div>
            <CustomModal
                open={!!open}
                onCancel={onCancel}
                width={600}
                footer={footer}
                style={{marginTop: '150px'}}
            >
                <div className='fs-22 fw-600 d-flex justify-content-center'>
                    Bạn có chắc muốn xóa phản hồi này chứ ?
                </div>
            </CustomModal>
        </div>
    );
}
 
export default ModalDeleteFeedback;