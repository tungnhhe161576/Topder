import { Button, message } from "antd"
import CustomModal from "../../../../Common/ModalCustom"
import { useState } from "react"
import UserService from "../../../../../services/UserService"

const ModalDeleteChatBox = ({open, onCancel, item, setItem, getChatBox, setChatList}) => {
    const [loading, setLoading] = useState(false)
    
    const handleDelete = async () => {
        try {
            setLoading(true)
            await UserService.deleteChatBox(item.chatBoxId)
            
            message.open({
                content: 'Xóa thành công!',
                type: 'success',
                style: {
                    marginTop: '10vh',
                },
            })
            getChatBox()
            setChatList()
            onCancel()
            setItem()
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
                <Button className="mr-10 fw-600" type="primary" danger shape='round' loading={loading} onClick={() => handleDelete()}>
                    Xóa
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
                Bạn có chắc muốn xóa đoạn chat này không?
            </div>
        </CustomModal>
    );
}
 
export default ModalDeleteChatBox;