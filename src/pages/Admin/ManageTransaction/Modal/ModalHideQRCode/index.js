import { Button } from "antd";
import CustomModal from "../../../../../components/Common/ModalCustom";

const ModalHideQRCode = ({open, onCancel}) => {
    const footer = () => {
        return (
            <div className="d-flex justify-content-center">
                <Button className="mr-10 fw-600" shape='round' onClick={() => onCancel()}>
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
            // style={{marginTop: '200px'}}
        >
            <div className="title-type-1">
                Mã QR
            </div>
            <div className="mt-20 mb-30 d-flex justify-content-center">
                <img
                    alt="QR Code"
                    src={`https://img.vietqr.io/image/${open?.bankCode}-${open?.accountNo}-compact2.jpg?amount=${open?.transactionAmount}&addInfo=${open?.description}&accountName=${open?.accountName}`}
                />
            </div>
        </CustomModal>
    );
}

 
export default ModalHideQRCode;