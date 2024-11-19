import { Button, Col, DatePicker, Divider, Row, Statistic } from "antd";
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
import dayjs from "dayjs";
import * as XLSX from "xlsx";


const Dashboard = () => {
    const [restaurantData, setRestaurantData] = useState()
    const [loading, setLoading] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const [loading3, setLoading3] = useState(false)
    const [month, setMonth] = useState('')
    const [dataByMonth, setDataByMonth] = useState()
    const [day, setDay] = useState('')
    const [dataByDay, setDataByDay] = useState()
    const user = useSelector(userInfor)

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

    const getDataByMonth = async () => {
        try {
            setLoading2(true)
            const res = await UserService.searchDataByMonth(user?.uid, month)
            setDataByMonth(res)
        } catch (error) {
            console.log();
        } finally {
            setLoading2(false)
        }
    }
    const getDataByDay = async () => {
        try {
            setLoading3(true)
            const res = await UserService.searchDataByDay(user?.uid, day)
            setDataByDay(res)
        } catch (error) {
            console.log();
        } finally {
            setLoading3(false)
        }
    }
    useEffect(() => {
        getDataByMonth()
    }, [month])
    useEffect(() => {
        getDataByDay()
    }, [day])

    const exportToExcel = () => {
        const table = document.getElementById("myTable");
        if (!table) {
            console.error("Table element not found");
            return;
        }
        const wb = XLSX.utils.table_to_book(table, { sheet: "SheetJS" });
        const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        saveAsExcelFile(wbout, "excel.xlsx");
    };
    
    const saveAsExcelFile = (buffer, fileName) => {
        try {
            const data = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(data);
            link.download = fileName;
            document.body.appendChild(link); 
            link.click(); 
            document.body.removeChild(link);
            URL.revokeObjectURL(link.href); 
        } catch (error) {
            console.error("File download failed:", error);
        }
    };

    const currentDate = dayjs()
    

    return (  
        <RestaurantLayout>
            <DashboardContainer>
                <SpinCustom spinning={loading}>
                    <div className='part1'>
                        <div className="d-flex justify-content-space-between align-items-center">
                            <div className="overview"> Tổng quan </div>
                            <div className="d-flex"> 
                                {/* <Button className="black fs-15 mr-15">
                                    <ShareAltOutlined /> Share
                                </Button>
                                <Button className="black fs-15 mr-15">
                                    <PrinterOutlined /> Print
                                </Button> */}
                                <Button style={{width: '200px'}} type="primary" className="white fs-15" onClick={() => exportToExcel()}>
                                    <FileAddOutlined /> Tải về file Excel
                                    <div style={{display: 'none'}}>
										<table id="myTable">
											<thead>
												<tr>
													<th>Số đơn tháng: {!!month ? dayjs(month).format('MM-YYYY') : currentDate.format("MM-YYYY")} </th>
													<th>Thu nhập tháng: {!!month ? dayjs(month).format('MM-YYYY') : currentDate.format("MM-YYYY")}</th>
													<th>Số đơn ngày: {!!day ? dayjs(day).format('DD-MM-YYYY') : currentDate.format('DD-MM-YYYY')}</th>
													<th>Thu nhập ngày: {!!day ? dayjs(day).format('DD-MM-YYYY') : currentDate.format('DD-MM-YYYY')}</th>
												</tr>
											</thead>
											<tbody>
												<tr>
                                                    <td>{dataByMonth?.currentMonthOrder?.currentMonthOrder}</td>
                                                    <td>{dataByMonth?.currentMonthIncome?.currentMonthIncome ? formatNumberToK(dataByMonth?.currentMonthIncome?.currentMonthIncome) : '0đ'}</td>
                                                    <td>{dataByDay?.dayOrders}</td>
                                                    <td>{dataByDay?.dayIncomes ? formatNumberToK(dataByDay?.dayIncomes) : '0đ'}</td>
                                                </tr>
											</tbody>
										</table>
									</div>
                                </Button>
                            </div>
                        </div>
                        <Divider className="m-0"/>
                        <div className="mt-30">
                            <Row gutter={[16, 16]}>
                                <Col xs={10} sm={10} md={8} lg={8} xl={8}>
                                    <SpinCustom spinning={loading2}>
                                        <div className="data-by-month">
                                            <div>
                                                <div className="fw-500 pl-10 pt-5 mb-10  fs-16">Dữ liệu theo tháng</div>
                                                <div className="date-picker">
                                                    <DatePicker onChange={(e) => setMonth(dayjs(e).format("MM-DD-YYYY"))} picker="month" format='MM-YYYY' placeholder="Chọn tháng"/>
                                                </div>
                                            </div>
                                            <div className="data mt-20">
                                                <div>
                                                    <div>
                                                        <span style={{color: '#716e6e'}} className="fw-500 fs-20">Số đơn: </span>
                                                        <span className="fw-500 fs-20 primary">{dataByMonth?.currentMonthOrder?.currentMonthOrder}</span>
                                                    </div>
                                                    <div>
                                                        <Statistic
                                                            value={dataByMonth?.currentMonthOrder?.orderGrowthRate}
                                                            precision={2}
                                                            valueStyle={dataByMonth?.currentMonthOrder?.orderGrowthRate >= 0 ?{
                                                                color: '#3f8600',
                                                                fontSize: '14px'
                                                            } : {
                                                                color: '#cf1322',
                                                                fontSize: '14px'
                                                            }}
                                                            prefix={dataByMonth?.currentMonthOrder?.orderGrowthRate >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                                                            suffix="%"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div>
                                                        <span style={{color: '#716e6e'}} className="fw-500 fs-20">Doanh thu: </span>
                                                        <span className="fw-500 fs-20 primary">{formatNumberToK(dataByMonth?.currentMonthIncome?.currentMonthIncome)}</span>
                                                    </div>
                                                    <div>
                                                        <Statistic
                                                            value={dataByMonth?.currentMonthIncome?.incomeGrowthRate}
                                                            precision={2}
                                                            valueStyle={dataByMonth?.currentMonthIncome?.incomeGrowthRate >= 0 ?{
                                                                color: '#3f8600',
                                                                fontSize: '14px'
                                                            } : {
                                                                color: '#cf1322',
                                                                fontSize: '14px'
                                                            }}
                                                            prefix={dataByMonth?.currentMonthIncome?.incomeGrowthRate >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                                                            suffix="%"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </SpinCustom>
                                </Col>
                                <Col xs={10} sm={10} md={8} lg={8} xl={8}>
                                    <SpinCustom spinning={loading3}>
                                        <div className="data-by-day">
                                            <div>
                                                <div className="fw-500 pl-10 pt-5 mb-10 fs-16">Dữ liệu theo ngày</div>
                                                <div className="date-picker">
                                                    <DatePicker onChange={(e) => setDay(dayjs(e).format("MM-DD-YYYY"))} format='DD-MM-YYYY' placeholder="Chọn ngày"/>
                                                </div>
                                            </div>
                                            <div className="data mt-20">
                                                <div>
                                                    <div>
                                                        <span style={{color: '#716e6e'}} className="fw-500 fs-20">Số đơn: </span>
                                                        <span className="fw-500 fs-20 primary">{dataByDay?.dayOrders}</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div>
                                                        <span style={{color: '#716e6e'}} className="fw-500 fs-20">Doanh thu: </span>
                                                        <span className="fw-500 fs-20 primary">{dataByDay?.dayIncomes ? formatNumberToK(dataByDay?.dayIncomes) : '0đ'}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </SpinCustom>
                                </Col>
                                <Col xs={12} sm={12} md={8} lg={8} xl={8}>
                                    <div className="star">
                                        <div className="title">Số sao</div>
                                        <div className="background-count"> {restaurantData?.star ? restaurantData?.star : '0'} </div>
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