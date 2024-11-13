import { Button, Col, Divider, Row } from "antd";
import AdminLayout from "../../../components/Layouts/AdminLayout";
import { DashboardContainer } from "./styled";
import LeftSide from "./Chart/LeftSide";
import RightSide from "./Chart/RightSide";
import { FileAddOutlined, ShareAltOutlined, PrinterOutlined } from '@ant-design/icons'
import { useEffect, useState } from "react";
import AdminService from "../../../services/AdminService";
import SpinCustom from "../../../components/Common/SpinCustom";

const AdminDashboard = () => {
    const [data, setData] = useState() 
    const [loading, setLoading] = useState(false)

    const getData = async () => {
        try {
            setLoading(true)
            const res = await AdminService.getDataDashboard()
            console.log(res);
            
            setData(res)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        getData()
    }, [])

    return (  
        <AdminLayout>
            <DashboardContainer>
                <SpinCustom spinning={loading}>
                    <div className='part1'>
                            <div className="d-flex justify-content-space-between align-items-center">
                                <div className="overview"> Tổng quam </div>
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
                                        <div className="total-order">
                                            <div className="title">Tổng đơn đặt</div>
                                            <div className="background-count"> {data?.taskBar?.totalOrder} </div>
                                        </div>
                                    </Col>
                                    <Col xs={8} sm={8} md={5} lg={5} xl={5}>
                                        <div className="total-user">
                                            <div className="title">Số người dùng</div>
                                            <div className="background-count"> {data?.taskBar?.totalCustomer} </div>
                                        </div>
                                    </Col>
                                    <Col xs={8} sm={8} md={6} lg={6} xl={6}>
                                        <div className="total-restaurant">
                                            <div className="title">Số nhà hàng</div>
                                            <div className="background-count"> {data?.taskBar?.totalRestaurant} </div>
                                        </div>
                                    </Col>
                                    <Col xs={12} sm={12} md={5} lg={5} xl={5}>
                                        <div className="total-blog">
                                            <div className="title">Số bài viết</div>
                                            <div className="background-count"> 1 </div>
                                        </div>
                                    </Col>
                                    <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                                        <div className="contact">
                                            <div className="title">Số liên hệ</div>
                                            <div className="background-count"> 3 </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                    </div>

                    <div className="dashboard">
                        <Row gutter={[15, 15]}>
                            <Col xs={24} sm={24} md={24} lg={16} xl={16}>
                                {data && <LeftSide data={data} />}  
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                                {data && <RightSide data={data} />}  
                            </Col>
                        </Row>
                    </div>
                </SpinCustom>
            </DashboardContainer>
        </AdminLayout>
    );
}
 
export default AdminDashboard;