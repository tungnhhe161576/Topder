import { Button, message } from "antd"
import CustomModal from "../../../../../../components/Common/ModalCustom"
import AdminService from "../../../../../../services/AdminService"
import { useState } from "react"

const ModalDelete = ({open, onCancel, onOk}) => {
    const [loading, setLoading] = useState(false)
    
    const handleDelete = async () => {
        try {
            setLoading(true)
            await AdminService.deleteAdvertisementPrice(open?.pricingId)
            
            message.open({
                content: 'Xóa thành công!',
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
                <Button className="mr-10 fw-600" type="primary" shape='round' loading={loading} onClick={() => handleDelete()}>
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
                Bạn có chắc muốn xóa giá quảng cáo này không ?
            </div>
        </CustomModal>
    );
}
 
export default ModalDelete;