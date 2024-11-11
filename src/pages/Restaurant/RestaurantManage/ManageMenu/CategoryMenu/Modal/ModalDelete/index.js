import { Button, message } from "antd"
import CustomModal from "../../../../../../../components/Common/ModalCustom"
import { useState } from "react"
import UserService from "../../../../../../../services/UserService"

const ModalDeleteCategoryMenu = ({open, onCancel, onOk, getMenus}) => {
    const [loading, setLoading] = useState(false)

    const handledDelete = async () => {
        try {
            setLoading(true)
            await UserService.deleteCategoryMenu(open?.categoryMenuId)
            message.open({
                content: 'Xóa loại món ăn thành công!',
                type: 'success',
                style: {
                    marginTop: '10vh',
                },
            })
            onOk()
            getMenus()
            onCancel()
        } catch (error) {
            message.open({
                content: 'Xóa loại món ăn thất bại!',
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
                Bạn có chắc chắn muốn xóa loại món ăn này hay không ?
            </div>
        </CustomModal>
    );
}
 
export default ModalDeleteCategoryMenu;