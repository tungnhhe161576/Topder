import { Button, message } from "antd"
import { useState } from "react"
import AdminService from "../../../../../../services/AdminService"
import CustomModal from "../../../../../../components/Common/ModalCustom";

const ModalDeleteCategory = ({open, onCancel, onOk, getAllBlog}) => {
    const [loading, setLoading] = useState(false)

    const handledDelete = async () => {
        try {
            setLoading(true)
            await AdminService.deleteBlogCategory(open?.bloggroupId)
            message.open({
                content: 'Xóa thành công!',
                type: 'success',
                style: {
                    marginTop: '10vh',
                },
            })
            onOk()
            getAllBlog()
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
                Bạn có chắc chắn muốn xóa loại bài viết này hay không ?
            </div>
        </CustomModal>
    );
}
 
export default ModalDeleteCategory;