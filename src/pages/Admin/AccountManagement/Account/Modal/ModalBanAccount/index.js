import { Button, message } from "antd";
import CustomModal from "../../../../../../components/Common/ModalCustom";
import { useState } from "react";
import AdminService from '../../../../../../services/AdminService'

const ModalBanAccount = ({open, onCancel, onOk}) => {
    const [loading, setLoading] = useState(false)

    const handleBan = async () => {
        try {
            setLoading(true)
            await AdminService.banAccount(open?.uid, open?.status === 'Active' ? 'In-Active' : 'Active')
            message.open({
                content: 'Cập nhật trạng thái tài khoản thành công!',
                type: 'success',
                style: {
                    marginTop: '10vh',
                },
            })
            onOk()
            onCancel()
        } catch (error) {
            message.open({
                content: 'Cập nhật trạng thái thất bại!',
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
                <Button className="mr-10 fw-600" type="primary" shape='round' onClick={() => handleBan()} loading={loading}>
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
                Bạn có chắc chắn muốn khóa tài khoản này hay không ?
            </div>
        </CustomModal>
    );
}
 
export default ModalBanAccount;