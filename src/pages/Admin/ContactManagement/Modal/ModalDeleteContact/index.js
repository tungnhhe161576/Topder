import { Button, message } from "antd"
import CustomModal from "../../../../../components/Common/ModalCustom"
import AdminService from "../../../../../services/AdminService"
import { useState } from "react"

const ModalDeleteContact = ({open, onCancel, onOk}) => {
    const [loading, setLoading] = useState(false)

    console.log(open);
    

    const handledDelete = async () => {
        try {
            setLoading(true)
            await AdminService.deleteContact(open?.contactId)
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
            style={{marginTop: '200px'}}
        >
            <div className="fw-500 fs-20">
                Bạn có chắc chắn muốn xóa không ?
            </div>
        </CustomModal>
    );
}
 
export default ModalDeleteContact;