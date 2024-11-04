import { Button, Col, Divider, Row, Statistic } from "antd";
import RestaurantLayout from "../../../../components/Layouts/RestaurantLayout";
import { DashboardContainer } from "./styled";
import { FileAddOutlined, ShareAltOutlined, PrinterOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons'
import LeftSide from "./Chart/LeftSide";
import RightSide from "./Chart/RightSide";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userInfor } from "../../../../redux/Slice/userSlice";
import UserService from '../../../../services/UserService';
import { formatNumberToK } from "../../../../lib/stringUtils";
import SpinCustom from "../../../../components/Common/SpinCustom";

const Dashboard = () => {
    const [restaurantData, setRestaurantData] = useState()
    const [loading, setLoading] = useState(false)
    const user = useSelector(userInfor)
    console.log("user", user);
    console.log("data", restaurantData);
    

    const getDataDashboard = async () => {
        try {
            setLoading(true)
            const res = await UserService.getRestaurantDashboard(user?.uid)
            setRestaurantData(res)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        if (user?.uid) {
            getDataDashboard()
        }
    }, [user])

    return (  
        <RestaurantLayout>
            <DashboardContainer>
                <SpinCustom spinning={loading}>
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
                                <Col xs={8} sm={8} md={3} lg={3} xl={3}>
                                    <div className="total-order">
                                        <div className="title">Tổng đơn đặt</div>
                                        <div className="background-count"> {restaurantData?.taskBar?.totalOrder}</div>
                                    </div>
                                </Col>
                                <Col xs={8} sm={8} md={4} lg={4} xl={4}>
                                    <div className="total-income">
                                        <div className="title">Tổng thu nhập</div>
                                        <div className="background-count income"> {formatNumberToK(restaurantData?.taskBar?.totalIncome)} </div>
                                    </div>
                                </Col>
                                <Col xs={8} sm={8} md={7} lg={7} xl={7}>
                                    <div className="total-order-by-month">
                                        <div className="title">Tổng đơn của tháng hiện tại</div>
                                        <div className="order-by-month"> 
                                            <div> {restaurantData?.taskBar?.currentMonthOrder?.currentMonthOrder} </div>
                                            <div> 
                                                <Statistic
                                                    value={restaurantData?.taskBar?.currentMonthOrder?.orderGrowthRate}
                                                    precision={2}
                                                    valueStyle={restaurantData?.taskBar?.currentMonthOrder?.orderGrowthRate >= 0 ?{
                                                        color: '#3f8600',
                                                        fontSize: '14px'
                                                    } : {
                                                        color: '#cf1322',
                                                        fontSize: '14px'
                                                    }}
                                                    prefix={restaurantData?.taskBar?.currentMonthOrder?.orderGrowthRate >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                                                    suffix="%"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col xs={12} sm={12} md={7} lg={7} xl={7}>
                                    <div className="total-income-by-month">
                                        <div className="title">Tổng thu nhập của tháng hiện tại</div>
                                        <div className="income-by-month"> 
                                            <div>{formatNumberToK(restaurantData?.taskBar?.currentMonthIncome?.currentMonthIncome)} </div>
                                            <div>
                                                <Statistic
                                                    value={restaurantData?.taskBar?.currentMonthIncome?.incomeGrowthRate}
                                                    precision={2}
                                                    valueStyle={restaurantData?.taskBar?.currentMonthIncome?.incomeGrowthRate >= 0 ? {
                                                        color: '#3f8600',
                                                        fontSize: '14px'
                                                    } : {
                                                        color: '#cf1322',
                                                        fontSize: '14px'
                                                    }}
                                                    prefix={restaurantData?.taskBar?.currentMonthIncome?.incomeGrowthRate >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                                                    suffix="%"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col xs={12} sm={12} md={3} lg={3} xl={3}>
                                    <div className="star">
                                        <div className="title">Số sao</div>
                                        <div className="background-count"> {restaurantData?.taskBar?.star} </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>

                    <div className="dashboard">
                        <Row gutter={[15, 15]}>
                            <Col xs={24} sm={24} md={24} lg={16} xl={16}>
                                <LeftSide restaurantData={restaurantData}/>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                                <RightSide restaurantData={restaurantData}/>
                            </Col>
                        </Row>
                    </div>
                </SpinCustom>
            </DashboardContainer>
        </RestaurantLayout>
    );
}
 
export default Dashboard;