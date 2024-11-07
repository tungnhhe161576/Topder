import { Button, message } from "antd";
import CustomModal from "../../../../../../components/Common/ModalCustom";
import ImageService from "../../../../../../services/ImageService";
import { useState } from "react";

const ModalDeleteImage = ({open, onCancel, onOk, userId}) => {
    const [loading, setLoading] = useState(false)

    const handleDeleteImage = async () => {
        try {
            setLoading(true)
            await ImageService.deleteImage(userId, open?.imageId)
            message.open({
				content: 'Xóa thành công.',
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
            setLoading(false)
        }
    }
    
    const footer = () => {
        return (
            <div className="d-flex justify-content-center">
                <Button className="mr-10 fw-600 bg-gray" type="primary" shape='round' onClick={() => onCancel()}>
                    Đóng
                </Button>
                <Button className="mr-10 fw-600" type="primary" shape='round' loading={loading} onClick={() => handleDeleteImage()}>
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
                style={{marginTop: '150px'}}
            >
                <div className="fw-500 fs-16 w-90 m-auto">Bạn có chắc muốn xóa ảnh này không ?</div>
            </CustomModal>
    );
}
 
export default ModalDeleteImage;