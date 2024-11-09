import { Avatar, Button, Col, Row } from "antd";
import CustomModal from "../../../../../../components/Common/ModalCustom";

const ModalDetailMenu = ({open, onCancel}) => {
    const footer = () => {
        return (
            <div className="d-flex justify-content-center">
                <Button className="mr-10 fw-600" onClick={() => onCancel()}>
                    Đóng
                </Button>
            </div>
        )
    }

    console.log(open);
    
    
    return (  
        <div>
            <CustomModal
                open={!!open}
                onCancel={onCancel}
                width={700}
                footer={footer}
                style={{marginTop: '-50px'}}
            >
                <div className='title-type-1'>
                    Menu áp dụng
                </div>
                <div className="mt-20 mb-30">
                    {
                        open?.discountMenuDtos.length === 0
                            ? <div className="fs-18 fw-500 red w-90 m-auto">Nhà hàng chưa áp giá cho bất kỳ món ăn nào</div>
                            : <div>
                                <Row gutter={[16, 16]}>
                                    {
                                        open?.discountMenuDtos.map(i => (
                                            <Col key={i?.discountId} span={6} className="d-flex flex-column align-items-center">
                                                <div>
                                                    <Avatar 
                                                        size={110}
                                                        src={<img src={i?.image} alt="food"/>}
                                                    />
                                                </div>
                                                <div className="d-flex flex-column align-items-center">
                                                    <div className="fs-16 fw-500"> {i?.dishName} </div>
                                                    <div className="primary fs-15 fw-500"> {i?.discountMenuPercentage}% </div>
                                                </div>
                                            </Col>
                                        ))
                                    }
                                </Row>
                            </div>
                    }
                </div>
            </CustomModal>
        </div>
    );
}
 
export default ModalDetailMenu;