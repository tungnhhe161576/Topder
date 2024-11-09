import { Button, message } from "antd";
import CustomModal from "../../../../../../../components/Common/ModalCustom";
import { useState } from "react";
import UserService from "../../../../../../../services/UserService";

const ModalDeleteRoom = ({open, onCancel, onOk, userId, getAllTables}) => {
    const [loading, setLoading] = useState(false)

    const handledDelete = async () => {
        try {
            setLoading(true)
            await UserService.invisibleRoom(userId, open?.roomId)
            message.open({
                content: 'Xóa bàn thành công!',
                type: 'success',
                style: {
                    marginTop: '10vh',
                },
            })
            getAllTables()
            onOk()
            onCancel()
        } catch (error) {
            message.open({
                content: 'Xóa bàn thất bại!',
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
                Bạn có chắc chắn muốn xóa phòng này hay không ?
            </div>
        </CustomModal>
    );
}
 
export default ModalDeleteRoom;