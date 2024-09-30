import { Col, Row, Select } from "antd";

const LeftSide = () => {
    return (  
        <div className="left">
            <Row gutter={[16, 16]} className="d-flex justify-content-center">
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <div className="chart1">
                        <div className="d-flex justify-content-space-between align-items-center"> 
                            <div>
                                <div className="fs-22 fw-600"> Market Overview </div>   
                                <div className="fs-18" style={{color: '#a7b2ba'}}> Tổng hợp số đơn hàng trong năm </div>   
                            </div>
                            <div>
                                <Select defaultValue={2024} className="select">
                                    <Select.Option> 2024 </Select.Option>
                                    <Select.Option> 2023 </Select.Option>
                                    <Select.Option> 2022 </Select.Option>
                                </Select>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={24}></Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={24}></Col>
            </Row>
        </div>
    );
}
 
export default LeftSide;