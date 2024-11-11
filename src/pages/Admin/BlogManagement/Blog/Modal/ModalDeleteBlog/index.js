import { Button, message } from "antd";
import { useState } from "react";
import CustomModal from "../../../../../../components/Common/ModalCustom";
import AdminService from "../../../../../../services/AdminService";

const ModalDeleteBlog = ({open, onCancel, onOk}) => {
    const [loading, setLoading] = useState(false)

    const handledDelete = async () => {
        try {
            setLoading(true)
            await AdminService.deleteBlog(open?.blogId)
            message.open({
                content: 'Xóa bài viết thành công!',
                type: 'success',
                style: {
                    marginTop: '10vh',
                },
            })
            onOk()
            onCancel()
        } catch (error) {
            message.open({
                content: 'Xóa bài viết thất bại!',
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
                Bạn có chắc chắn muốn xóa bài viết này hay không ?
            </div>
        </CustomModal>
    );
}
 
export default ModalDeleteBlog;