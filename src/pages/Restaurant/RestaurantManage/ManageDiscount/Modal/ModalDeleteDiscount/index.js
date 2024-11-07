import { Button, message } from "antd"
import { useState } from "react"
import CustomModal from "../../../../../../components/Common/ModalCustom"
import UserService from "../../../../../../services/UserService"

const ModalDeleteDiscount = ({open, onCancel, onOk, userId}) => {
    const [loading, setLoading] = useState(false)
    
    const handleDeleteDiscount = async () => {
        try {
            setLoading(false)
            await UserService.deleteDiscount(userId, open?.discountId)
            message.open({
                content: 'Xóa thành công',
                type: 'success',
                style: {
                    marginTop: '10vh',
                },
            })
            onCancel()
            onOk()
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
                    onClick={() => handleDeleteDiscount()}
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
                    Bạn có chắc chắn xóa mã giảm giá này không ?
                </div>
            </CustomModal>
        </div>
    );
}
 
export default ModalDeleteDiscount;