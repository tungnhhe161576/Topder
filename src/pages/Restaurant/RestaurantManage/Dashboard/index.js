import { Button, Col, Divider, Row } from "antd";
import RestaurantLayout from "../../../../components/Layouts/RestaurantLayout";
import { DashboardContainer } from "./styled";
import { FileAddOutlined, ShareAltOutlined, PrinterOutlined } from '@ant-design/icons'
import LeftSide from "./Chart/LeftSide";
import RightSide from "./Chart/RightSide";

const Dashboard = () => {
    return (  
        <RestaurantLayout>
            <DashboardContainer>
                <div className='part1'>
                    <div className="d-flex justify-content-space-between align-items-center">
                        <div className="overview"> Overview </div>
                        <div className="d-flex"> 
                            <Button className="black fs-15 mr-15">
                                <ShareAltOutlined /> Share
                            </Button>
                            <Button className="black fs-15 mr-15">
                                <PrinterOutlined /> Print
                            </Button>
                            <Button type="primary" className="white fs-15">
                                <FileAddOutlined /> Export
                            </Button>
                        </div>
                    </div>
                    <Divider className="m-0"/>
                    <div className="mt-30">
                        <Row gutter={[16, 16]}>
                            <Col xs={8} sm={8} md={4} lg={4} xl={4}>
                                <div>
                                    <div className="title">Tổng đơn đặt</div>
                                    <div className="background-count"> 30 </div>
                                </div>
                            </Col>
                            <Col xs={8} sm={8} md={5} lg={5} xl={5}>
                                <div>
                                    <div className="title">Tổng đơn chờ</div>
                                    <div className="background-count"> 0 </div>
                                </div>
                            </Col>
                            <Col xs={8} sm={8} md={6} lg={6} xl={6}>
                                <div className="order-success">
                                    <div className="title">Tổng đơn thành công</div>
                                    <div className="background-count"> 26 </div>
                                </div>
                            </Col>
                            <Col xs={12} sm={12} md={5} lg={5} xl={5}>
                                <div>
                                    <div className="title">Tổng đơn hủy</div>
                                    <div className="background-count"> 0 </div>
                                </div>
                            </Col>
                            <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                                <div className="vote">
                                    <div className="title">Số sao</div>
                                    <div className="background-count"> 5 </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>

                <div className="dashboard">
                    <Row gutter={[15, 15]}>
                        <Col xs={24} sm={24} md={24} lg={16} xl={16}>
                            <LeftSide/>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                            <RightSide/>
                        </Col>
                    </Row>
                </div>
            </DashboardContainer>
        </RestaurantLayout>
    );
}
 
export default Dashboard;