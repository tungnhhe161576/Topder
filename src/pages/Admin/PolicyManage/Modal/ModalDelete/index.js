import { Button, message } from "antd"
import CustomModal from "../../../../../components/Common/ModalCustom"
import { useState } from "react"
import AdminService from "../../../../../services/AdminService"

const ModalDelete = ({open, onCancel, onOk}) => {
    const [loading, setLoading] = useState(false)

    const handledDelete = async () => {
        try {
            setLoading(true)
            await AdminService.deletePolicy(open?.policyId)
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
            message.open({
                content: 'Xóa thất bại!',
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
                <Button className="mr-10 fw-600" shape='round' onClick={() => onCancel()}>
                    Đóng
                </Button>
                <Button className="mr-10 fw-600" type="primary" shape='round' onClick={() => handledDelete()} loading={loading}>
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
            style={{marginTop: '100px'}}
        >
            <div className="fw-500 fs-20">
                Bạn có chắc chắn muốn xóa chính sách này không ?
            </div>
        </CustomModal>
    );
}
 
export default ModalDelete;