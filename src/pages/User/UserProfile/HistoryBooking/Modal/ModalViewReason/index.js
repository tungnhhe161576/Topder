import { Button } from "antd";
import CustomModal from "../../../../../../components/Common/ModalCustom";

const ModalViewReason = ({open, onCancel}) => {
    const footer = () => {
        return (
            <div className="d-flex justify-content-center">
                <Button className="mr-10 fw-600" onClick={() => onCancel()}>
                    Đóng
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
            <div className="title-type-1 mb-20">Lý do hủy</div>
            <div className="mb-30 fs-16 fw-500">
                {open?.cancelReason}
            </div>
        </CustomModal>
    );
}
 
export default ModalViewReason;