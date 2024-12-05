import { Button, Col, Image, Row } from "antd";
import CustomModal from "../../../../../../components/Common/ModalCustom";
import dayjs from "dayjs";

const ModalViewDetail = ({open, onCancel}) => {
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
            width={1000}
            style={{marginTop: '-70px'}}
        >
            <div className="title-type-1">
                Chi tiết bài viết
            </div>
            <div className="mt-40 mb-30">
                <Row gutter={[16, 16]}>
                    <Col span={9}>
                        <div>
                            <Image src={open?.image} alt="image" width={200}/>
                        </div>
                    </Col>
                    <Col span={15}>
                        <div>
                            <div className="d-flex justify-content-space-between align-items-center">
                                <div className="pl-10">
                                    <div className="fs-16 fw-500 primary">{open?.title}</div>
                                    <div className="fs-12">
                                        <span style={{color: 'gray'}}>Ngày tạo: </span>
                                        <span style={{color: 'gray'}}>{dayjs(open?.createDate).format('DD-MM-YYYY')}</span>
                                    </div>
                                </div>
                                <div className="fs-16 fw-500 pr-10">{open?.bloggroupName}</div>
                            </div>
                            <div dangerouslySetInnerHTML={{ __html: open?.content }} style={{maxHeight: '450px', overflowY: 'auto'}}/>
                        </div>
                    </Col>
                </Row>
            </div>
        </CustomModal>
    )
}
 
export default ModalViewDetail;