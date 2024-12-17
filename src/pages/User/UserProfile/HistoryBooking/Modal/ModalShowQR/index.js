import { Button, Image } from "antd";
import CustomModal from "../../../../../../components/Common/ModalCustom";

const ModalShowQR = ({open, onCancel}) => {
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
            width={500}
            style={{marginTop: '50px'}}
        >
            <div className="title-type-1 mb-20">Mã QR đơn hàng</div>
            <div className="mb-30 fs-16 fw-500 d-flex justify-content-center">
                <Image src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://www.topder.vn/order-detail/` + open?.orderId}  alt="qr_code"/>
            </div>
        </CustomModal>
    );
}
 
export default ModalShowQR;