import { Avatar, Button, Col, Row } from "antd";
import CustomModal from "../../../../../components/Common/ModalCustom";
import avatar from '../../../../../assets/images/Dat.jpg'

const ModalDetail = ({open, onCancel, onOk}) => {
    const footer = () => {
        return (
            <div className="d-flex justify-content-center">
                <Button className="mr-10 fw-600 bg-gray" type="primary" shape='round' onClick={() => onCancel()}>
                    Đóng
                </Button>
            </div>
        )
    }

    console.log('open', open)

    return (  
        <CustomModal
            open={!!open}
            onCancel={onCancel}
            footer={footer}
            width={800}
        >
            <div className="mb-30">
                <div className="title-type-1">
                    Chi tiết đơn hàng
                </div>
                <div className="mt-10">
                    <Row gutter={[16, 16]}>
                        <Col span={8}>
                            <div className="">
                                <div className="pl-20 fw-500 fs-18 mb-10" style={{color: 'gray'}}>Thông tin người đặt</div>
                                <div className="d-flex flex-column align-items-center pl-20 w-60">
                                    <div>
                                        <Avatar size={80} src={<img src={avatar} alt="avatar" />} />
                                    </div>
                                    <div className="fs-16 fw-500 mt-8"> <span style={{color: 'gray'}}>Người nhận: </span>{open?.nameReceiver} </div>
                                    <div className="fs-14 fw-500"> <span style={{color: 'gray'}}>SĐT: </span> {open?.phoneReceiver} </div>
                                </div>
                            </div>
                        </Col>
                        <Col span={14}>
                            <div className="pl-20 fw-500 fs-18 mb-10" style={{color: 'gray'}}>
                                <div>Thông tin đơn hàng</div>
                                <div>
                                    
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </CustomModal>
    );
}
 
export default ModalDetail;